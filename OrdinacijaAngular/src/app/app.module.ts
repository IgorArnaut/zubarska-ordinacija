import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { DnevniPrikazComponent } from './doktor/dnevni-prikaz/dnevni-prikaz.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NedeljniPrikazComponent } from './doktor/nedeljni-prikaz/nedeljni-prikaz.component';
import { OdjavaComponent } from './auth/odjava/odjava.component';
import { PacijentComponent } from './pacijent/pacijent/pacijent.component';
import { PrijavaComponent } from './auth/prijava/prijava.component';
import { TerminComponent } from './doktor/termin/termin.component';
import { ZakazivanjeComponent } from './zakazivanje/zakazivanje.component';

@NgModule({
  declarations: [
    AppComponent,
    DnevniPrikazComponent,
    NavbarComponent,
    NedeljniPrikazComponent,
    OdjavaComponent,
    PrijavaComponent,
    PacijentComponent,
    TerminComponent,
    ZakazivanjeComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
