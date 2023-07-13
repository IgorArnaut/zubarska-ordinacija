import { Injectable } from '@angular/core';
import { Termin } from './model/termin';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl: string = 'http://localhost:8080/api';

@Injectable({
  providedIn: 'root',
})
export class TerminService {
  constructor(private http: HttpClient) {}

  zakaziTermin(termin: Termin) {
    return this.http.post(`${baseUrl}/termini`, termin);
  }

  vratiSveTermine(): Observable<Termin[]> {
    return this.http.get<Termin[]>(`${baseUrl}/termini`);
  }

  vratiTerminePacijenta(jmbg: string): Observable<Termin> {
    return this.http.get<Termin>(`${baseUrl}/pacijenti/${jmbg}/termin`);
  }

  otkaziTermin(id: number): Observable<any> {
    return this.http.delete<any>(`${baseUrl}/termini/${id}`);
  }
}
