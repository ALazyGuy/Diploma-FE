import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContentRoutingModule } from './content-routing.module';
import { NewsComponent } from './components/news/news.component';
import { CoreModule } from '../core/core.module';
import { NewsDataComponent } from './components/news-data/news-data.component';


@NgModule({
  declarations: [
    NewsComponent,
    NewsDataComponent
  ],
  imports: [
    CommonModule,
    ContentRoutingModule,
    CoreModule
  ]
})
export class ContentModule { }
