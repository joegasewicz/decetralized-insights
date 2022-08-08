package views

import (
	"fmt"
	"github.com/joegasewicz/decetralized-insights/crm_api/models"
	"github.com/joegasewicz/decetralized-insights/crm_api/utils"
	"github.com/joegasewicz/gomek"
	"log"
	"net/http"
)

func GetUsers(w http.ResponseWriter, r *http.Request, d *gomek.Data) {
	if r.Method == "GET" {
		templateData := make(gomek.Data)
		var user models.User
		// Session
		session, _ := utils.AppStore.Get(r, utils.APP_STORE_NAME)
		templateData["authenticated"] = session.Values[utils.APP_STORE_VALUE_KEY]

		// Models
		userID := fmt.Sprintf("%v", session.Values["user_id"])
		result := utils.DB.First(&user, "id = ?", userID)
		if result.RowsAffected == 0 {
			log.Println("User doesn't exist")
			http.Redirect(w, r, "/", http.StatusForbidden)
			return
		}
		*d = templateData
		return
	}
}
