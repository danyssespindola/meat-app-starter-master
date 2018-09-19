var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { CartItem } from './cart-item.model';
import { Injectable } from '@angular/core';
import { NotificationService } from '../../shared/messages/notification.service';
var ShoppingCartService = (function () {
    function ShoppingCartService(notificationService) {
        this.notificationService = notificationService;
        this.items = [];
    }
    ShoppingCartService.prototype.clear = function () {
        this.items = [];
    };
    ShoppingCartService.prototype.total = function () {
        return this.items.map(function (item) { return item.value(); }).reduce(function (prev, value) { return prev + value; }, 0);
    };
    ShoppingCartService.prototype.addItem = function (item) {
        var foundItem = this.items.find(function (mItem) { return mItem.menuItem.id === item.id; });
        if (foundItem) {
            this.increaseQty(foundItem);
        }
        else {
            this.items.push(new CartItem(item));
        }
        this.notificationService.notify("Voc\u00EA adicionou o item " + item.name);
    };
    ShoppingCartService.prototype.removeItem = function (item) {
        this.items.splice(this.items.indexOf(item), 1);
        this.notificationService.notify("Voc\u00EA removeu o item " + item.menuItem.name);
    };
    ShoppingCartService.prototype.increaseQty = function (item) {
        item.quantity = item.quantity + 1;
    };
    ShoppingCartService.prototype.decreaseQty = function (item) {
        if (item.quantity > 1) {
            item.quantity = item.quantity - 1;
        }
        else {
            this.removeItem(item);
        }
    };
    ShoppingCartService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [NotificationService])
    ], ShoppingCartService);
    return ShoppingCartService;
}());
export { ShoppingCartService };
//# sourceMappingURL=shopping-cart.service.js.map