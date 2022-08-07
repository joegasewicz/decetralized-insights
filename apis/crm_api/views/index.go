package views

import (
	"github.com/joegasewicz/decetralized-insights/crm_api/models"
	"github.com/joegasewicz/decetralized-insights/crm_api/utils"
	"github.com/joegasewicz/gomek"
	"log"
	"net/http"
)

func Index(w http.ResponseWriter, r *http.Request, d *gomek.Data) {
	if r.Method == "GET" {
		templateData := make(gomek.Data)
		session, _ := utils.AppStore.Get(r, utils.APP_STORE_NAME)
		templateData["authenticated"] = session.Values[utils.APP_STORE_VALUE_KEY]
		*d = templateData
		return
	}
	if r.Method == "POST" {
		session, _ := utils.AppStore.Get(r, utils.APP_STORE_NAME)

		r.ParseMultipartForm(1024)
		email := r.FormValue("email")
		password := r.FormValue("password")
		if email == "" || password == "" {
			http.Redirect(w, r, "/", http.StatusUnauthorized)
		}

		var user models.User
		result := utils.DB.Where("email = ?", email).First(&user)
		if result.RowsAffected == 0 {
			http.Redirect(w, r, "/", http.StatusForbidden)
		}
		if user.Password != password {
			http.Redirect(w, r, "/", http.StatusForbidden)
		}
		session.Values[utils.APP_STORE_VALUE_KEY] = true
		session.Values["user_id"] = user.ID
		err := session.Save(r, w)
		if err != nil {
			log.Printf("Error saving sesions %e", err)
			http.Redirect(w, r, "/organization", http.StatusInternalServerError)
		}
		http.Redirect(w, r, "/organization", http.StatusSeeOther)
		return
	}
}
