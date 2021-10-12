import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {IProfile} from '../../../interfaces/profile.interface';
import {ProfileService} from '../../../services/profile.service';
import {Profile} from '../../../models/profile.model';
import {faMapMarker,faAddressBook, faMap} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-user-address',
  templateUrl: './user-address.component.html',
  styleUrls: ['./user-address.component.scss']
})
export class UserAddressComponent implements OnInit, OnDestroy {
  faIcon = {
    faMap, faMapMarker,faAddressBook
  };
  formGroup!: FormGroup;
  submitted: boolean;

  subscription: Subscription;
  profileDetail!: IProfile;

  constructor(private formBuilder: FormBuilder,
              private profileService: ProfileService) {
    this.submitted = false;
    this.subscription = new Subscription();

  }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({

      country: new FormControl('', [
        Validators.required,
        Validators.maxLength(255)
      ]),
      city: new FormControl('', [
        Validators.required,
        Validators.maxLength(255)
      ]),
      address: new FormControl('', [
        Validators.required,
        Validators.maxLength(255)
      ])
    });

    this.profileService.query();
    this.subscription = this.profileService.getDataObservable().subscribe((profile) => {
      this.profileDetail = profile;
      this.formGroup.controls.country.setValue(profile.data!.country);
      this.formGroup.controls.city.setValue(profile.data!.city);
      this.formGroup.controls.address.setValue(profile.data!.address);
    });


  }

  onSubmit(): void {


    if (this.formGroup.invalid) {
      return;
    }

    this.submitted = true;

    const profile = new Profile({
      address: this.formGroup.value.address,
      country: this.formGroup.value.country,
      city: this.formGroup.value.city,
    });

    this.profileService.save(profile);

  }

  ngOnDestroy(): void {

    this.subscription.unsubscribe();
    this.profileService.unsubscribe();
  }

}
