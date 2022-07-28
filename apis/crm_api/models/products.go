package models

import "gorm.io/gorm"

// ProductType - simple or complex
type ProductType struct {
	gorm.Model
	Name string `gorm:"unique"`
}

type Product struct {
	gorm.Model
	Name          string
	ProductTypeID uint
	ProductType
	OrganizationID uint
}
