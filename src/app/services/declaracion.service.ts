import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
	providedIn: 'root'
})
export class DeclaracionService {
	API_URI = 'http://localhost:3000/declaracion'; //variable local a la clase con la ruta
	//API_URI = 'https://afcisellosserver.herokuapp.com/declaracion';
	//logued$: EventEmitter<string> = new EventEmitter<string>();
	constructor(private http: HttpClient, private router: Router) { }

	agregarDeclaracion(usuario: any) { //METODO
		return this.http.post(`${this.API_URI}/add`, usuario);
	}
	//PROVEEDORES	
	/*
	  listarProveedor(){ //METODO		
		  return this.http.get(`${this.API_URI}/listar`); //http: variable definida en el constructor / Parametro se pasa la ruta principal seguida del metodo q quiero utilizar		
	  }
  	
  	
  
	  editarProveedor(proveedor:any){ //METODO
		  return this.http.post(`${this.API_URI}/editar`, proveedor);
	  }
  
	  eliminarProveedor(id:string){
		  return this.http.delete(`${this.API_URI}/eliminar/${id}`);
	  }
	*/
}
