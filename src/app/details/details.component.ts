import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HousingService } from '../housing.service';
import { HousingLocation } from '../housingLocation';
import {FormGroup, FormControl, ReactiveFormsModule} from '@angular/forms';
import { first } from 'rxjs';
@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <article>
      <img class="listing-photo" [src]="housingLocation?.photo" alt="Photo of the housing location">
      <section class="listing-description">
        <h2 class="listing.heading">{{housingLocation?.name}}</h2>

        <p class="listing-location">{{housingLocation?.city}}, {{housingLocation?.state}}</p>
      </section>
      <section class="listing-features">
        <h2 class="listing.heading">About this housing location</h2>
        <ul>
          <li>Units: {{housingLocation?.availableUnits}}</li>
          <li>Wifi: {{housingLocation?.wifi}}</li>
          <li>Laundry: {{housingLocation?.laundry}}</li>
          </ul>
        </section>
        <section class="listing-apply">
          <h2 class="listing.heading">Apply</h2>
          <form [formGroup]="applyForm" (submit)="submitApplication()">
            <label for="firstName">First Name</label>
            <input type="text" id="firstName" formControlName="firstName">
            <label for="lastName">Last Name</label>
            <input type="text" id="lastName" formControlName="lastName">
            <label for="email">Email</label>
            <input type="email" id="email" formControlName="email">
            <button type="submit" class="primary">Apply</button>
          </form>
        </section>
      </article>
  `,
  styleUrls: ['./details.component.css']
})

export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute) ;
  housingService: HousingService = inject(HousingService);
  housingLocation: HousingLocation | undefined
  applyForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl('')
  });

  constructor()
  {
    const housingLocationId = Number(this.route.snapshot.params['id']);
    this.housingService.getHousingLocationById(housingLocationId).then(housingLocation => { this.housingLocation = housingLocation; });
  } 

  submitApplication()
  {
      this.housingService.submitApplication(
        this.applyForm.value.lastName ?? '',
        this.applyForm.value.firstName ?? '',
        this.applyForm.value.email ?? '');
  }
}