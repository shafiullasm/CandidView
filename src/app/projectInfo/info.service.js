"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/toPromise");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
var Rx_1 = require("rxjs/Rx");
var InfoService = (function () {
    function InfoService(http) {
        this.http = http;
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        this.apiUrl = 'http://localhost:64565/Api/Values'; // URL to web api
    }
    InfoService.prototype.getProjectDetails = function () {
        return this.http.get(this.apiUrl).map(this.success).catch(this.handleError);
    };
    InfoService.prototype.handleError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Rx_1.Observable.throw(error.message || error);
    };
    InfoService.prototype.success = function (res) {
        return res.json();
    };
    return InfoService;
}());
InfoService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], InfoService);
exports.InfoService = InfoService;
//# sourceMappingURL=info.service.js.map