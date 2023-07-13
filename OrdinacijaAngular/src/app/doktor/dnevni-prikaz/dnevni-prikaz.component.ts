import { Component, OnInit } from '@angular/core';
import { Termin } from '../../model/termin';
import { TerminService } from '../../termin.service';
import { groupBy, values } from 'lodash';

@Component({
  selector: 'app-dnevni-prikaz',
  templateUrl: './dnevni-prikaz.component.html',
  styleUrls: ['./dnevni-prikaz.component.css'],
})
export class DnevniPrikazComponent implements OnInit {
  termini: Termin[][];
  danas: Termin[];
  index: number;

  constructor(private ts: TerminService) {}

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
          this.termini = values(groupBy(data, (d) => d.datum));
          this.danas = this.termini[this.index];
        },

        error: (err) => console.log(err),
      });
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
