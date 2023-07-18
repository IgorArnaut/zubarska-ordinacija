import { Component, OnInit } from '@angular/core';

import { Termin } from '../../model/termin';
import { TerminService } from '../../termin.service';

import { groupBy, values } from 'lodash';
import { DatumService } from 'src/app/datum.service';

@Component({
  selector: 'app-dnevni-prikaz',
  templateUrl: './dnevni-prikaz.component.html',
  styleUrls: ['./dnevni-prikaz.component.css'],
})
export class DnevniPrikazComponent implements OnInit {
  termini: Termin[][];
  danas: Termin[];
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
    this.termini = values(groupBy(data, (d) => d.datum));
    this.termini.map((t) => {
      t.sort((a, b) => this.ds.uporedi(a.vreme, b.vreme));
    });
    this.termini.sort((a, b) => this.ds.uporedi(a[0].datum, b[0].datum));
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
