import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  fetchUserByName(username: string): any {
    const url = `${environment.baseUrl}/users?q=${username}`;
    return this.http.get<any>(url);
  }
}
