package views

import (
	"github.com/joegasewicz/decetralized-insights/crm_api/utils"
	"github.com/joegasewicz/gomek"
	"log"
	"net/http"
)

func Logout(w http.ResponseWriter, r *http.Request, d *gomek.Data) {
	session, _ := utils.AppStore.Get(r, utils.APP_STORE_NAME)
	session.Values[utils.APP_STORE_VALUE_KEY] = false
	err := session.Save(r, w)
	if err != nil {
		log.Printf("Error trying to log user out %e\n", err)
	}
	http.Redirect(w, r, "/", http.StatusSeeOther)
}
