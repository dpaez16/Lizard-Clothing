package main


import (
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"fmt"
	"os"
	"context"
	"errors"
	"time"
	"encoding/json"
	"net/http"
)


var DB_USER = os.Getenv("DB_USER")
var DB_PASSWORD = os.Getenv("DB_PASSWORD")
var DB_NAME = "lizardClothingDB"
var COLLECTION_NAME = "catalog"
var LC_API_KEY = os.Getenv("LC_API_KEY")


func getContext(nSeconds int) (context.Context, context.CancelFunc) {
	duration := time.Duration(nSeconds) * time.Second
	ctx, cancel := context.WithTimeout(context.Background(), duration)
	return ctx, cancel
}


func serializeProducts(products []Product) (string, error) {
	var productsStr string

	for i, product := range products {
		productBytes, err := json.Marshal(product)
		if err != nil {
			return productsStr, err
		}

		productStr := string(productBytes)
		if i + 1 < len(products) {
			productStr += ", "
		}

		productsStr += productStr
	}

	productsStr = fmt.Sprintf("[%s]", productsStr)
	return productsStr, nil
}


func getDBClient() (*mongo.Client, error) {
	ctx, cancel := getContext(10)
	defer cancel()

	url := fmt.Sprintf("mongodb+srv://%s:%s@lizard-clothing.i89ud.mongodb.net/%s?retryWrites=true&w=majority", DB_USER, DB_PASSWORD, DB_NAME)

	client, err := mongo.Connect(ctx, options.Client().ApplyURI(url,))
	return client, err
}


func getCatalogHelper(productType string, productAgeType string) ([]Product, error) {
	client, err := getDBClient()
	if err != nil {
		return nil, err
	}

	collection := client.Database(DB_NAME).Collection(COLLECTION_NAME)

	ctx, cancel := getContext(15)
	defer cancel()

	filter := bson.M{
		"productType": productType,
		"productAgeType": productAgeType,
	}
	cursor, findErr := collection.Find(ctx, filter)
	if findErr != nil {
		return nil, findErr
	}

	var products []Product
	err = cursor.All(ctx, &products)
	if err != nil {
		return nil, err
	}

	return products, nil
}


func InsertProduct(w http.ResponseWriter, r *http.Request) {
	var inputData InputData
	var resp Response

	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	err := json.NewDecoder(r.Body).Decode(&inputData)
	if err != nil {
		RecordError(w, r, resp, err)
		return
	}

	apiKey := inputData.APIKey
	if apiKey != LC_API_KEY {
		err = errors.New("Invalid API key.")
		RecordError(w, r, resp, err)
		return
	}

	client, err := getDBClient()
	if err != nil {
		RecordError(w, r, resp, err)
		return
	}

	collection := client.Database(DB_NAME).Collection(COLLECTION_NAME)

	ctx, cancel := getContext(15)
	defer cancel()

	// check to see if product already exists
	product := inputData.Input
	findResult := Product{}
	filter := bson.M{
		"productName": product.ProductName,
		"productType": product.ProductType,
		"productAgeType": product.ProductAgeType,
	}

	err = collection.FindOne(ctx, filter).Decode(&findResult)
	if len(findResult.Images) > 0 {
		err = errors.New("Product already exists!")
		RecordError(w, r, resp, err)
		return
	}

	product.ID = primitive.NewObjectID()
	_, err = collection.InsertOne(ctx, product)
	if err != nil {
		RecordError(w, r, resp, err)
	} else {
		resp.StatusCode = 200
	}

	json.NewEncoder(w).Encode(resp)
}


func GetCatalog(w http.ResponseWriter, r *http.Request) {
	var resp Response
	var inputData InputData

	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	err := json.NewDecoder(r.Body).Decode(&inputData)
	if err != nil {
		RecordError(w, r, resp, err)
		return
	}

	apiKey := inputData.APIKey
	if apiKey != LC_API_KEY {
		err = errors.New("Invalid API key.")
		RecordError(w, r, resp, err)
		return
	}

	filter := inputData.Input
	products, err := getCatalogHelper(filter.ProductType, filter.ProductAgeType)
	if err != nil {
		RecordError(w, r, resp, err)
		return
	}

	productsStr, err := serializeProducts(products)
	if err != nil {
		RecordError(w, r, resp, err)
		return
	}

	resp.StatusCode = 200
	resp.Body = productsStr
	json.NewEncoder(w).Encode(resp)
}
