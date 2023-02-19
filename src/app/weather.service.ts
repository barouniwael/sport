import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  url: string = "http://localhost:3000/weather";
  constructor(private http: HttpClient) { }



  getWeather(city) {

  console.log(city);
  
    return this.http.post<{result:any}>(this.url,city);
    
  }
}
