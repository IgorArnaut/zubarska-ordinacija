import { Component, Input, OnInit } from '@angular/core';
import { Termin } from '../model/termin';
import { TerminService } from '../termin.service';
import * as moment from 'moment';

@Component({
  selector: 'app-termin',
  templateUrl: './termin.component.html',
  styleUrls: ['./termin.component.css'],
})
export class TerminComponent implements OnInit {
  @Input() termin: Termin;
  proslo24: boolean;

  constructor(private ts: TerminService) {}

  ngOnInit(): void {
    this.proslo24 = moment().diff(moment(this.termin.datum), 'hours') >= 24;
    console.log(this.proslo24);
  }

  otkaziTermin(): void {
    if (!this.proslo24)
      this.ts
        .otkaziTermin(this.termin.id)
        .subscribe({ next: () => {}, error: (err) => console.log(err) });
  }
}
