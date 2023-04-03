import { Component, Input } from '@angular/core';
import { NewsDataModel } from '../../models/news-data-model';

@Component({
  selector: 'app-news-data',
  templateUrl: './news-data.component.html',
  styleUrls: ['./news-data.component.scss']
})
export class NewsDataComponent {

  @Input() data!: NewsDataModel;

}
