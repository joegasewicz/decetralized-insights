package views

import (
	"github.com/joegasewicz/decetralized-insights/crm_api/models"
	"github.com/joegasewicz/decetralized-insights/crm_api/utils"
	"github.com/joegasewicz/gomek"
	"log"
	"net/http"
)

func GetUsers(w http.ResponseWriter, r *http.Request, d *gomek.Data) {
	if r.Method == "GET" {
		var users []models.User
		templateData := make(gomek.Data)
		userID := utils.BaseTemplateModel(r, &templateData)
		var user models.User
		err := models.GetUserByID(&user, userID)
		if err != nil {
			log.Println(err)
			http.Redirect(w, r, "/", http.StatusForbidden)
			return
		}

		userRole := models.GetUserRole(&user)

		if userRole == "super" {

			userRes := utils.DB.Model(&models.User{}).Preload("Role").Preload("Organization").Find(&users)

			if userRes.Error != nil {
				log.Println("Failed to fetch users")
			}
		}
		templateData["UserRole"] = userRole
		templateData["Users"] = users
		*d = templateData
		return
	}
}
