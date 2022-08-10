package views

import (
	"github.com/joegasewicz/decetralized-insights/crm_api/models"
	"github.com/joegasewicz/decetralized-insights/crm_api/utils"
	form_validator "github.com/joegasewicz/form-validator"
	"github.com/joegasewicz/gomek"
	"log"
	"net/http"
)

func ProductsCreate(w http.ResponseWriter, r *http.Request, d *gomek.Data) {
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
		var productTypes []models.ProductType
		productTypesRes := utils.DB.Find(&productTypes)
		if productTypesRes.Error != nil {
			log.Println("products not found")
		}
		templateData["Organisations"] = organisations
		templateData["ProductTypes"] = productTypes
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
					Name:     "product_name",
					Validate: true,
					Default:  "",
					Type:     "string",
				},
				{
					Name:     "product_type_id",
					Validate: true,
					Default:  "",
					Type:     "uint",
				},
				{
					Name:     "qr_key",
					Validate: true,
					Default:  "",
					Type:     "uint",
				},
				{
					Name:     "bar_code",
					Validate: true,
					Default:  "",
					Type:     "string",
				},
			},
		}
		if ok := form_validator.ValidateForm(r, &c); ok {

			orgID, _ := form_validator.GetUint("organisation_id", &c)
			productName, _ := form_validator.GetString("product_name", &c)
			productTypeID, _ := form_validator.GetUint("product_type_id", &c)
			QRKey, _ := form_validator.GetUint("qr_key", &c)
			Barcode, _ := form_validator.GetString("bar_code", &c)

			newProduct := models.Product{
				Name:           productName,
				ProductTypeID:  productTypeID,
				OrganizationID: orgID,
				QRKey:          QRKey,
				Barcode:        Barcode,
			}
			productRes := utils.DB.Create(&newProduct)
			if productRes.Error != nil {
				log.Println("couldnt save product")
			}
			log.Println("Successfully created product")
		} else {
			log.Println("Error validating form values")
			// return validation
		}
		http.Redirect(w, r, "/products", http.StatusSeeOther)
	}

}
