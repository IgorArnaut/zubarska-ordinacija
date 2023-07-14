import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-odjava',
  templateUrl: './odjava.component.html',
  styleUrls: ['./odjava.component.css'],
})
export class OdjavaComponent implements OnInit {
  constructor(private as: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.as.odjaviSe();
    this.router.navigate(['/']);
  }
}
