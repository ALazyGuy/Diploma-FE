import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { Question } from '../../models/question';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/core/service/api.service';

@Component({
  selector: 'app-tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.scss']
})
export class TestsComponent implements OnInit {

  private items!: Question[];
  private questionCounter: number = 0;
  
  answers: number[] = Array.from({length: 10}, (_, i) => -1);
  current!: Question;
  error: boolean = false;
  answered: boolean = false;
  done: boolean = false;
  score: number = 0;
  selected: any;

  form: FormGroup = new FormGroup({
    answer: new FormControl('answer')
  }); 

  constructor(private http: HttpClient, private apiService: ApiService) {}

  ngOnInit() {
    this.http
      .get<Question[]>("/assets/content/tests/questions.json")
      .subscribe(data => {
        this.items = data;
      });
  }

  start() {
    if(this.selected == undefined){
      return;
    }
    this.current = this.items[this.questionCounter + this.selected * 10];
  }

  sendAnswer() {
    if(!this.answered){
      const answer: string = this.form.controls['answer'].value;

      if(`${+answer}` != answer) {
        return;
      }

      this.error = +answer == this.current.isTrue;
      this.answered = true;
    } else if(this.questionCounter < 9) {
      this.answers[this.questionCounter] = +this.error;
      this.answered = false;
      this.error = false;
      this.current = this.items[++this.questionCounter + this.selected * 10];
      this.form.controls['answer'].reset();
    } else {
      this.answers[this.questionCounter] = +this.error;
      this.done = true;
      this.score = this.answers.reduce((sum, cur) => sum + cur, 0);
      this.apiService.updateHistory({ticket: this.selected + 1, result: this.score}).subscribe();
    }
  }

}
