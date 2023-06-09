import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewsComponent } from './components/news/news.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AnonymousGuard } from '../core/guards/anonymous.guard';
import { RulesComponent } from './components/rules/rules.component';
import { AuthenticatedGuard } from '../core/guards/authenticated.guard';
import { TestsComponent } from './components/tests/tests.component';
import { HistoryComponent } from './components/history/history.component';
import { UserUpdateComponent } from './components/user-update/user-update.component';

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
    path: 'tests',
    component: TestsComponent,
    canActivate: [AuthenticatedGuard]
  },
  {
    path: 'history',
    component: HistoryComponent,
    canActivate: [AuthenticatedGuard]
  },
  {
    path: 'update',
    component: UserUpdateComponent,
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
