import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import {Observable} from "rxjs";

import AppConstants from '../app.constants';

@Injectable()
export class BinService {

  constructor(
    private httpClient: HttpClient
  ) {}

  private static headers(): HttpHeaders {
    return new HttpHeaders()
      .set("Content-Type", "application/json");
  }

  create(code: string): Observable<any> {

    let headers = BinService.headers();
    return this.httpClient.post(
      AppConstants.API_URL + "create",
      JSON.stringify({
        data: code
      }),
      {
        headers
      }
    );
  }


  fetch(id: string): Observable<any> {

    let headers = BinService.headers();

    return this.httpClient.get(
      AppConstants.API_URL + id,
      {
        headers
      }
    );
  }

}
