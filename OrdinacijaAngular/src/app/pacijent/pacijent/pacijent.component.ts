import { Component, Input } from '@angular/core';

import { Termin } from 'src/app/model/termin';
import { TerminService } from 'src/app/termin.service';

import * as moment from 'moment';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pacijent',
  templateUrl: './pacijent.component.html',
  styleUrls: ['./pacijent.component.css'],
})
export class PacijentComponent {
  termin: Termin;
  proslo24: boolean = false;

  constructor(private ts: TerminService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe({
      next: (params) => {
        this.ts.vratiTerminPacijenta(params['jmbg']).subscribe({
          next: (data) => {
            this.termin = data;
            const diff = moment().diff(moment(this.termin.datum), 'hours');
            this.proslo24 = diff > 24;
          },
          error: (err) => console.log(err),
        });

        console.log(this.proslo24);
      },
    });
  }

  otkaziTermin(): void {
    if (!this.proslo24) {
      this.ts
        .otkaziTermin(this.termin.id)
        .subscribe({ next: () => {}, error: (err) => console.log(err) });
    }
  }
}
