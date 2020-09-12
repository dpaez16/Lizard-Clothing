package main

import (
	"log"
	"net/http"
	"github.com/rs/cors"
)


func main() {
	//products, err := 

	mux := http.NewServeMux()
	mux.HandleFunc("/sendOrder", SendOrder)

	options := cors.Options{
		AllowedMethods: []string{"POST"},
	}
	corsHandler := cors.New(options).Handler(mux)
	log.Fatal(http.ListenAndServe(":8000", corsHandler))
}

