package main

import (
	"fmt"
	"log"
	"os"
	"net/http"

	"github.com/sendgrid/sendgrid-go"
	"github.com/sendgrid/sendgrid-go/helpers/mail"
	"github.com/gorilla/mux"
)

// https://www.youtube.com/watch?v=bZwJPbp_JMY

func sendSpecialOrder(w http.ResponseWriter, r *http.Request) {
	/*
	from := mail.NewEmail("Lizard Clothing", "lizard-clothing-sales@lc.com")
	subject := "Lizard Clothing Special Order"
	to := mail.NewEmail("Danny Paez", "dpaez16@yahoo.com")
	plainTextContent := "Made a special order request!"
	message := mail.NewSingleEmail(from, subject, to, plainTextContent, "")
	client := sendgrid.NewSendClient(os.Getenv("SENDGRID_API_KEY"))
	response, err := client.Send(message)

	if err != nil {
		log.Println(err)
	} else {
		fmt.Println(response.StatusCode)
		fmt.Println(response.Body)
		fmt.Println(response.Headers)
	}
	*/
}

func main() {
	myRouter := mux.NewRouter().StrictSlash(true)
	myRouter.HandleFunc("/sendSpecialOrder", sendSpecialOrder).Methods("POST")
	log.Fatal(http.ListenAndServe(":8000", myRouter))
}

