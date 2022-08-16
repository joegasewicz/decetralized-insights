package views

import (
	"github.com/joegasewicz/decetralized-insights/crm_api/models"
	"github.com/joegasewicz/decetralized-insights/crm_api/utils"
	form_validator "github.com/joegasewicz/form-validator"
	"github.com/joegasewicz/gomek"
	"log"
	"net/http"
)

func InsightsCreate(w http.ResponseWriter, r *http.Request, d *gomek.Data) {
	var user models.User
	templateData := make(gomek.Data)
	userID := utils.BaseTemplateModel(r, &templateData)
	result := utils.DB.First(&user, "id = ?", userID)
	if result.RowsAffected == 0 {
		log.Println("User not found")
		http.Redirect(w, r, "/products", http.StatusNotFound)
		return
	}
	userRole := models.GetUserRole(&user)
	if userRole != "super" && userRole != "admin" {
		log.Println("User does not have credentials")
		http.Redirect(w, r, "/products", http.StatusForbidden)
		return
	}
	if r.Method == "GET" {
		var organisations []models.Organization
		orgRes := utils.DB.Find(&organisations)
		if orgRes.Error != nil {
			log.Println("organisations not found")
		}
		var products []models.Product
		productRes := utils.DB.Find(&products)
		if productRes.Error != nil {
			log.Println("products not found")
		}
		templateData["Organisations"] = organisations
		templateData["Products"] = products
		*d = templateData
	} else if r.Method == "POST" {
		c := form_validator.Config{
			MaxMemory: 10000,
			Fields: []form_validator.Field{
				{
					Name:     "organisation_id",
					Validate: true,
					Default:  "",
					Type:     "uint",
				},
				{
					Name:     "product_id",
					Validate: true,
					Default:  "",
					Type:     "uint",
				},
			},
		}
		if ok := form_validator.ValidateForm(r, &c); ok {
			orgID, _ := form_validator.GetUint("organisation_id", &c)
			productID, _ := form_validator.GetUint("product_id", &c)

			// get product data
			var organisation models.Organization
			var product models.Product

			// get organisation data
			res := utils.DB.Where("id = ?", orgID).First(&organisation)
			if res.Error != nil {
				log.Println("error fetching org", res.Error)
			}
			res = utils.DB.Where("id = ?", productID).First(&product)
			if res.Error != nil {
				log.Println("error fetching product", res.Error)
			}

			// make a request to journeys_api

		} else {
			log.Println("Error validating form values")
			// return validation
		}
		http.Redirect(w, r, "/insights", http.StatusSeeOther)
	}

}
