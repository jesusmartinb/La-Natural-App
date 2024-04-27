import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404PageComponent } from './shared/pages/error404-page/error404-page.component';
import { AuthGuard } from './auth/guards/auth.guard';
import { PublicGuard } from './auth/guards/public.guard';
import { PerfilPageComponent } from './auth/pages/perfil-page/perfil-page.component';
import { rolGuard } from './auth/guards/rol.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
    canActivate: [PublicGuard.CanActivate],
    canMatch: [PublicGuard.CanMatch],
  },
  {
    path: 'products',
    loadChildren: () => import('./products/products.module').then(m => m.ProductsModule),
    canActivate: [AuthGuard.CanActivate, rolGuard],
    canMatch: [AuthGuard.CanMatch],
  },
  {
    path: 'perfil', component: PerfilPageComponent, canActivate: [AuthGuard.CanActivate, rolGuard], canMatch: [AuthGuard.CanMatch]
  },
  {
    path: '404',
    component: Error404PageComponent
  },
  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
