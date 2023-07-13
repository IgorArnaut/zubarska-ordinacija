import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Termin } from 'src/app/model/termin';
import { TerminService } from 'src/app/termin.service';

@Component({
  selector: 'app-termin',
  templateUrl: './termin.component.html',
  styleUrls: ['./termin.component.css'],
})
export class TerminComponent implements OnInit {
  @Input() termin: Termin;
  proslo24: boolean = false;

  constructor(private ts: TerminService) {}

  ngOnInit(): void {
    const diff = moment().diff(moment(this.termin.datum), 'hours');
    this.proslo24 = diff > 24;
    console.log(this.proslo24);
  }

  otkaziTermin(): void {
    if (!this.proslo24) {
      this.ts
        .otkaziTermin(this.termin.id)
        .subscribe({ next: () => {}, error: (err) => console.log(err) });
    }
  }
}
