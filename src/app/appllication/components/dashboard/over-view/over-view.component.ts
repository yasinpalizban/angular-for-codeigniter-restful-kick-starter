import { Component, OnInit } from '@angular/core';
import {faList} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-over-view',
  templateUrl: './over-view .component.html',
  styleUrls: ['./over-view.component.scss']
})
export class OverViewComponent implements OnInit {
  faIcon={faList};
  constructor() { }

  ngOnInit(): void {

  }

}
