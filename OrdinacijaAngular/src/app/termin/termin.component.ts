import { Component, Input } from '@angular/core';
import { Termin } from '../model/termin';
import { TerminService } from '../termin.service';

@Component({
  selector: 'app-termin',
  templateUrl: './termin.component.html',
  styleUrls: ['./termin.component.css'],
})
export class TerminComponent {
  @Input() termin: Termin;

  constructor(private ts: TerminService) {}

  otkaziTermin(id: number): void {
    this.ts
      .otkaziTermin(id)
      .subscribe({ next: () => {}, error: (err) => console.log(err) });
  }
}
