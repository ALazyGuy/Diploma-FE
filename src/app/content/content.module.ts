import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { ContentRoutingModule } from './content-routing.module';
import { NewsComponent } from './components/news/news.component';
import { CoreModule } from '../core/core.module';
import { NewsDataComponent } from './components/news-data/news-data.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { RulesComponent } from './components/rules/rules.component';
import { TestsComponent } from './components/tests/tests.component';
import { HttpClientModule } from '@angular/common/http';
import { HistoryComponent } from './components/history/history.component';
import { UserUpdateComponent } from './components/user-update/user-update.component';


@NgModule({
  declarations: [
    NewsComponent,
    NewsDataComponent,
    LoginComponent,
    RegisterComponent,
    RulesComponent,
    TestsComponent,
    HistoryComponent,
    UserUpdateComponent
  ],
  imports: [
    CommonModule,
    ContentRoutingModule,
    CoreModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ]
})
export class ContentModule { }
