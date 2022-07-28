package utils

import (
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"log"
)

var Dsn = "host=localhost user=admin password=admin dbname=dinsights port=5432 sslmode=disable"

func createDB() *gorm.DB {
	db, err := gorm.Open(postgres.Open(Dsn), &gorm.Config{})
	if err != nil {
		log.Fatalln("Error connecting to Database: ", err)
	}
	log.Println("Database connected successfully")
	return db
}

var DB = createDB()
