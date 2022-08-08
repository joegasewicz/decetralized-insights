package models

import (
	"github.com/joegasewicz/decetralized-insights/crm_api/utils"
	"gorm.io/gorm"
	"log"
)

type Role struct {
	gorm.Model
	Name  string `gorm:"unique"`
	Users []User
}

func GetRoleByName(name string, role *Role) {
	superResult := utils.DB.Where("name = ?", name).First(&role)
	if superResult.RowsAffected == 0 {
		log.Fatalln("Couldn't fetch roles")
	}
}
