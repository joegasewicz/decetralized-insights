package views

import (
	"github.com/joegasewicz/gomek"
	"net/http"
)

func GetHome(w http.ResponseWriter, r *http.Request, d *gomek.Data) {
	templateData := make(gomek.Data)
	templateData["Page"] = "Home"
	*d = templateData
}
