import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { Country } from '../common/country';
import { State } from '../common/state';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  private contriesUrl:string = "http://localhost:8080/api/countries";
  private statesUrl:string = "http://localhost:8080/api/states/search"

  constructor(private httpClient:HttpClient ) { }

  getCountries():Observable<Country[]>{
    return this.httpClient.get<GetCountriesResponse>(this.contriesUrl).pipe(
      map(response=>response._embedded.countries)
    );
  }

  getStates(theCountryCode:string):Observable<State[]>{

    let theStatesUrl = `${this.statesUrl}/findByCountryCode?code=${theCountryCode}`
    return this.httpClient.get<GetStatesResponse>(theStatesUrl).pipe(
      map(response=>response._embedded.states)
    )
  }

  getCreditCardMonths(startMonth:number): Observable<number[]>{
    let data :number[]=[];

    for(let month = startMonth;month<=12;month++){
      data.push(month);
    }
    return of(data);
  }

  getCreditCardYears():Observable<number[]>{

    let data:number[]=[];

    const startYear :number = new Date().getFullYear();
    const endYear:number = startYear+ 10;

    for(let year= startYear; year<=endYear;year++){
      data.push(year);
    }
    return of(data);
  }

   

}
interface GetCountriesResponse{
  _embedded:{
    countries:Country[];
  }
}
interface GetStatesResponse{
  _embedded:{
    states:State[];
  }
}
