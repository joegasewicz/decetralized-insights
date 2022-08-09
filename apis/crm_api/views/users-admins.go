package views

import (
	"github.com/joegasewicz/decetralized-insights/crm_api/models"
	"github.com/joegasewicz/decetralized-insights/crm_api/utils"
	form_validator "github.com/joegasewicz/form-validator"
	"github.com/joegasewicz/gomek"
	"log"
	"net/http"
)

func UsersAdmins(w http.ResponseWriter, r *http.Request, d *gomek.Data) {
	var user models.User
	templateData := make(gomek.Data)
	userID := utils.BaseTemplateModel(r, &templateData)
	result := utils.DB.First(&user, "id = ?", userID)
	if result.RowsAffected == 0 {
		log.Println("User not found")
		http.Redirect(w, r, "/users", http.StatusNotFound)
		return
	}
	userRole := models.GetUserRole(&user)
	if userRole != "super" {
		log.Println("User does not have credentials")
		http.Redirect(w, r, "/users", http.StatusForbidden)
		return
	}
	if r.Method == "GET" {
		var organisations []models.Organization
		orgRes := utils.DB.Find(&organisations)
		if orgRes.Error != nil {
			log.Println("organisations not found")
		}
		templateData["Organisations"] = organisations
		*d = templateData
	} else if r.Method == "POST" {
		c := form_validator.Config{
			MaxMemory: 0,
			Fields: []form_validator.Field{
				{
					Name:     "organisation_id",
					Validate: true,
					Default:  "",
					Type:     "uint",
				},
				{
					Name:     "fullname",
					Validate: true,
					Default:  "",
					Type:     "string",
				},
				{
					Name:     "email",
					Validate: true,
					Default:  "",
					Type:     "string",
				},
				{
					Name:     "password",
					Validate: true,
					Default:  "",
					Type:     "string",
				},
			},
		}
		if ok := form_validator.ValidateForm(r, &c); ok {
			var role models.Role
			models.GetRoleByName("admin", &role)
			userOrgID, _ := form_validator.GetUint("organisation_id", &c)
			userFullname, _ := form_validator.GetString("fullname", &c)
			userEmail, _ := form_validator.GetString("email", &c)
			userPassword, _ := form_validator.GetString("password", &c)
			newUser := models.User{
				Email:          userEmail,
				Password:       userPassword,
				Fullname:       userFullname,
				RoleID:         role.ID,
				OrganizationID: userOrgID,
			}
			userRes := utils.DB.Create(&newUser)
			if userRes.Error != nil {
				log.Println("couldnt save user")
			}
			log.Println("Successfully created user")
			http.Redirect(w, r, "/users", http.StatusSeeOther)
		} else {
			log.Println("Error validating form values")
			// return validation
		}
	}

}
