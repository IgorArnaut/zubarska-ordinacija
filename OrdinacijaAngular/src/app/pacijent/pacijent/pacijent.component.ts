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
  termini: Termin[];
  constructor(private ts: TerminService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe({
      next: (params) => {
        this.ts.vratiTerminePacijenta(params['jmbg']).subscribe({
          next: (data) => (this.termini = data),
          error: (err) => console.log(err),
        });
      },
    });
  }
}
