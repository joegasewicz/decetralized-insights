package middleware

import (
	"github.com/joegasewicz/decetralized-insights/crm_api/utils"
	"net/http"
	"strings"
)

var WhiteListRoutes = [][]string{
	{
		"/", "GET",
	},
	{
		"/login", "GET",
	},
	{
		"/login", "POST",
	},
	{
		"/logout", "POST",
	},
}

func allowRoute(routes [][]string, currentRoute string, reqMethod string) bool {
	for _, r := range routes {
		route, method := r[0], r[1]
		splitPath := strings.Split(route, "*")
		if len(splitPath) == 2 {
			// matchEndPath is the last path segment before the '/*'
			matchEndPath := splitPath[0]
			// matchEndPath should match the first part of the current route
			currentRouteMatch := strings.Split(currentRoute, matchEndPath)
			if currentRouteMatch[0] == "" && method == reqMethod {
				return true
			}
		} else {
			if route == currentRoute && method == reqMethod {
				return true
			}
		}
	}
	return false
}

func Authorize(next http.Handler) http.HandlerFunc {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if !allowRoute(WhiteListRoutes, r.RequestURI, r.Method) {
			session, _ := utils.AppStore.Get(r, utils.APP_STORE_NAME)
			if auth, ok := session.Values[utils.APP_STORE_VALUE_KEY].(bool); !ok || !auth {
				http.Error(w, "Forbidden", http.StatusForbidden)
				return
			}
		}
		next.ServeHTTP(w, r)
	})
}
