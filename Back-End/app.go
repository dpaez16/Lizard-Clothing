package main

import (
	"log"
	"os"
	"net/http"
	"encoding/json"

	"github.com/sendgrid/sendgrid-go"
	"github.com/sendgrid/sendgrid-go/helpers/mail"
	"github.com/rs/cors"
)

type Order struct {
	Name		string `json:name`
	Email		string `json:email`
	Message		string `json:message`
	ProductType	string `json:productType`
	ProductName	string `json:productName`
	Size		string `json:size`
	Gender		string `json:gender`
	Color		string `json:color`
}

type Response struct {
	StatusCode	int
	Body		string
}


func sendOrder(w http.ResponseWriter, r *http.Request) {
	var order Order
	var resp Response

	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	err := json.NewDecoder(r.Body).Decode(&order)
	if err != nil {
		log.Println("JSON Decode Error:")
		log.Println(err)
		resp.StatusCode = http.StatusBadRequest
		resp.Body = err.Error()
		json.NewEncoder(w).Encode(resp)
		return
	}

	// TODO
	// send email also to Lizard Clothing owner
	from := mail.NewEmail("Lizard Clothing", "dpaez97@gmail.com")
	subject := "Lizard Clothing Special Order"
	to := mail.NewEmail(order.Name, order.Email)
	plainTextContent := order.Message
	htmlContent := order.Message
	message := mail.NewSingleEmail(from, subject, to, plainTextContent, htmlContent)
	client := sendgrid.NewSendClient(os.Getenv("SENDGRID_API_KEY"))
	response, err := client.Send(message)

	if err != nil {
		log.Println("Sendgrid Client Error:")
		log.Println(err)
		resp.StatusCode = http.StatusInternalServerError
		resp.Body = err.Error()
	} else {
		resp.StatusCode = response.StatusCode
		resp.Body = response.Body
	}

	json.NewEncoder(w).Encode(resp)
}

func main() {
	mux := http.NewServeMux()
	// TODO
	// make sure API endpoint works for POST only
	mux.HandleFunc("/sendOrder", sendOrder)

	corsHandler := cors.Default().Handler(mux)
	log.Fatal(http.ListenAndServe(":8000", corsHandler))
}

