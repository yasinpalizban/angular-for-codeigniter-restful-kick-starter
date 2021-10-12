import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

import {GroupService} from '../../../services/group.service';
import {Group} from '../../../models/group.model';
import { faStickyNote, faFileWord} from "@fortawesome/free-solid-svg-icons";


@Component({
  selector: 'app-group-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit , OnDestroy{
  faIcon = { faStickyNote, faFileWord};
  formGroup!: FormGroup;
  submitted: boolean;

  constructor(private formBuilder: FormBuilder,
              private groupService: GroupService) {
    this.submitted = false;


  }

  ngOnInit(): void {


    this.formGroup = this.formBuilder.group({

      name: new FormControl('', [
        Validators.required,
        Validators.maxLength(255)
      ]),
      description: new FormControl('', [
        Validators.required,
        Validators.maxLength(255)
      ])
    });


  }

  onSubmit(): void  {


    if (this.formGroup.invalid) {
      return;
    }

    this.submitted = true;
    const group = new Group({
      name: this.formGroup.value.name.toLowerCase(),
      description: this.formGroup.value.description,

    });

    this.groupService.clearAlert();
    this.groupService.save(group);

  }

  ngOnDestroy(): void  {

    this.groupService.unsubscribe();
  }

}
