package models

import "gorm.io/gorm"

type Role struct {
	gorm.Model
	Name string `gorm:"unique"`
}

type User struct {
	gorm.Model
	RoleID uint8
	Role
	Email    string `gorm:"unique"`
	Password string
	Organization
}
