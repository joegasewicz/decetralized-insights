package models

import "gorm.io/gorm"

type Organization struct {
	gorm.Model
	Name     string `gorm:"unique"`
	Users    []User
	Products []Product
}
