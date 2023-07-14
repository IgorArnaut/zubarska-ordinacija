import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { doktorGuard } from './auth/doktor.guard';
import { pacijentGuard } from './auth/pacijent.guard';

import { DnevniPrikazComponent } from './doktor/dnevni-prikaz/dnevni-prikaz.component';
import { NedeljniPrikazComponent } from './doktor/nedeljni-prikaz/nedeljni-prikaz.component';
import { OdjavaComponent } from './auth/odjava/odjava.component';
import { PrijavaComponent } from './auth/prijava/prijava.component';
import { PacijentComponent } from './pacijent/pacijent/pacijent.component';
import { ZakazivanjeComponent } from './zakazivanje/zakazivanje.component';

const routes: Routes = [
  {
    path: 'zakazivanje',
    component: ZakazivanjeComponent,
  },
  {
    path: 'termini/:jmbg',
    component: PacijentComponent,
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
