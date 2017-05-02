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
var info_service_1 = require("./info.service");
var InfoComponent = (function () {
    function InfoComponent(infoService) {
        this.infoService = infoService;
        this.title = "test";
        this.getProjectDetails();
    }
    InfoComponent.prototype.getProjectDetails = function () {
        var _this = this;
        this.infoService.getProjectDetails().subscribe(function (x) { return _this.info = x; });
    };
    InfoComponent.prototype.ngOnInit = function () {
        // this.getProjectDetails();
    };
    return InfoComponent;
}());
InfoComponent = __decorate([
    core_1.Component({
        selector: 'my-info',
        templateUrl: './info.component.html',
    }),
    __metadata("design:paramtypes", [info_service_1.InfoService])
], InfoComponent);
exports.InfoComponent = InfoComponent;
//# sourceMappingURL=info.component.js.map