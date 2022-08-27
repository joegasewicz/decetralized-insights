package models

import "gorm.io/gorm"

type Sector struct {
	gorm.Model
	Name string `gorm:"unique"`
}

type Organization struct {
	gorm.Model
	Name            string `gorm:"unique"`
	Branch          string
	Sector          string
	ContactEmail    string
	ContactPhone    string
	ContactFullname string
	BankName        string
	SortCode        string
	AccountNo       uint
	Comments        string
	ContractAddr    string
	Users           []User
	Products        []Product
}
