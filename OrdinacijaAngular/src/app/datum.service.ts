import { Injectable, OnInit } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class DatumService {
  constructor() {
    this.vratiVremena();
  }

  vratiVremena(): string[] {
    const vremena = [];

    for (let i = 9; i < 17; i++) {
      const sat: string = i < 10 ? `0${i}` : `${i}`;
      const opcija1 = `${sat}:00`;
      const opcija2 = `${sat}:30`;
      vremena.push(opcija1);
      vremena.push(opcija2);
    }

    return vremena;
  }

  uporedi(a: string, b: string): number {
    return a.localeCompare(b);
  }

  vratiSedmicu(datum: string): number {
    return moment(new Date(datum)).week();
  }
}
