import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MEAT_API } from '../../app.api';
import { Observable } from 'rxjs/Observable';
import { User } from './user.model';

@Injectable()
export class LoginService {
    constructor(private http: HttpClient) {}

    login(email: string, password: string): Observable<User> {
        return this.http.post<User>(`${MEAT_API}/login`, {email: email, password: password});
    }
}
