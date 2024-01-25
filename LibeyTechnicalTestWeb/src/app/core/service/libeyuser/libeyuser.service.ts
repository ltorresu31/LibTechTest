import { Injectable } from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../../environments/environment";
import { LibeyUser } from "src/app/entities/libeyuser";
@Injectable({
	providedIn: "root",
})
export class LibeyUserService {
  uri = `${environment.pathLibeyTechnicalTest}LibeyUser/`;
	constructor(private http: HttpClient) {}
  all(): Observable<any> {
    const uri = `${this.uri}all`;
    return this.http.get<any[]>(uri);
  }
	Find(documentNumber: string): Observable<LibeyUser> {
		const uri = `${this.uri}${documentNumber}`;
		return this.http.get<LibeyUser>(uri);
	}

  create(items: object): Observable<any> {
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
    });
    let params = {};
    for (let index in items) {
      // @ts-ignore
      params[index] = items[index];
    }
    return this.http.post<any>(this.uri, params, {headers: headers});
  }

  update(items: object): Observable<any> {
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
    });
    let params = {};
    for (let index in items) {
      // @ts-ignore
      params[index] = items[index];
    }
    return this.http.put<any>(this.uri, params, {headers: headers});
  }

  delete(documentNumber: string): Observable<any> {
    const uri = `${this.uri}${documentNumber}`;
    return this.http.delete<any>(uri);
  }
}
