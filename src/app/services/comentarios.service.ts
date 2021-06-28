import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Comentario } from '../models/comentarioModel'
import { Observable } from 'rxjs'; // para actualizar usuario

@Injectable({
  providedIn: 'root'
})


export class ComentariosService{
  API_URI = 'http://localhost:3000/comentario'; // ubicacion del servidor y el objeto que llamamos
  //API_URI = 'https://dstpwebpeceraserver.herokuapp.com/comentario';
  
  constructor(private http: HttpClient){}

  listarComentarios(){
    //para expandir/especializar las variables usamos ` y no ' o "
    //Las variables salen pintadas de otro color diferente del de texto
    return this.http.get(`${this.API_URI}/list`);
    //si no funciona usar 
    //return this.http.get(this.API_URI+'/list');
  }

  agregarComentario(comentario:any){ //METODO
		return this.http.post(`${this.API_URI}/add`, comentario);
	}

	editarComentario(id:any, comentarios:any){ //METODO
		return this.http.post(`${this.API_URI}/update/${id}`, comentarios);
	}

	eliminarComentario(id:string){ //METODO		
    return this.http.delete(`${this.API_URI}/delete/${id}`);
	}


  	//CARGAR ARCHIVO
	cargarArchivos(archivo:File){
		const fd = new FormData();
		fd.append('image', archivo);
		return this.http.post(`${this.API_URI}/archivos`,fd);
	}

	listarArchivos(){
		return this.http.get(`${this.API_URI}/archivos`);
	}

	eliminarArchivo(id:string){
		return this.http.delete(`${this.API_URI}/archivos/${id}`);
	}
  
}
