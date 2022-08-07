package views

import (
	"fmt"
	"github.com/joegasewicz/decetralized-insights/crm_api/utils"
	"github.com/joegasewicz/gomek"
	"net/http"
)

type Organization struct {
}

func (o *Organization) Get(w http.ResponseWriter, r *http.Request, d *gomek.Data) {
	session, _ := utils.AppStore.Get(r, utils.APP_STORE_NAME)
	templateData := make(gomek.Data)
	templateData["authenticated"] = session.Values[utils.APP_STORE_VALUE_KEY]
	fmt.Println("ere-----> ", templateData["authenticated"])
	*d = templateData
	return
}
