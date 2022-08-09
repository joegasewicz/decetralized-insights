package views

import (
	"github.com/joegasewicz/decetralized-insights/crm_api/utils"
	"github.com/joegasewicz/gomek"
	"net/http"
)

func GetProducts(w http.ResponseWriter, r *http.Request, d *gomek.Data) {
	if r.Method == "GET" {
		templateData := make(gomek.Data)
		utils.BaseTemplateModel(r, &templateData)
		*d = templateData
	}
}
