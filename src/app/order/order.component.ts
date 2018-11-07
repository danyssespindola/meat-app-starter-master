import { Component, OnInit } from '@angular/core';
import { RadioOption } from '../shared/radio/radio-option.model';
import { OrderService } from './order.service';
import { CartItem } from '../restaurant-detail/shopping-cart/cart-item.model';
import { Order, OrderItem } from './order.model';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl } from '@angular/forms';
import { LoginService } from '../security/login/login.service';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'mt-order',
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {

  orderForm: FormGroup;
  orderId: string;

  emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  numberPattern = /^[0-9]*$/;

  paymentOptions: RadioOption[] = [
    {label: 'Dinheiro', value: 'MON'},
    {label: 'Cartão de Débito', value: 'DEB'},
    {label: 'Cartão de Refeição', value: 'REF'}
  ];

  static equalsTo(group: AbstractControl): {[key: string]: boolean} {
    const email = group.get('email');
    const emailConfirmation = group.get('emailConfirmation');

    if (!email || !emailConfirmation) {
      return undefined;
    }

    if (email.value !== emailConfirmation.value) {
      return {emailsNotMatch: true};
    }

    return undefined;
  }

  constructor(private orderService: OrderService,
              private router: Router,
              private formBuilder: FormBuilder,
              private loginService: LoginService) {
   }

  ngOnInit() {
    this.orderForm = new FormGroup({
      name: new FormControl('', {validators: [Validators.required, Validators.minLength(5)]}),
      email: this.formBuilder.control('', [Validators.required, Validators.pattern(this.emailPattern)]),
      emailConfirmation: this.formBuilder.control('', [Validators.required, Validators.pattern(this.emailPattern)]),
      address: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
      number: this.formBuilder.control('', [Validators.required, Validators.minLength(3), Validators.pattern(this.numberPattern)]),
      optionalAddress: this.formBuilder.control(''),
      paymentOption: this.formBuilder.control('', [Validators.required])
    }, {validators: [OrderComponent.equalsTo], updateOn: 'blur'});

    if (this.loginService.isLoogedIn) {
      this.orderForm.controls['name'].setValue(this.loginService.user.name);
      this.orderForm.controls['email'].setValue(this.loginService.user.email);
      this.orderForm.controls['emailConfirmation'].setValue(this.loginService.user.email);
    }
  }

  cartItems(): CartItem[] {
    return this.orderService.cartItems();
  }

  total(): number {
    return this.orderService.total();
  }

  increaseQty(item: CartItem) {
    return this.orderService.increaseQty(item);
  }

  decreaseQty(item: CartItem) {
    return this.orderService.decreaseQty(item);
  }

  remove(item: CartItem) {
    return this.orderService.remove(item);
  }

  checkOrder(order: Order) {
    order.orderItems = this.cartItems().map((item: CartItem) => new OrderItem(item.quantity, item.menuItem.id));
    this.orderService.checkOrder(order).pipe
                     (tap((orderId: string) => {this.orderId = orderId}))
                     .subscribe( (orderId: string) => {
      this.router.navigate(['/order-sumary'])
      console.log(`Compra concluída: ${orderId}`)
      this.orderService.clear()
    });
    console.log(order);
  }

  isOrderCompleted(): boolean {
    return this.orderId !== undefined;
  }
}
