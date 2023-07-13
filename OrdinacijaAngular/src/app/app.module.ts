import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DnevniPrikazComponent } from './doktor/dnevni-prikaz/dnevni-prikaz.component';
import { HttpClientModule } from '@angular/common/http';
import { NedeljniPrikazComponent } from './doktor/nedeljni-prikaz/nedeljni-prikaz.component';
import { ZakazivanjeComponent } from './zakazivanje/zakazivanje.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PrijavaComponent } from './auth/prijava/prijava.component';
import { OdjavaComponent } from './auth/odjava/odjava.component';
import { TerminComponent } from './doktor/termin/termin.component';

@NgModule({
  declarations: [
    AppComponent,
    DnevniPrikazComponent,
    NedeljniPrikazComponent,
    ZakazivanjeComponent,
    NavbarComponent,
    PrijavaComponent,
    OdjavaComponent,
    TerminComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
