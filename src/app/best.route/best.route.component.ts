import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { CurrencyMaskModule } from "ng2-currency-mask";
import { HttpClientModule } from '@angular/common/http';
import { BestRouteService } from  './best.route.service';

@Component({
  selector: 'app-best.route',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule, ReactiveFormsModule, CurrencyMaskModule, HttpClientModule],
  templateUrl: './best.route.component.html',
  styleUrl: './best.route.component.scss',
  providers:[BestRouteService]
})

export class BestRouteComponent {

  
  constructor(private service: BestRouteService) {}
  public buscas = [""];  
  formValidationText = [Validators.required, 
    Validators.minLength(3), 
    Validators.pattern('[a-zA-Z ]*')];

  form = new FormGroup({
    origin: new FormControl('', this.formValidationText),
    destination: new FormControl('', this.formValidationText)
  });


  getBestRoute() {

    var origin = this.form.value.origin?.toUpperCase();
    var destination = this.form.value.destination?.toUpperCase();
    this.service.getBestRoute(origin, destination).subscribe(
        response => {
          if(!response){
              return;
            }
            this.buscas.push(response.toString());
        },
        error => {
          alert('Rota não encontrada!');
        }
      );
  }
  get f(){
    return this.form.controls;
  }

}
