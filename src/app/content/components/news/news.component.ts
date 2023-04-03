import { Component } from '@angular/core';
import { NewsDataModel } from '../../models/news-data-model';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent {

  allNews: NewsDataModel[] = [
    {
      imgUrl: 'https://avatars.mds.yandex.net/i?id=57f731bc23ced550f34f289815cf22de-5216269-images-thumbs&n=13',
      text: 'test text'
    },
    {
      imgUrl: 'https://avatars.mds.yandex.net/i?id=57f731bc23ced550f34f289815cf22de-5216269-images-thumbs&n=13',
      text: 'test text2'
    },
    {
      imgUrl: 'https://avatars.mds.yandex.net/i?id=57f731bc23ced550f34f289815cf22de-5216269-images-thumbs&n=13',
      text: 'test text3'
    },
    {
      imgUrl: 'https://avatars.mds.yandex.net/i?id=57f731bc23ced550f34f289815cf22de-5216269-images-thumbs&n=13',
      text: 'test text4'
    },
    {
      imgUrl: 'https://avatars.mds.yandex.net/i?id=57f731bc23ced550f34f289815cf22de-5216269-images-thumbs&n=13',
      text: 'test text5'
    }
  ];

}
