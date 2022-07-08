import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  cancelHttpCall: Subject<void> = new Subject<void>();

  constructor(private http: HttpClient) {}

  private static getUrl(service: string): string {
    switch (service) {
      default:
        return environment.backendUrl;
    }
  }

  get(service: string, uri: string): Observable<any> {
      const headers = new HttpHeaders()
        .append('Accept', 'application/json');

      let httpParams = new HttpParams();

      return this.http.get<any>(HttpService.getUrl(service) + uri, {headers, params: httpParams})
        .pipe(takeUntil(this.cancelHttpCall));

  }

  post(service: string, uri: string, body: any = {}): Observable<any> {

      const headers = new HttpHeaders()
        .append('Accept', 'application/json')
        .append('Content-Type', 'application/json');

      let httpParams = new HttpParams();

      return this.http.post<any>(HttpService.getUrl(service) + uri, JSON.stringify(body), {headers, params: httpParams})
        .pipe(takeUntil(this.cancelHttpCall));

  }

  put(service: string, uri: string, body: any = {}): Observable<any> {
      const headers = new HttpHeaders()
        .append('Accept', 'application/json')
        .append('Content-Type', 'application/json');

      let httpParams = new HttpParams();

      return this.http.put<any>(HttpService.getUrl(service) + uri, JSON.stringify(body), {headers, params: httpParams})
        .pipe(takeUntil(this.cancelHttpCall));
  }

  delete(service: string, uri: string): Observable<any> {

      let httpParams = new HttpParams();

      return this.http.delete<any>(HttpService.getUrl(service) + uri, {params: httpParams})
        .pipe(takeUntil(this.cancelHttpCall));

  }

  unsubscribeHttpCall() {
    this.cancelHttpCall.next();
  }
}
