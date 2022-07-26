package main

import (
	"github.com/joegasewicz/decetralized-insights/crm_api/views"
	"github.com/joegasewicz/gomek"
	"log"
)

const (
	port = 3000
)

func main() {
	// Views
	journeyViews := views.Journey{}
	log.Printf("Starting Server on %d\n", port)
	// Gomek
	app := gomek.New(gomek.Config{})
	app.Route("/journeys").View(journeyViews.Get).Methods("GET")
	app.Use(gomek.Logging)
	app.Use(gomek.CORS)
	app.Listen(port)
	app.Start()
}
