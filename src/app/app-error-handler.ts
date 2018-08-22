import {Response} from '@angular/http'
import {Observable} from 'rxjs/Observable'
import 'rxjs/add/observable/throw'

export class ErrorHandler {
  static handleError(error: Response | any){
    let errorMessage: string
    if (error instanceof Response){
      errorMessage = `${error.url}: ${error.status} - ${error.statusText || ''}`;
    }else{
      errorMessage = error.message ? error.message : error.toString();
    }
    console.log(errorMessage)
    return Observable.throw(errorMessage);
  }
}