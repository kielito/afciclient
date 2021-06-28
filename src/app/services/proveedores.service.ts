import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {
  API_URI = 'http://localhost:3000/proveedor';
  //API_URI = 'https://dstpwebpeceraserver.herokuapp.com/proveedor';
  constructor(private http: HttpClient, private router:Router) { }

  //PROVEEDORES	
	listarProveedor(){ //METODO		
		return this.http.get(`${this.API_URI}/listar`); //http: variable definida en el constructor / Parametro se pasa la ruta principal seguida del metodo q quiero utilizar		
	}
	
	agregarProveedor(proveedor:any){ //METODO
		return this.http.post(`${this.API_URI}/agregar`, proveedor);
	}

	editarProveedor(proveedor:any){ //METODO
		return this.http.post(`${this.API_URI}/editar`, proveedor);
	}

	eliminarProveedor(id:string){
		return this.http.delete(`${this.API_URI}/eliminar/${id}`);
	}
}
