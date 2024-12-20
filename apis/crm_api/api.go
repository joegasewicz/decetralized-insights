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
	// Seed database
	log.Println("Seeding database")
	org := models.Organization{
		Name:            "D-insights",
		Branch:          "Global",
		Sector:          "PR",
		ContactEmail:    "admin@dinsights.tech",
		ContactPhone:    "12345678334",
		ContactFullname: "Haresh",
	}
	orgResult := utils.DB.Create(&org)
	if orgResult.RowsAffected != 0 {
		log.Println("Seeded organisation")
	}
	roles := []models.Role{
		{
			Name: "super",
		},
		{
			Name: "admin",
		},
		{
			Name: "recipient",
		},
	}
	rolesRes := utils.DB.Create(&roles)
	if rolesRes.Error == nil {
		log.Println("seeded roles")
	}
	productTypes := []models.ProductType{
		{
			Name: "simple",
		},
		{
			Name: "complex",
		},
	}
	productTypesRes := utils.DB.Create(&productTypes)
	if productTypesRes.Error == nil {
		log.Println("Seeded productTypes")
	}
	var superRole models.Role
	models.GetRoleByName("super", &superRole)
	superUsers := []models.User{
		{
			Email:          "pymailio@gmail.com",
			Password:       "wizard",
			RoleID:         uint(superRole.ID),
			OrganizationID: org.ID,
		},
		{
			Email:          "haresh@email.com",
			Password:       "wizard",
			RoleID:         uint(superRole.ID),
			OrganizationID: org.ID,
		},
	}
	super := utils.DB.Create(&superUsers)
	if super.RowsAffected != 0 {
		log.Println("Seeded new super user")
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
	publicImgs := http.FileServer(http.Dir("public/imgs"))
	app.Handle("/dist/", http.StripPrefix("/dist/", distFiles))
	app.Handle("/public/imgs/", http.StripPrefix("/public/imgs/", publicImgs))

	// Route ------------------------------------------------------------------

	// '/' Routes
	app.Route("/").View(views.GetHome).Methods("GET").Templates(
		"./templates/routes/home.gohtml",
	)

	// '/login' Routes
	app.Route("/login").View(views.Index).Methods("GET", "POST").Templates(
		"./templates/routes/login.gohtml",
	)

	// Logout
	app.Route("/logout").View(views.Logout).Methods("POST").Templates(
		"./templates/routes/login.gohtml",
	)

	// '/organization' Routes
	app.Route("/organization").View(orgView.Get).Methods("GET").Templates(
		"./templates/routes/organization.gohtml",
	)

	// '/organization/create' Routes
	app.Route("/organization/create").View(views.OrganizationCreate).Methods("GET", "POST").Templates(
		"./templates/routes/organization-create.gohtml",
	)

	// '/products' Routes
	app.Route("/products").View(views.GetProducts).Methods("GET").Templates(
		"./templates/routes/products.gohtml",
	)

	// '/products/create' Routes
	app.Route("/products/create").View(views.ProductsCreate).Methods("GET", "POST").Templates(
		"./templates/routes/products-create.gohtml",
	)

	// '/insights' Routes
	app.Route("/insights").View(views.GetInsights).Methods("GET").Templates(
		"./templates/routes/insights.gohtml",
	)

	// '/insights/create' Routes
	app.Route("/insights/create").View(views.InsightsCreate).Methods("GET", "POST").Templates(
		"./templates/routes/insights-create.gohtml",
	)

	// '/users' Routes
	app.Route("/users").View(views.GetUsers).Methods("GET").Templates(
		"./templates/routes/users.gohtml",
	)

	// '/users/admins' Routes
	app.Route("/users/admins").View(views.UsersAdmins).Methods("GET", "POST").Templates(
		"./templates/routes/users-admins.gohtml",
	)

	// '/users/recipients' Routes
	app.Route("/users/recipients").View(views.UserRecipients).Methods("GET", "POST").Templates(
		"./templates/routes/users-recipients.gohtml",
	)

	// Middleware ------------------------------------------------------------------
	//app.Use(gomek.Logging) // TODO fix gomek
	//app.Use(gomek.CORS) // TODO fix gomek
	app.Use(middleware.Authorize)

	app.Listen(port)
	app.Start()
}
