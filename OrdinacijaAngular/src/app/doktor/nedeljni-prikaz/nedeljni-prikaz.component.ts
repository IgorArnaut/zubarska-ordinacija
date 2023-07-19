import { Component } from '@angular/core';

import { Termin } from '../../model/termin';
import { TerminService } from '../../termin.service';

import { groupBy, values } from 'lodash';
import { DatumService } from 'src/app/datum.service';
import * as moment from 'moment';

@Component({
  selector: 'app-nedeljni-prikaz',
  templateUrl: './nedeljni-prikaz.component.html',
  styleUrls: ['./nedeljni-prikaz.component.css'],
})
export class NedeljniPrikazComponent {
  termini: Map<string, Map<number, any>>[];
  index: number;
  sedmica: Map<string, Map<number, any>>;

  constructor(private ts: TerminService, private ds: DatumService) {}

  ngOnInit(): void {
    this.index = 0;
    this.vratiSveTermine();
  }

  vratiSveTermine(): void {
    this.ts.vratiSveTermine().subscribe({
      next: (data: Termin[]) => {
        this.popuniTermine(data);
        this.sedmica = this.termini[0];
      },
      error: (err) => console.log(err),
    });
  }

  private popuniTermine(data: Termin[]) {
    let temp: Termin[][] = values(
      groupBy(data, (d) => this.ds.vratiSedmicu(d.datum))
    );
    this.termini = temp.map((w) => this.rasporediTermine(w));
  }

  private rasporediTermine(termini: Termin[]) {
    let dict: Map<string, Map<number, any>> = this.inicirajMapu();
    termini.forEach((v) => {
      const dan: number = moment(v.datum).isoWeekday();
      const vreme: string = moment(v.vreme).format('HH:mm');
      dict.get(vreme)?.set(dan, v);
    });
    return dict;
  }

  private inicirajMapu() {
    let dict: Map<string, Map<number, any>> = new Map<
      string,
      Map<number, Termin>
    >();
    this.ds.vratiVremena().forEach((v) => {
      const dict2: Map<number, any> = new Map<number, any>();
      for (let i: number = 1; i <= 7; i++) dict2.set(i, null);
      dict.set(v, dict2);
    });
    return dict;
  }

  prethodni(): void {
    if (this.index > 0) {
      this.index -= 1;
      this.sedmica = this.termini[this.index];
    }
  }

  sledeci(): void {
    if (this.index < this.termini.length) {
      this.index += 1;
      this.sedmica = this.termini[this.index];
    }
  }
}
