package models

import (
	"gorm.io/gorm"
)

type AccountType struct {
	gorm.Model
	Name string `gorm:"unique"`
}

type Account struct {
	gorm.Model
	AccountTypeID uint8
	AccountType
	Organization
}
