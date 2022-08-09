package views

import (
	"github.com/joegasewicz/decetralized-insights/crm_api/models"
	"github.com/joegasewicz/decetralized-insights/crm_api/utils"
	"github.com/joegasewicz/gomek"
	"log"
	"net/http"
)

type Organization struct {
}

func (o *Organization) Get(w http.ResponseWriter, r *http.Request, d *gomek.Data) {
	session, _ := utils.AppStore.Get(r, utils.APP_STORE_NAME)
	templateData := make(gomek.Data)
	templateData["authenticated"] = session.Values[utils.APP_STORE_VALUE_KEY]
	templateData["RequestURI"] = r.RequestURI
	templateData["IsActive"] = utils.IsActive

	// organization
	var orgs []models.Organization
	result := utils.DB.Find(&orgs)
	if result.RowsAffected == 0 {
		log.Println("No rows retrieved")
		w.WriteHeader(http.StatusNotFound)
	} else {
		templateData["Orgs"] = orgs
	}
	*d = templateData
	return
}
