import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TemperatureConverterComponent } from './components/temperature-converter/temperature-converter.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TemperatureConverterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Temperature-Converter';
}
