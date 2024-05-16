import { Injectable } from '@angular/core';
import { HousingLocation } from './housingLocation';
@Injectable({
  providedIn: 'root'
})
export class HousingService {
  url = 'http://localhost:3000/locations';

  constructor() { }
  
  async getAllHousingLocations(): Promise<HousingLocation[]>
  {
    const data = await fetch(this.url);
    return await data.json() ?? [];
  }

  async getHousingLocationById(id: number): Promise<HousingLocation | undefined>
  {
    const housingLocationList = await fetch(`${this.url}?id=${id}`)   
    
    return await housingLocationList.json().then((housingLocationList: HousingLocation[]) => (housingLocationList ?? [{}])[0]);
  }

  submitApplication(lastName: string, firstName: string, email: string)
  {
    console.log(`Application submitted for ${firstName} ${lastName} at ${email}`);
  }
}
