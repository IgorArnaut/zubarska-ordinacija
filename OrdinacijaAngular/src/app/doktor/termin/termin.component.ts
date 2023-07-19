import { Component, Input, OnInit } from '@angular/core';

import { Termin } from 'src/app/model/termin';
import { TerminService } from 'src/app/termin.service';

import * as moment from 'moment';

@Component({
  selector: 'app-termin',
  templateUrl: './termin.component.html',
  styleUrls: ['./termin.component.css'],
})
export class TerminComponent {
  @Input() termin: Termin;

  constructor(private ts: TerminService) {}

  otkaziTermin(): void {
    const diff = moment().diff(moment(this.termin.datum), 'hours');
    const nijeProslo24 = 0 <= diff && diff < 24;

    if (nijeProslo24)
      this.ts.otkaziTermin(this.termin.id).subscribe({
        error: (err) => console.log(err),
      });
  }
}
