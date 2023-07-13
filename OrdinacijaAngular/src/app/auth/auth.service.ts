import { Injectable } from '@angular/core';
import { Termin } from '../model/termin';
import { TerminService } from '../termin.service';
import { Observable, delay, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private doktor: boolean = false;
  private pacijent: boolean = false;
  private termini: Termin[];

  constructor(private ts: TerminService) {
    this.vratiSveTermine();
  }

  private vratiSveTermine(): void {
    this.ts.vratiSveTermine().subscribe({
      next: (data: Termin[]) => (this.termini = data),
      error: (err) => console.log(err),
    });
  }

  prijaviSe(jmbg: string): Observable<boolean> {
    if (jmbg === '42') {
      return this.prijaviDoktora();
    } else return this.prijaviPacijenta(jmbg);
  }

  private postoji(jmbg: string): boolean {
    return this.termini.some((t) => t.jmbg === jmbg);
  }

  private prijaviDoktora() {
    this.doktor = true;
    localStorage.setItem('doktor', this.doktor ? 'true' : 'false');

    return of(this.doktor).pipe(
      delay(1000),
      tap((val) => console.log(`Uspensna prijava: ${val}`))
    );
  }

  private prijaviPacijenta(jmbg: string) {
    this.pacijent = this.postoji(jmbg);
    localStorage.setItem('pacijent', this.pacijent ? 'true' : 'false');
    localStorage.setItem('jmbg', jmbg);

    return of(this.pacijent).pipe(
      delay(1000),
      tap((val) => console.log(`Uspensna prijava: ${val}`))
    );
  }

  odjaviSe(): void {
    this.doktor = false;
    this.pacijent = false;
    localStorage.clear();
  }
}
