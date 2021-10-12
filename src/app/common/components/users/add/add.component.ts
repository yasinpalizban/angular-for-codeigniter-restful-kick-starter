import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {UserService} from '../../../services/user.service';
import {User} from '../../../models/user.model';
import {GroupService} from "../../../../authorize/services/group.service";
import {IGroup} from "../../../../authorize/interfaces/group.interface";
import {
  faPhone,
  faUser, faAsterisk, faEnvelope, faUsers,faStickyNote
} from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-user-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit, OnDestroy {
  faIcon = {faPhone,
    faUser, faAsterisk, faEnvelope, faUsers
  };
  formGroup!: FormGroup;
  submitted: boolean;
  defaultPassword: string;
  groupRows!: IGroup;
  subscription: Subscription;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private groupService: GroupService) {
    this.submitted = false;
    this.defaultPassword = 'abc123456';
    this.subscription = new Subscription();
  }

  ngOnInit(): void {

    this.groupService.query();

    this.formGroup = this.formBuilder.group({

      email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.maxLength(255)
      ]),
      username: new FormControl('', [
        Validators.required,
        Validators.maxLength(255)
      ]), phone: new FormControl('', [
        Validators.required,
        Validators.maxLength(11)
      ]),
      firstName: new FormControl('', [
        Validators.required,
        Validators.maxLength(255)
      ]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.maxLength(255)
      ]),
      groupId: new FormControl('', [
        Validators.required,
      ])
    });
    this.subscription = this.groupService.getDataObservable().subscribe((groups: IGroup) => {
      this.groupRows = groups;

    });

  }

  onSubmit(): void {


    if (this.formGroup.invalid) {
      return;
    }

    this.submitted = true;

    const user = new User({
      email: this.formGroup.value.email,
      phone: this.formGroup.value.phone,
      firstName: this.formGroup.value.firstName,
      lastName: this.formGroup.value.lastName,
      username: this.formGroup.value.username,
      group: this.formGroup.value.groupId,
      password: this.defaultPassword,


    });

    this.userService.clearAlert();

    this.userService.save(user);

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.groupService.unsubscribe();
    this.userService.unsubscribe();
  }

}
