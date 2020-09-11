package main


import (
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"fmt"
	"log"
	"os"
	"context"
	"errors"
	"time"
)


var DB_USER = os.Getenv("DB_USER")
var DB_PASSWORD = os.Getenv("DB_PASSWORD")
var DB_NAME = "lizardClothingDB"
var COLLECTION_NAME = "catalog"

type Product struct {
	ID 				primitive.ObjectID 		`bson:"_id, omitempty"`
	ProductName		string					`json:"productName" bson:"productName"`
	ProductType		string					`json:"productType" bson:"productType"`
	ProductAgeType	string					`json:"productAgeType" bson:"productAgeType"`
	Price			float32					`json:"price" bson:"price"`
	Description		string					`json:"description" bson:"description"`
	Images			[]string				`json:"images" bson:"images"`
}

type MongoFields struct {
	Key 			string 					`json:"key,omitempty"`
	ID 				primitive.ObjectID 		`bson:"_id, omitempty"`
	
	StringField 	string 					`bson:"string field" json:"string field"`
	IntField 		int 					`bson:"int field" json:"int field"`
	BoolField 		bool 					`bson:"bool field" json:"bool field"`
}


func getContext(nSeconds int) (context.Context, context.CancelFunc) {
	duration := time.Duration(nSeconds) * time.Second
	ctx, cancel := context.WithTimeout(context.Background(), duration)
	return ctx, cancel
}


func getDBClient() (*mongo.Client, error) {
	ctx, cancel := getContext(10)
	defer cancel()

	url := fmt.Sprintf("mongodb+srv://%s:%s@lizard-clothing.i89ud.mongodb.net/%s?retryWrites=true&w=majority", DB_USER, DB_PASSWORD, DB_NAME)

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

	// check to see if product already exists
	findResult := Product{}
	filter := bson.M{
		"productName": product.ProductName,
		"productType": product.ProductType,
		"productAgeType": product.ProductAgeType,
	}

	err = collection.FindOne(ctx, filter).Decode(&findResult)
	if len(findResult.Images) > 0 {
		return nil, errors.New("Product already exists!")
	}

	result, err := collection.InsertOne(ctx, product)
	return result, err
}
//func QueryCatalog() () {}


func main() {
	product := Product {
		ID: primitive.NewObjectID(),
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
