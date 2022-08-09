package utils

import (
	"fmt"
	"github.com/joegasewicz/gomek"
	"net/http"
)

func IsActive(route, test string) string {
	if route == test {
		return "active"
	}
	return ""
}

func BaseTemplateModel(r *http.Request, d *gomek.Data) string {
	templateData := make(gomek.Data)
	session, _ := AppStore.Get(r, APP_STORE_NAME)
	templateData["authenticated"] = session.Values[APP_STORE_VALUE_KEY]
	templateData["RequestURI"] = r.RequestURI
	templateData["IsActive"] = IsActive
	*d = templateData
	userID := session.Values["user_id"]
	return fmt.Sprintf("%v", userID)
}
