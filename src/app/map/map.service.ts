import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, Subject } from 'rxjs';
import { Nep } from './nep.model';

@Injectable({
    providedIn: 'root'
  })
export class MapService {

    baseUrl: string = "http://127.0.0.1:8080/api/nep/";

    constructor(private http: HttpClient) { } 	

    getLoc(id: number): Observable<Nep> {
		return this.http.get<Nep>(this.baseUrl + id);
	}

    getAllLoc(): Observable<Nep[]> {
		return this.http.get<Nep[]>(this.baseUrl + "all");
	}

  getPath(source: number, target: number): Observable<Nep[]> {
		return this.http.get<Nep[]>(this.baseUrl + "test4/" + source + "/" + target);
	}

  getSourceFromVertex(id: number): Observable<number> {
		return this.http.get<number>(this.baseUrl + "source/" + id);
	}

}