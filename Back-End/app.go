package main

import (
	"fmt"
	"log"
	"os"
	"net/http"
	"encoding/json"

	"github.com/sendgrid/sendgrid-go"
	"github.com/sendgrid/sendgrid-go/helpers/mail"
	"github.com/rs/cors"
)

type OrderDetails struct {
	ProductType	string `json:productType`
	ProductName	string `json:productName`
	Size		string `json:size`
	Gender		string `json:gender`
	Color		string `json:color`
}

type Order struct {
	Name			string 			`json:name`
	Email			string 			`json:email`
	Message			string 			`json:message`
	SpecialOrder 	bool			`json:specialOrder`
	Details			OrderDetails 	`json:orderDetails`
}

type Response struct {
	StatusCode	int
	Body		string
}


func createEmailParts(order Order) (string, string) {
	var title, bottomPortion string
	if order.SpecialOrder {
		title = "Special Order Details"
		bottomPortion = fmt.Sprintf(`
		Message:
		<p>
			%s
		</p>
		`, order.Message)
	} else {
		title = "Order Details"
		bottomPortion = fmt.Sprintf(`
		Order Details:
		<ul>
			<li> Product Type: %s </li>
			<li> Product Name: %s </li>
			<li> Size: %s </li>
			<li> Gender: %s </li>
			<li> Color: %s </li>
		</ul>
		`, 
		order.Details.ProductType, 
		order.Details.ProductName,
		order.Details.Size,
		order.Details.Gender,
		order.Details.Color)
	}

	return title, bottomPortion
}


func createMessage(order Order) string {
	title, bottomPortion := createEmailParts(order)

	return fmt.Sprintf(`
	<h2> %s </h2>
	Name: %s <br>
	Email: %s <br>
	<br>
	%s`, title, order.Name, order.Email, bottomPortion)
}


func createEmail(order Order) *mail.SGMailV3 {
	from := mail.NewEmail("Lizard Clothing", "dpaez97@gmail.com")
	subject := "Lizard Clothing Special Order"
	to := mail.NewEmail(order.Name, order.Email)
	message := createMessage(order)
	plainTextContent := message
	htmlContent := message
	singleEmail := mail.NewSingleEmail(from, subject, to, plainTextContent, htmlContent)
	
	owner := mail.NewEmail("Danny Paez", "dpaez2@illinois.edu")
	p := mail.NewPersonalization()
	p.AddTos(owner)
	singleEmail.AddPersonalizations(p)
	
	return singleEmail
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

	// send email to Lizard Clothing owner and customer
	client := sendgrid.NewSendClient(os.Getenv("SENDGRID_API_KEY"))
	singleEmail := createEmail(order)
	response, err := client.Send(singleEmail)

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
	mux.HandleFunc("/sendOrder", sendOrder)
	
	options := cors.Options{
		AllowedMethods: []string{"POST"},
	}
	corsHandler := cors.New(options).Handler(mux)
	log.Fatal(http.ListenAndServe(":8000", corsHandler))
}

