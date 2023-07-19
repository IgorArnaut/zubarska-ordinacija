import { Component, OnInit } from '@angular/core';

import { Termin } from '../../model/termin';
import { TerminService } from '../../termin.service';

import { groupBy, values } from 'lodash';
import { DatumService } from 'src/app/datum.service';
import * as moment from 'moment';

@Component({
  selector: 'app-dnevni-prikaz',
  templateUrl: './dnevni-prikaz.component.html',
  styleUrls: ['./dnevni-prikaz.component.css'],
})
export class DnevniPrikazComponent implements OnInit {
  termini: Map<string, any>[];
  danas: Map<string, any>;
  index: number;

  constructor(private ts: TerminService, private ds: DatumService) {}

  ngOnInit(): void {
    this.index = 0;
    this.vratiSveTermine();
  }

  vratiSveTermine(): void {
    this.ts
      .vratiSveTermine()
      .pipe()
      .subscribe({
        next: (data: Termin[]) => {
          this.popuniTermine(data);
          this.danas = this.termini[this.index];
        },
        error: (err) => console.log(err),
      });
  }

  private popuniTermine(data: Termin[]) {
    let temp: Termin[][] = values(groupBy(data, (d) => d.datum));
    temp.sort((a, b) => this.ds.uporedi(a[0].datum, b[0].datum));
    this.termini = temp.map((t) => this.rasporediTermine(t));
  }

  private rasporediTermine(termini: Termin[]) {
    let dict: Map<string, any> = this.inicirajMapu();
    termini.forEach((t) => {
      const vreme: string = moment(t.vreme).format('HH:mm');
      dict.set(vreme, t);
    });
    return dict;
  }

  private inicirajMapu() {
    let dict: Map<string, any> = new Map<string, any>();
    this.ds.vratiVremena().forEach((v) => dict.set(v, null));
    return dict;
  }

  prethodni(): void {
    if (this.index > 0) {
      this.index -= 1;
      this.danas = this.termini[this.index];
    }
  }

  sledeci(): void {
    if (this.index < this.termini.length) {
      this.index += 1;
      this.danas = this.termini[this.index];
    }
  }
}
