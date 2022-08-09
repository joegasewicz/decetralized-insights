package models

import (
	"errors"
	"github.com/joegasewicz/decetralized-insights/crm_api/utils"
	"gorm.io/gorm"
	"log"
)

type User struct {
	gorm.Model
	Email          string `gorm:"unique"`
	Password       string
	Fullname       string
	RoleID         uint
	Role           Role
	OrganizationID uint
	Organization   Organization
}

func GetUserRole(u *User) string {
	var role Role
	r := utils.DB.First(&role, "id = ?", u.RoleID)
	if r.RowsAffected == 0 {
		log.Println("No role for user")
		return ""
	}
	return role.Name
}

func GetUserByID(u *User, ID string) error {
	var err error
	result := utils.DB.First(&u, "id = ?", ID)
	if result.RowsAffected == 0 {
		log.Println("user doesn't exist")
		err = errors.New("user doesn't exist")
		return err
	}
	return err
}
