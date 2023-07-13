import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

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
