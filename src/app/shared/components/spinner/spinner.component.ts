import {Component, OnInit} from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {

  constructor(private  spinner: NgxSpinnerService) {
  }

  ngOnInit(): void {

    // this.spinner.show('mySpinner', {
    //   type: 'line-scale-party',
    //   size: 'large',
    //   bdColor: 'rgba(0, 0, 0, 1)',
    //   color: 'white',
    //   template: '<img src=\'https://media.giphy.com/media/o8igknyuKs6aY/giphy.gif\' />'
    // });
    this.spinner.show();

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 1000);
  }

}
