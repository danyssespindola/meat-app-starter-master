import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import { HttpErrorResponse } from '@angular/common/http';
var ErrorHandler = (function () {
    function ErrorHandler() {
    }
    ErrorHandler.handleError = function (error) {
        var errorMessage;
        if (error instanceof HttpErrorResponse) {
            var body = error.error;
            errorMessage = error.url + ": " + error.status + " - " + (error.statusText || '') + " " + body;
        }
        else {
            errorMessage = error.message ? error.message : error.toString();
        }
        console.log(errorMessage);
        return Observable.throw(errorMessage);
    };
    return ErrorHandler;
}());
export { ErrorHandler };
//# sourceMappingURL=app-error-handler.js.map