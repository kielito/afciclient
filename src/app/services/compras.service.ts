/*******************************************************************************
*		DNI:33.111.151
*		APELLIDO/S: GOMEZ
*		NOMBRE/S: LEANDRO
*		PARCIAL: 2
*		FECHA: 17/06/2021
*******************************************************************************/

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Compra } from '../models/compraModel';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ComprasService {
  API_URI = 'http://localhost:3000/compra'; //variable local a la clase con la ruta

  constructor(private http: HttpClient, private router:Router) { }

  
  //COMPRA	
	listarCompra(){ //METODO		
		return this.http.get(`${this.API_URI}/carrito`); //http: variable definida en el constructor / Parametro se pasa la ruta principal seguida del metodo q quiero utilizar		
	}

	listarPedido(){ //METODO		
		return this.http.get(`${this.API_URI}/carrito`); //http: variable definida en el constructor / Parametro se pasa la ruta principal seguida del metodo q quiero utilizar		
	}
	
	agregarCompra(compra: Array<Compra>){ //METODO
		return this.http.post(`${this.API_URI}/compra`,compra);
	}
}
