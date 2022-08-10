package models

import (
	"github.com/joegasewicz/decetralized-insights/crm_api/utils"
	"gorm.io/gorm"
	"log"
)

// ProductType - simple or complex
type ProductType struct {
	gorm.Model
	Name string `gorm:"unique"`
}

type Product struct {
	gorm.Model
	Name           string
	ProductTypeID  uint
	ProductType    ProductType
	OrganizationID uint
	Organization   Organization
	QRKey          uint
	Barcode        string
}

func GetProductType(name string, p *ProductType) {
	res := utils.DB.Where("name = ?", name).First(&p)
	if res.RowsAffected == 0 {
		log.Fatalln("Couldn't fetch productTypes")
	}
}
