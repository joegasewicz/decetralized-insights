package utils

import (
	"github.com/antonlindstrom/pgstore"
	"log"
	"net/http"
)

func CreateStore() *pgstore.PGStore {
	var key = []byte("temp-secret")
	var store, err = pgstore.NewPGStore("postgres://admin:admin@127.0.0.1:5432/dinsights?sslmode=disable", key)
	if err != nil {
		store.Close()
		log.Fatalln(err.Error())
	}
	return store
}

var AppStore *pgstore.PGStore = CreateStore()

func GetUserIdFromSession(r *http.Request) interface{} {
	session, _ := AppStore.Get(r, "d-insights-auth")
	userID := session.Values["user_id"]
	return userID
}
