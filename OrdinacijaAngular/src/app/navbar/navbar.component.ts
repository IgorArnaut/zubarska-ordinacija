import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  vratiJmbg(): string | null {
    return localStorage.getItem('jmbg');
  }

  jeDoktor(): boolean {
    return localStorage.getItem('doktor') == 'true';
  }

  jePacijent(): boolean {
    return localStorage.getItem('pacijent') == 'true';
  }
}
