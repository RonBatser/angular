import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  


  getHelloWorld() {
    return this.http.get('https://hackthefuture.dev.freebility.be/fellowship/4c8ecbf5-64f4-429f-98ab-a6bddc774135/state');
  }

  createGame(diff) {
    const headerDict = {
      'Content-Type': 'text/plain',
      'Accept': 'text/plain',
      'Access-Control-Allow-Headers': 'Content-Type',
    }

    let HTTPOptions: Object = {

      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      responseType: 'text'
    }

    return this.http.post<any>(`https://hackthefuture.dev.freebility.be/fellowship/start/${diff}`, HTTPOptions);
  }

  getGameState(gameId){
    return this.http.get(`https://hackthefuture.dev.freebility.be/fellowship/${gameId}/state`);
  }

  move(direction,gameId){
    let HTTPOptions: Object = {

      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      responseType: 'text'
    }

    return this.http.put(`https://hackthefuture.dev.freebility.be/fellowship/${gameId}/move/${direction}`,HTTPOptions);
  }



}