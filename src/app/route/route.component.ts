import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { CurrencyMaskModule } from "ng2-currency-mask";
import { HttpClientModule } from '@angular/common/http';
import { RouteService } from  './route.service';

@Component({
  selector: 'app-route',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule, ReactiveFormsModule, CurrencyMaskModule, HttpClientModule],
  templateUrl: './route.component.html',
  styleUrl: './route.component.scss',
  providers:[RouteService]
})

export class RouteComponent implements OnInit {

  
  constructor(private routeService: RouteService) {}
  
  btnExcluirActive = true;
  btnSaveActive = true;
  routes: any[] = [];
  
  
  ngOnInit(): void {
    this.getAllRoutes();
  }

 
  formValidationText = [Validators.required, 
                        Validators.minLength(3), 
                        Validators.pattern('[a-zA-Z ]*')];

  routeForm = new FormGroup({
    origin: new FormControl('', this.formValidationText),
    destination: new FormControl('', this.formValidationText),
    value: new FormControl('', [Validators.required, Validators.min(5)])
  });
  

  saveRoute() {
    if (this.routeForm.invalid)
      return;

      this.btnSaveActive = false;
      var origin = this.routeForm.value.origin?.toUpperCase();
      var destination = this.routeForm.value.destination?.toUpperCase();
      var value = this.routeForm.value.value;
      
      this.routeService.post(origin,
                destination,
                value).subscribe(
        response => {
          this.routes.push({id: response.id, origin,  destination,  value});
          this.btnSaveActive = true;
        },
        error => {
          alert('Erro ao salvar rota');
          this.btnSaveActive = true;
        }
      );
  }

  getAllRoutes() {
    this.routeService.getAll().subscribe(
        response => {
          if(!response){
              this.routes = [];
              return;
            }
          this.routes = response.routes;
        },
        error => {
          alert('Não existem rotas disponíveis');
        }
      );
  }

  deleteRoute(id:any) {
    this.btnExcluirActive = false;
    this.routeService.delete(id).subscribe(
        response => {
          var item = this.routes.find(x=> x.id === id);
          let index = this.routes.indexOf(item);
          this.routes.splice(index, 1);
          this.btnExcluirActive = true;
        },
        error => {
          alert('Erro ao remover rota');
          this.btnExcluirActive = true;
        }
      );
  }


  get f(){
    return this.routeForm.controls;
  }
}
