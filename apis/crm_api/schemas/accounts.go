package schemas

type Data struct {
	Accounts []string `json:"accounts"`
}

type AccountData struct {
	Data `json:"data"`
}
