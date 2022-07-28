package main

import (
	"github.com/joegasewicz/decetralized-insights/crm_api/views"
	"github.com/joegasewicz/gomek"
	"log"
	"net/http"
)

const (
	port = 3000
)

func main() {
	// Views
	//journeyViews := views.Journey{}
	indexView := views.Index{}
	orgView := views.Organization{}
	log.Printf("Starting Server on %d\n", port)

	// Gomek
	app := gomek.New(gomek.Config{
		BaseTemplateName: "layout",
		BaseTemplates: []string{
			"./templates/layout.gohtml",
			"./templates/partials/sidebar.gohtml",
		},
	})

	// Static ifles
	distFiles := http.FileServer(http.Dir("dist"))
	app.Handle("/dist/", http.StripPrefix("/dist/", distFiles))

	// Routes
	app.Route("/").View(indexView.Get).Methods("GET").Templates(
		"./templates/routes/index.gohtml",
	)
	app.Route("/organization").View(orgView.Get).Methods("GET").Templates(
		"./templates/routes/organization.gohtml",
	)
	// Middleware
	app.Use(gomek.Logging)
	//app.Use(gomek.CORS)

	app.Listen(port)
	app.Start()
}
