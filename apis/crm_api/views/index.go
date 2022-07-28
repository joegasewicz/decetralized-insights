package views

import (
	"github.com/joegasewicz/gomek"
	"net/http"
)

type Index struct {
}

func (i *Index) Get(w http.ResponseWriter, r *http.Request, d *gomek.Data) {

}
