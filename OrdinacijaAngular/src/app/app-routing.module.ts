import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ZakazivanjeComponent } from './zakazivanje/zakazivanje.component';
import { PrijavaComponent } from './auth/prijava/prijava.component';
import { DnevniPrikazComponent } from './doktor/dnevni-prikaz/dnevni-prikaz.component';
import { NedeljniPrikazComponent } from './doktor/nedeljni-prikaz/nedeljni-prikaz.component';
import { OdjavaComponent } from './auth/odjava/odjava.component';
import { doktorGuard } from './auth/doktor.guard';
import { pacijentGuard } from './auth/pacijent.guard';
import { TerminComponent } from './doktor/termin/termin.component';

const routes: Routes = [
  {
    path: 'zakazivanje',
    component: ZakazivanjeComponent,
  },
  {
    path: 'pacijent',
    component: TerminComponent,
    canActivate: [pacijentGuard],
  },
  {
    path: 'doktor/dnevni-prikaz',
    component: DnevniPrikazComponent,
    canActivate: [doktorGuard],
  },
  {
    path: 'odjava',
    component: OdjavaComponent,
  },
  {
    path: 'doktor/nedeljni-prikaz',
    component: NedeljniPrikazComponent,
    canActivate: [doktorGuard],
  },
  {
    path: '**',
    component: PrijavaComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
