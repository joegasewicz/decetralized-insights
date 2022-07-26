package views

import (
	"github.com/joegasewicz/decetralized-insights/crm_api/schemas"
	"github.com/joegasewicz/gomek"
	"net/http"
)

type Journey struct {
}

func (j *Journey) Get(w http.ResponseWriter, r *http.Request, d *gomek.Data) {
	journeySchema := schemas.JourneySchema{Id: 1}
	gomek.JSON(w, journeySchema, http.StatusOK)
}

func (j *Journey) Post(w http.ResponseWriter, r *http.Request, d *gomek.Data) {

}

func (j *Journey) Delete(w http.ResponseWriter, r *http.Request, d *gomek.Data) {

}

func (j *Journey) Put(w http.ResponseWriter, r *http.Request, d *gomek.Data) {

}
