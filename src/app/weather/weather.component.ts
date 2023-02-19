import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { WeatherService } from "../weather.service";

@Component({
  selector: "app-weather",
  templateUrl: "./weather.component.html",
  styleUrls: ["./weather.component.css"],
})
export class WeatherComponent implements OnInit {
  weather: any = {};
  weatherForm: FormGroup;
  weatherResult :any;
  constructor(private weatherService: WeatherService) {}

  ngOnInit() {}
  getWeather() {
    this.weatherService.getWeather(this.weather).subscribe((res) => {
    this.weatherResult= res.result
    });
  }
}
