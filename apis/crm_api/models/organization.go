package models

import "gorm.io/gorm"

type Organization struct {
	gorm.Model
	name     string `gorm:"unique"`
	Products []Product
}
