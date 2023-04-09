import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewsComponent } from './components/news/news.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AnonymousGuard } from '../core/guards/anonymous.guard';
import { RulesComponent } from './components/rules/rules.component';
import { AuthenticatedGuard } from '../core/guards/authenticated.guard';

const routes: Routes = [
  {
    path: 'news',
    component: NewsComponent
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AnonymousGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [AnonymousGuard]
  },
  {
    path: 'rules',
    component: RulesComponent,
    canActivate: [AuthenticatedGuard]
  },
  {
    path: '',
    redirectTo: '/news',
    pathMatch: 'full'
  },
  {
    path: 'pdd/**',
    redirectTo: '/news',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContentRoutingModule { }
