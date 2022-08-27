package views

import (
	"bytes"
	"encoding/json"
	"github.com/joegasewicz/decetralized-insights/crm_api/models"
	"github.com/joegasewicz/decetralized-insights/crm_api/schemas"
	"github.com/joegasewicz/decetralized-insights/crm_api/utils"
	form_validator "github.com/joegasewicz/form-validator"
	"github.com/joegasewicz/gomek"
	"io/ioutil"
	"log"
	"net/http"
)

func OrganizationCreate(w http.ResponseWriter, r *http.Request, d *gomek.Data) {
	templateData := make(gomek.Data)
	utils.BaseTemplateModel(r, &templateData)
	if r.Method == "GET" {
		*d = templateData
		return
	} else if r.Method == "POST" {
		c := form_validator.Config{
			MaxMemory: 10000,
			Fields: []form_validator.Field{
				{
					Name:     "name",
					Validate: true,
					Default:  "",
					Type:     "string",
				},
				{
					Name:     "branch",
					Validate: true,
					Default:  "",
					Type:     "string",
				},
				{
					Name:     "sector",
					Validate: true,
					Default:  "",
					Type:     "string",
				},
				{
					Name:     "contact_email",
					Validate: true,
					Default:  "",
					Type:     "string",
				},
				{
					Name:     "phone_number",
					Validate: true,
					Default:  "",
					Type:     "string",
				},
				{
					Name:     "contact_fullname",
					Validate: true,
					Default:  "",
					Type:     "string",
				},
				{
					Name:     "bank_name",
					Validate: true,
					Default:  "",
					Type:     "string",
				},
				{
					Name:     "sort_code",
					Validate: true,
					Default:  "",
					Type:     "string",
				},
				{
					Name:     "account_no",
					Validate: true,
					Default:  "",
					Type:     "uint",
				},
				{
					Name:     "comments",
					Validate: true,
					Default:  "",
					Type:     "string",
				},
			},
		}

		if ok := form_validator.ValidateForm(r, &c); ok {
			name, _ := form_validator.GetString("name", &c)
			branch, _ := form_validator.GetString("branch", &c)
			sector, _ := form_validator.GetString("sector", &c)
			contactEmail, _ := form_validator.GetString("contact_email", &c)
			contactPhone, _ := form_validator.GetString("phone_number", &c)
			contactFullname, _ := form_validator.GetString("contact_fullname", &c)
			bankName, _ := form_validator.GetString("bank_name", &c)
			sortCode, _ := form_validator.GetString("sort_code", &c)
			accountNumber, _ := form_validator.GetUint("account_no", &c)
			comments, _ := form_validator.GetString("comments", &c)

			orgModel := models.Organization{
				Name:            name,
				Branch:          branch,
				Sector:          sector,
				ContactEmail:    contactEmail,
				ContactPhone:    contactPhone,
				ContactFullname: contactFullname,
				BankName:        bankName,
				SortCode:        sortCode,
				AccountNo:       accountNumber,
				Comments:        comments,
			}

			result := utils.DB.Create(&orgModel)
			if result.RowsAffected == 0 {
				log.Println("No entrees created")
				return
			}
			// get accounts
			accountResp, err := http.Get("http://localhost:4000/accounts")
			body, err := ioutil.ReadAll(accountResp.Body)
			var accountData schemas.AccountData
			err = json.Unmarshal(body, &accountData)
			// Marshal org to JSON
			newOrg := schemas.Organisation{
				OrgID:         orgModel.ID,
				OrgName:       orgModel.Name,
				RecipientAddr: accountData.Data.Accounts[1],
			}
			b, err := json.Marshal(&newOrg)
			if err != nil {
				log.Println("error marshalling json", err)
				return
			}
			// Create organization entry on blockchain
			resp, err := http.Post("http://localhost:4000/organisation", "application/json", bytes.NewBuffer(b))
			postBody, err := ioutil.ReadAll(resp.Body)
			var orgContract schemas.OrgRespContact
			err = json.Unmarshal(postBody, &orgContract)

			log.Println("New contract created: ", orgContract.Data.Address)

			if resp.StatusCode != 200 {
				log.Println("organisation smart contract failure", err.Error())
			}
		} else {
			// TODO return validation errors
			log.Println("Error validating form values")
		}
		*d = templateData
		http.Redirect(w, r, "/organization", http.StatusSeeOther)
	}
}
