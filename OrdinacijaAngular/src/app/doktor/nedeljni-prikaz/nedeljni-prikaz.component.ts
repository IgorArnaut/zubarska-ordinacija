import { Component } from '@angular/core';

import { Termin } from '../../model/termin';
import { TerminService } from '../../termin.service';

import { groupBy, values } from 'lodash';
import * as moment from 'moment';

@Component({
  selector: 'app-nedeljni-prikaz',
  templateUrl: './nedeljni-prikaz.component.html',
  styleUrls: ['./nedeljni-prikaz.component.css'],
})
export class NedeljniPrikazComponent {
  termini: Termin[][][];
  index: number;
  sedmica: Termin[][];

  constructor(private ts: TerminService) {}

  ngOnInit(): void {
    this.index = 0;
    this.vratiSveTermine();
  }

  vratiSveTermine(): void {
    this.ts.vratiSveTermine().subscribe({
      next: (data: Termin[]) => {
        this.termini = values(
          groupBy(data, (d) => this.vratiSedmicu(d.datum))
        ).map((w) => values(groupBy(w, (d) => d.datum)));
        this.sedmica = this.termini[0];
      },
      error: (err) => console.log(err),
    });
  }

  private vratiSedmicu(datum: string): number {
    return moment(new Date(datum)).week();
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
