/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/api.ts":
/*!********************!*\
  !*** ./src/api.ts ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"app\": () => (/* binding */ app),\n/* harmony export */   \"port\": () => (/* binding */ port)\n/* harmony export */ });\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n\nvar app = express__WEBPACK_IMPORTED_MODULE_0__();\nvar port = 3000;\n\n\n//# sourceURL=webpack://web3_api/./src/api.ts?");

/***/ }),

/***/ "./src/config.ts":
/*!***********************!*\
  !*** ./src/config.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar Config = /** @class */ (function () {\n    function Config() {\n        this.API_ENDPOINT = \"https://rinkeby.infura.io/v3/0e0fc99b32cf43cabbce107512ebf93e\";\n        this.SECRET_PHRASE = \"primary very behind toddler fancy select roof thing apple vague quote trend\";\n    }\n    return Config;\n}());\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Config);\n\n\n//# sourceURL=webpack://web3_api/./src/config.ts?");

/***/ }),

/***/ "./src/controllers/accounts.ts":
/*!*************************************!*\
  !*** ./src/controllers/accounts.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"getAccounts\": () => (/* binding */ getAccounts)\n/* harmony export */ });\n/* harmony import */ var web3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! web3 */ \"web3\");\n/* harmony import */ var web3__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(web3__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _services_provider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/provider */ \"./src/services/provider.ts\");\n/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../config */ \"./src/config.ts\");\n\n\n\nvar getAccounts = function (req, res) {\n    var config = new _config__WEBPACK_IMPORTED_MODULE_2__[\"default\"]();\n    var diProvider = new _services_provider__WEBPACK_IMPORTED_MODULE_1__.OrgProvider(config.SECRET_PHRASE, config.API_ENDPOINT);\n    var web3 = new (web3__WEBPACK_IMPORTED_MODULE_0___default())(diProvider.getProvider());\n    web3.eth.getAccounts()\n        .then(function (accounts) {\n        console.log('accounts: ', accounts);\n        res.json({\n            data: {\n                accounts: accounts,\n            },\n        });\n        return;\n    })\n        .catch(function (err) {\n        res.json({\n            error: err,\n        });\n        return;\n    });\n};\n\n\n//# sourceURL=webpack://web3_api/./src/controllers/accounts.ts?");

/***/ }),

/***/ "./src/controllers/organisations.ts":
/*!******************************************!*\
  !*** ./src/controllers/organisations.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"postNewOrganisation\": () => (/* binding */ postNewOrganisation)\n/* harmony export */ });\n/* harmony import */ var web3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! web3 */ \"web3\");\n/* harmony import */ var web3__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(web3__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _services_provider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/provider */ \"./src/services/provider.ts\");\n/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../config */ \"./src/config.ts\");\nvar __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __generator = (undefined && undefined.__generator) || function (thisArg, body) {\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\n    function verb(n) { return function (v) { return step([n, v]); }; }\n    function step(op) {\n        if (f) throw new TypeError(\"Generator is already executing.\");\n        while (_) try {\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\n            if (y = 0, t) op = [op[0] & 2, t.value];\n            switch (op[0]) {\n                case 0: case 1: t = op; break;\n                case 4: _.label++; return { value: op[1], done: false };\n                case 5: _.label++; y = op[1]; op = [0]; continue;\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\n                default:\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\n                    if (t[2]) _.ops.pop();\n                    _.trys.pop(); continue;\n            }\n            op = body.call(thisArg, _);\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\n    }\n};\n\n\n\nvar postNewOrganisation = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {\n    var config, diProvider, web3, accounts, args, err_1;\n    return __generator(this, function (_a) {\n        switch (_a.label) {\n            case 0:\n                config = new _config__WEBPACK_IMPORTED_MODULE_2__[\"default\"]();\n                diProvider = new _services_provider__WEBPACK_IMPORTED_MODULE_1__.OrgProvider(config.SECRET_PHRASE, config.API_ENDPOINT);\n                web3 = new (web3__WEBPACK_IMPORTED_MODULE_0___default())(diProvider.getProvider());\n                _a.label = 1;\n            case 1:\n                _a.trys.push([1, 3, , 4]);\n                return [4 /*yield*/, web3.eth.getAccounts()];\n            case 2:\n                accounts = _a.sent();\n                args = [1, \"d insights\", accounts[1]];\n                res.json({\n                    data: {\n                        accounts: accounts,\n                    },\n                });\n                return [3 /*break*/, 4];\n            case 3:\n                err_1 = _a.sent();\n                res.status(500);\n                res.json({\n                    error: err_1,\n                });\n                return [3 /*break*/, 4];\n            case 4: return [2 /*return*/];\n        }\n    });\n}); };\n\n\n//# sourceURL=webpack://web3_api/./src/controllers/organisations.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api */ \"./src/api.ts\");\n/* harmony import */ var _routes_organisations__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./routes/organisations */ \"./src/routes/organisations.ts\");\n/* harmony import */ var _routes_accounts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./routes/accounts */ \"./src/routes/accounts.ts\");\n\n\n\n_api__WEBPACK_IMPORTED_MODULE_0__.app.use(\"/organisation\", _routes_organisations__WEBPACK_IMPORTED_MODULE_1__.orgRoutes);\n_api__WEBPACK_IMPORTED_MODULE_0__.app.use(\"/accounts\", _routes_accounts__WEBPACK_IMPORTED_MODULE_2__.accountRoutes);\n_api__WEBPACK_IMPORTED_MODULE_0__.app.listen(_api__WEBPACK_IMPORTED_MODULE_0__.port, function () {\n    console.log(\"Starting server on port: \".concat(_api__WEBPACK_IMPORTED_MODULE_0__.port));\n});\n\n\n//# sourceURL=webpack://web3_api/./src/index.ts?");

/***/ }),

/***/ "./src/routes/accounts.ts":
/*!********************************!*\
  !*** ./src/routes/accounts.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"accountRoutes\": () => (/* binding */ accountRoutes)\n/* harmony export */ });\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _controllers_accounts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../controllers/accounts */ \"./src/controllers/accounts.ts\");\n\n\nvar router = express__WEBPACK_IMPORTED_MODULE_0__.Router();\nvar accountRoutes = router\n    .get(\"/\", _controllers_accounts__WEBPACK_IMPORTED_MODULE_1__.getAccounts);\n\n\n//# sourceURL=webpack://web3_api/./src/routes/accounts.ts?");

/***/ }),

/***/ "./src/routes/organisations.ts":
/*!*************************************!*\
  !*** ./src/routes/organisations.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"orgRoutes\": () => (/* binding */ orgRoutes)\n/* harmony export */ });\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _controllers_organisations__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../controllers/organisations */ \"./src/controllers/organisations.ts\");\n\n\nvar router = express__WEBPACK_IMPORTED_MODULE_0__.Router();\nvar orgRoutes = router.post(\"/\", _controllers_organisations__WEBPACK_IMPORTED_MODULE_1__.postNewOrganisation);\n\n\n//# sourceURL=webpack://web3_api/./src/routes/organisations.ts?");

/***/ }),

/***/ "./src/services/provider.ts":
/*!**********************************!*\
  !*** ./src/services/provider.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"OrgProvider\": () => (/* binding */ OrgProvider)\n/* harmony export */ });\n/* harmony import */ var _truffle_hdwallet_provider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @truffle/hdwallet-provider */ \"@truffle/hdwallet-provider\");\n/* harmony import */ var _truffle_hdwallet_provider__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_truffle_hdwallet_provider__WEBPACK_IMPORTED_MODULE_0__);\n\nvar OrgProvider = /** @class */ (function () {\n    function OrgProvider(secretPhrase, apiURL) {\n        this.secretPhrase = secretPhrase;\n        this.apiURL = apiURL;\n        this.provider = this.createProviderInstance();\n    }\n    OrgProvider.prototype.createProviderInstance = function () {\n        return new (_truffle_hdwallet_provider__WEBPACK_IMPORTED_MODULE_0___default())(this.secretPhrase, this.apiURL);\n    };\n    OrgProvider.prototype.getProvider = function () {\n        return this.provider;\n    };\n    return OrgProvider;\n}());\n\n\n\n//# sourceURL=webpack://web3_api/./src/services/provider.ts?");

/***/ }),

/***/ "@truffle/hdwallet-provider":
/*!*********************************************!*\
  !*** external "@truffle/hdwallet-provider" ***!
  \*********************************************/
/***/ ((module) => {

module.exports = require("@truffle/hdwallet-provider");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("express");

/***/ }),

/***/ "web3":
/*!***********************!*\
  !*** external "web3" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("web3");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;