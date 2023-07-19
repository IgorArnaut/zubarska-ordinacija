import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Termin } from '../../model/termin';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-prijava',
  templateUrl: './prijava.component.html',
  styleUrls: ['./prijava.component.css'],
})
export class PrijavaComponent implements OnInit {
  prijavaForma: FormGroup;

  constructor(
    private fb: FormBuilder,
    private as: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.prijavaForma = this.fb.group({
      jmbg: ['', Validators.required],
    });
  }

  prijava(): void {
    const jmbg = this.jmbg?.value;

    if (jmbg != '') {
      this.as.prijaviSe(jmbg).subscribe((data) => {
        if (data) this.router.navigate(['/zakazivanje']);
      });
    }
  }

  get jmbg() {
    return this.prijavaForma.get('jmbg');
  }
}
