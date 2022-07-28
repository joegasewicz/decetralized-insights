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
	//journeyViews := views.Journey{}
	indexView := views.Index{}
	log.Printf("Starting Server on %d\n", port)
	// Gomek
	app := gomek.New(gomek.Config{
		BaseTemplateName: "layout",
		BaseTemplates: []string{
			"./templates/layout.gohtml",
		},
	})
	app.Route("/").View(indexView.Get).Methods("GET").Templates(
		"./templates/routes/index.gohtml",
	)
	app.Use(gomek.Logging)
	//app.Use(gomek.CORS)
	app.Listen(port)
	app.Start()
}
