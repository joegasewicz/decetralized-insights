package utils

func IsActive(route, test string) string {
	if route == test {
		return "active"
	}
	return ""
}
