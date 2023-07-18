import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Termin } from '../model/termin';
import { TerminService } from '../termin.service';

import * as moment from 'moment';
import { DatumService } from '../datum.service';

@Component({
  selector: 'app-zakazivanje',
  templateUrl: './zakazivanje.component.html',
  styleUrls: ['./zakazivanje.component.css'],
})
export class ZakazivanjeComponent {
  termini: Termin[];
  vremena: string[];
  zakazivanjeForma: FormGroup;

  constructor(
    private ts: TerminService,
    private fb: FormBuilder,
    private ds: DatumService
  ) {}

  ngOnInit(): void {
    this.vratiSveTermine();

    this.zakazivanjeForma = this.fb.group({
      datum: [null, [Validators.required]],
      vreme: ['', [Validators.required]],
      jmbg: [
        '',
        [
          Validators.required,
          Validators.maxLength(13),
          Validators.pattern('^[0-9]+$'),
        ],
      ],
      ime: ['', [Validators.required]],
      prezime: ['', [Validators.required]],
      brTelefona: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    });
  }

  private vratiSveTermine(): void {
    this.ts.vratiSveTermine().subscribe({
      next: (data: Termin[]) => {
        this.termini = data;
        this.vremena = this.ds.vratiVremena();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  get datum() {
    return this.zakazivanjeForma.get('datum');
  }

  get vreme() {
    return this.zakazivanjeForma.get('vreme');
  }

  get jmbg() {
    return this.zakazivanjeForma.get('jmbg');
  }

  get ime() {
    return this.zakazivanjeForma.get('ime');
  }

  get prezime() {
    return this.zakazivanjeForma.get('prezime');
  }

  get brTelefona() {
    return this.zakazivanjeForma.get('brTelefona');
  }

  zakazi(): void {
    const datum: string =
      this.datum == null
        ? moment(new Date()).format('yyyy-MM-dd')
        : this.datum?.value;
    const vreme = `${datum} ${this.vreme?.value}:00`;

    if (!this.termini.some((t) => t.vreme === vreme)) {
      const termin: Termin = {
        id: this.nadjiId(),
        datum: datum,
        vreme: vreme,
        jmbg: this.jmbg?.value,
        ime: this.ime?.value,
        prezime: this.prezime?.value,
        brTelefona: this.brTelefona?.value,
      };

      this.ts.zakaziTermin(termin).subscribe({
        next: (res) => console.log(res),
        error: (err) => console.error(err),
      });
    }
  }

  private nadjiId(): number {
    let id: number = 1;
    while (this.postoji(id) || id < this.termini.length) id++;
    return id;
  }

  private postoji(id: number): boolean {
    return this.termini.some((t) => t.id === id);
  }
}
