import { __decorate, __metadata } from "tslib";
import { Component } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
var HeaderComponent = /** @class */ (function () {
    function HeaderComponent(dataStorageService) {
        this.dataStorageService = dataStorageService;
    }
    HeaderComponent.prototype.onSaveData = function () {
        this.dataStorageService.storeRecipes();
    };
    HeaderComponent.prototype.onFetchData = function () {
        this.dataStorageService.fetchRecipes();
    };
    HeaderComponent = __decorate([
        Component({
            selector: 'app-header',
            templateUrl: './header.component.html'
        }),
        __metadata("design:paramtypes", [DataStorageService])
    ], HeaderComponent);
    return HeaderComponent;
}());
export { HeaderComponent };
//# sourceMappingURL=header.component.js.map