package main

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
	"log"
	"encoding/json"
	"net/http"
)

type Order struct {
	Name			string			`json:"name"`
	Email			string			`json:"email"`
	PhoneNumber		string			`json:"phoneNum"`
	Message			string			`json:"message"`
	SpecialOrder	bool			`json:"specialOrder"`
	Details			OrderDetails	`json:"orderDetails"`
}

type OrderDetails struct {
	ProductType	string				`json:"productType"`
	ProductName	string				`json:"productName"`
	Size		string				`json:"size"`
	Color		string				`json:"color"`
}

type Product struct {
	ID 				primitive.ObjectID 		`bson:"_id, omitempty"`
	ProductName		string					`json:"productName" bson:"productName"`
	ProductType		string					`json:"productType" bson:"productType"`
	ProductAgeType	string					`json:"productAgeType" bson:"productAgeType"`
	Price			float32					`json:"price" bson:"price"`
	Description		string					`json:"description" bson:"description"`
	Images			[]string				`json:"images" bson:"images"`
}

type Response struct {
	StatusCode	int
	Body		string
}

type InputData struct {
	APIKey		string		`json:"apiKey"`
	Input		Product		`json:"input"`
}


func RecordError(w http.ResponseWriter, r *http.Request, resp Response, err error) {
	log.Println(err)
	resp.StatusCode = http.StatusBadRequest
	resp.Body = err.Error()
	json.NewEncoder(w).Encode(resp)
}
