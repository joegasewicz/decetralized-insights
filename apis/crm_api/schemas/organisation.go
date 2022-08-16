package schemas

type Organisation struct {
	OrgID         uint   `json:"org_id"`
	OrgName       string `json:"org_name"`
	RecipientAddr string `json:"recipient_addr"`
}

type OrgData struct {
	Address string
}

type OrgRespContact struct {
	Data OrgData `json:"data"`
}
