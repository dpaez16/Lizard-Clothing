package main

import (
	"fmt"
	"log"
	"os"
	"encoding/json"
	"net/http"

	"github.com/sendgrid/sendgrid-go"
	"github.com/sendgrid/sendgrid-go/helpers/mail"
)


var LIZARD_CLOTHING_SALES_NAME = os.Getenv("LIZARD_CLOTHING_SALES_NAME")
var LIZARD_CLOTHING_SALES_EMAIL = os.Getenv("LIZARD_CLOTHING_SALES_EMAIL")
var LIZARD_CLOTHING_OWNER_NAME = os.Getenv("LIZARD_CLOTHING_OWNER_NAME")
var LIZARD_CLOTHING_OWNER_EMAIL = os.Getenv("LIZARD_CLOTHING_OWNER_EMAIL")
var SENDGRID_API_KEY = os.Getenv("SENDGRID_API_KEY")


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
			<li> Color: %s </li>
		</ul>
		`,
		order.Details.ProductType,
		order.Details.ProductName,
		order.Details.Size,
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
	Phone Number: %s <br>
	<br>
	%s`, title, order.Name, order.Email, order.PhoneNumber, bottomPortion)
}

func getSubject(specialOrder bool) string {
	if specialOrder {
		return "Lizard Clothing Special Order"
	} else {
		return "Lizard Clothing Order"
	}
}


func createEmail(order Order) *mail.SGMailV3 {
	from := mail.NewEmail(LIZARD_CLOTHING_SALES_NAME, LIZARD_CLOTHING_SALES_EMAIL)
	subject := getSubject(order.SpecialOrder)
	to := mail.NewEmail(order.Name, order.Email)
	message := createMessage(order)
	plainTextContent := message
	htmlContent := message
	singleEmail := mail.NewSingleEmail(from, subject, to, plainTextContent, htmlContent)

	owner := mail.NewEmail(LIZARD_CLOTHING_OWNER_NAME, LIZARD_CLOTHING_OWNER_EMAIL)
	p := mail.NewPersonalization()
	p.AddTos(owner)
	singleEmail.AddPersonalizations(p)

	return singleEmail
}


func SendOrder(w http.ResponseWriter, r *http.Request) {
	var order Order
	var resp Response

	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	err := json.NewDecoder(r.Body).Decode(&order)
	if err != nil {
		log.Println("JSON Decode Error:")
		RecordError(w, r, resp, err)
		return
	}

	// send email to Lizard Clothing owner and customer
	client := sendgrid.NewSendClient(SENDGRID_API_KEY)
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

