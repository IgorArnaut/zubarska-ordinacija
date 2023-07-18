import { Component } from '@angular/core';

import { Termin } from '../../model/termin';
import { TerminService } from '../../termin.service';

import { groupBy, values } from 'lodash';
import { DatumService } from 'src/app/datum.service';

@Component({
  selector: 'app-nedeljni-prikaz',
  templateUrl: './nedeljni-prikaz.component.html',
  styleUrls: ['./nedeljni-prikaz.component.css'],
})
export class NedeljniPrikazComponent {
  termini: Termin[][][];
  index: number;
  sedmica: Termin[][];

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
    this.termini = values(
      groupBy(data, (d) => this.ds.vratiSedmicu(d.datum))
    ).map((w) => values(groupBy(w, (d) => d.datum)));

    this.termini.map((w) => {
      w.map((t) => t.sort((a, b) => this.ds.uporedi(a.datum, b.datum)));
      w.sort((a, b) => a[0].datum.localeCompare(b[0].datum));
    });
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
