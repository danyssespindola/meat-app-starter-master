import { CanDeactivate, ActivatedRouteSnapshot, RouterState, RouterStateSnapshot } from '@angular/router';
import { OrderComponent } from './order.component';

export class LeaveOrderGuard implements CanDeactivate<OrderComponent> {
    canDeactivate(component: OrderComponent,
                  currentRoute: ActivatedRouteSnapshot,
                  currentState: RouterStateSnapshot): boolean
    // tslint:disable-next-line:one-line
    {
        if (!component.isOrderCompleted()) {
        return window.confirm('Deseja desistir da compra?');
        } else {
        return true;
        }
    }
}
