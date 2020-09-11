package main


import (
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
//	"go.mongodb.org/mongo-driver/bson"
//	"go.mongodb.org/mongo-driver/mongo/readpref"
	"fmt"
	"log"
	"os"
	"context"
	"time"
)


var DB_USER = os.Getenv("DB_USER")
var DB_PASSWORD = os.Getenv("DB_PASSWORD")
var DB_NAME = "lizardClothingDB"
var COLLECTION_NAME = "catalog"

type Product struct {
	ProductName		string		`json:"productName"`
	ProductType		string		`json:"productType"`
	ProductAgeType	string		`json:"productAgeType"`
	Price			float32		`json:"price"`
	Description		string		`json:"description"`
	Images			[]string	`json:"images"`
}


func getContext(nSeconds int) (context.Context, context.CancelFunc) {
	duration := time.Duration(nSeconds) * time.Second
	ctx, cancel := context.WithTimeout(context.Background(), duration)
	return ctx, cancel
}


func getDBClient() (*mongo.Client, error) {
	ctx, cancel := getContext(10)
	defer cancel()

	url := fmt.Sprintf(`
		mongodb+srv://%s:%s@lizard-clothing
		.i89ud.mongodb.net/%s?retryWrites=
		true&w=majority`, DB_USER, DB_PASSWORD, DB_NAME)

	client, err := mongo.Connect(ctx, options.Client().ApplyURI(url,))
	return client, err
}


func InsertProduct(product Product) (*mongo.InsertOneResult, error) {
	client, err := getDBClient()
	if err != nil {
		return nil, err
	}

	collection := client.Database(DB_NAME).Collection(COLLECTION_NAME)

	ctx, cancel := getContext(10)
	defer cancel()

	result, err := collection.InsertOne(ctx, product)
	return result, err
}
//func QueryCatalog() () {}


func main() {
	product := Product {
		ProductName: "Grand & Central",
		ProductType: "Hoodie",
		ProductAgeType: "Adult",
		Price: 1.00,
		Description: "desc",
		Images: []string{"1", "2"},
	}
	
	result, err := InsertProduct(product)
	if err != nil {
		log.Println(err)
	}

	fmt.Println("InsertOne() API result:", result)
}
