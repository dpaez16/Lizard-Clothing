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
	ProductName		string
	ProductType		string
	ProductAgeType	string
	Price			float32
	Description		string
	Images			[]string
}


func getContext(nSeconds int) (context.Context, context.CancelFunc) {
	duration := nSeconds * time.Second
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


//func insertProduct() () {}
//func queryCatalog() () {}


func main() {
	client, err := getDBClient()

	if err != nil {
		log.Fatal(err)
	}

	collection := client.Database(DB_NAME).Collection(COLLECTION_NAME)
}
