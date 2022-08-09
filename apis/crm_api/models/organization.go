package models

import "gorm.io/gorm"

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
	Users           []User
	Products        []Product
}
