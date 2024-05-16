import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingLocation } from '../housingLocation';
import { HousingService } from '../housing.service';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HousingLocationComponent],
  template: `
    <section>
      <form>
        <input type="text" placeholder="Filter by city" #filter>
        <button class="primary" type="button" (click)="filterResults(filter.value)">Search</button>
      </form>
    </section>
    <section class="results">
      <app-housing-location *ngFor="let housingLocation of filteredHousingLocationList" [housingLocation] = "housingLocation"></app-housing-location>
    </section>
  `,
  styleUrls: ['./home.component.css']
})
export class HomeComponent 
{
  housingLocationList: HousingLocation[] = [];
  filteredHousingLocationList: HousingLocation[] = [];
  housingService: HousingService = inject(HousingService);

  constructor ()
  {
    this.housingService.getAllHousingLocations().then((housingLocationList: HousingLocation[]) => 
      {
          this.housingLocationList = housingLocationList ?? []; 
          this.filteredHousingLocationList = this.housingLocationList;
        });
    
  }

  
  filterResults(filter: string) 
  {
    if (filter === '') 
    {
      this.filteredHousingLocationList = this.housingLocationList;
    } 
    else 
    {
      this.filteredHousingLocationList = this.housingLocationList.filter((housingLocation: HousingLocation) => housingLocation.city.toLowerCase().includes(filter.toLowerCase()));
    }

  }
}
