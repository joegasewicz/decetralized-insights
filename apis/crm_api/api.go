package main

import (
	"github.com/joegasewicz/decetralized-insights/crm_api/middleware"
	"github.com/joegasewicz/decetralized-insights/crm_api/models"
	"github.com/joegasewicz/decetralized-insights/crm_api/utils"
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
	orgView := views.Organization{}
	log.Printf("Starting Server on %d\n", port)
	// Database
	err := utils.DB.AutoMigrate(
		&models.Organization{},
		&models.ProductType{},
		&models.Product{},
		&models.AccountType{},
		&models.Account{},
		&models.Role{},
		&models.User{},
	)
	if err != nil {
		log.Fatalln("Failed to auto migrate: ", err)
	}
	// Gomek
	app := gomek.New(gomek.Config{
		BaseTemplateName: "layout",
		BaseTemplates: []string{
			"./templates/layout.gohtml",
			"./templates/partials/sidebar.gohtml",
			"./templates/partials/navbar.gohtml",
		},
	})

	// Static files
	distFiles := http.FileServer(http.Dir("dist"))
	app.Handle("/dist/", http.StripPrefix("/dist/", distFiles))

	// Route ------------------------------------------------------------------

	// '/index' Routes
	app.Route("/").View(views.Index).Methods("GET", "POST").Templates(
		"./templates/routes/index.gohtml",
	)

	// Logout
	app.Route("/logout").View(views.Logout).Methods("POST").Templates(
		"./templates/routes/index.gohtml",
	)

	// '/organization' Routes
	app.Route("/organization").View(orgView.Get).Methods("GET").Templates(
		"./templates/routes/organization.gohtml",
	)

	// Middleware ------------------------------------------------------------------
	//app.Use(gomek.Logging) // TODO fix gomek
	//app.Use(gomek.CORS) // TODO fix gomek
	app.Use(middleware.Authorize)

	app.Listen(port)
	app.Start()
}
