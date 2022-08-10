package views

import (
	"github.com/joegasewicz/decetralized-insights/crm_api/models"
	"github.com/joegasewicz/decetralized-insights/crm_api/utils"
	"github.com/joegasewicz/gomek"
	"log"
	"net/http"
)

func GetProducts(w http.ResponseWriter, r *http.Request, d *gomek.Data) {
	if r.Method == "GET" {
		var products []models.Product
		templateData := make(gomek.Data)
		utils.BaseTemplateModel(r, &templateData)
		productsRes := utils.DB.Model(&models.Product{}).Preload("ProductType").Preload("Organization").Find(&products)
		if productsRes.Error != nil {
			log.Println("Error fetching productTypes")
		}
		templateData["Products"] = products
		*d = templateData
	}
}
