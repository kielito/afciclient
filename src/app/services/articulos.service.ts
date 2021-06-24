import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ArticulosService {
  //API_URI = 'http://localhost:3000/articulo'; //variable local a la clase con la ruta
  API_URI = 'https://dstpwebpeceraserver.herokuapp.com/articulo';

  constructor(private http: HttpClient, private router:Router) { }

  //ARTICULOS	
	listarArticulo(){ //METODO		
		return this.http.get(`${this.API_URI}/listar`); //http: variable definida en el constructor / Parametro se pasa la ruta principal seguida del metodo q quiero utilizar		
	}
	
	agregarArticulo(articulo:any){ //METODO
		return this.http.post(`${this.API_URI}/agregarproducto`, articulo);
	}

	editarArticulo(articulo:any){ //METODO
		return this.http.post(`${this.API_URI}/editar`, articulo);
	}

	eliminarArticulo(id:string){ //METODO
		return this.http.delete(`${this.API_URI}/eliminar/${id}`);
	}
}
