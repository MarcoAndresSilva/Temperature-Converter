import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-temperature-converter',
  standalone: true,
  imports: [
    ReactiveFormsModule, // el componente declarar ahora sus propias dependencias
    MatFormFieldModule,
    MatInputModule,
    CommonModule
  ],
  templateUrl: './temperature-converter.component.html',
  styleUrl: './temperature-converter.component.scss'
})
export class TemperatureConverterComponent implements OnInit, OnDestroy {

  converterForm: FormGroup;
  private subscriptions = new Subscription();

  constructor(private fb: FormBuilder) { // inyección de dependencias
    // creo el grupo de formularios con dos controles de entrada
    this.converterForm = this.fb.group({ 
      celsius: [null],
      fahrenheit: [null]
    });
  }

  ngOnInit(): void {
    // suscripción a los cambios del campo celsius
    const celsiusChanges$ = this.converterForm.get('celsius')!.valueChanges.pipe( 
      debounceTime(200),
      distinctUntilChanged()
    );

    this.subscriptions.add(
      celsiusChanges$.subscribe( value => {
        if(this.isValidNumber(value)) {
          const celsius = parseFloat(value);
          const fahrenheit = (celsius * 9/5) + 32;
          // actualizo el valor del campo fahrenheit en el formulario sin emitir un evento
          this.converterForm.get('fahrenheit')!.setValue(fahrenheit.toFixed(2), { emitEvent: false });
        }else {
          this.converterForm.get('fahrenheit')!.setValue(null, { emitEvent: false });
        }
    }))

  }

  isValidNumber(value: any): boolean {
    return value !== null && value !== '' && !isNaN(parseFloat(value)) && isFinite(value);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  

}
