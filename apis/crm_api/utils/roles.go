package utils

const (
	Super     = 1
	Admin     = 2
	Recipient = 3
)

type Role struct {
	Super     uint8
	Admin     uint8
	Recipient uint8
}

var Roles = Role{
	Super:     Super,
	Admin:     Admin,
	Recipient: Recipient,
}
