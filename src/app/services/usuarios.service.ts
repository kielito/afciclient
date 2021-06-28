import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/usuarioModel';
import { Observable, Subject  } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class UsuariosService{
	
	//API_URI = 'http://localhost:3000/user'; //variable local a la clase con la ruta
	API_URI = 'https://dstpwebpeceraserver.herokuapp.com/user';
	//private estadoSesion : Subject<boolean> = new Subject();
	logued$ : EventEmitter<string> = new EventEmitter<string>();	

	constructor(private http: HttpClient, private router:Router,) { }
	   
	activar(id:any){
		return this.http.get(`${this.API_URI}/activate/${id}`);
	}

	ingresar(usuario:any){
	return this.http.post(`${this.API_URI}/signin`,usuario);
	}

	listarUsuarios(){ //METODO
		//para expandir/especializar las variables usamos ` y no ' o "
		//Las variables salen pintadas de otro color diferente del de texto
		return this.http.get(`${this.API_URI}/list`); //http: variable definida en el constructor / Parametro se pasa la ruta principal seguida del metodo q quiero utilizar
		//si no funciona usar 
		//return this.http.get(this.API_URI+'/list');
	}
	
	buscarUsuario(id:string){ //METODO
		return this.http.get(`${this.API_URI}/find/${id}`);
	}


	//ABM
	registrar(usuario:any){
		return this.http.post(`${this.API_URI}/signup`,usuario);
	}

	actualizarUsuario(id:string, actualizaUsuario: Usuario):Observable<Usuario>{ //Observable: se utiliza para pasar objetos de tipo "algo", en este caso de tipo Usuario
		return this.http.post(`${this.API_URI}/update/${id}`,actualizaUsuario);
	}
	
	eliminarUsuario(id:string){
		return this.http.delete(`${this.API_URI}/delete/${id}`);
	}
	//ABM	
	

	//SESION
	isLoggedIn():Boolean{
		return !!localStorage.getItem('token'); //Si existe token retorna true
		//es el equivalente de testearlo con if pero ahora en una sola linea.
	}

	logOut(){
		localStorage.removeItem('token');
		localStorage.removeItem('carrito');	
		localStorage.removeItem('usuario');
		this.router.navigate(['usuarios/principal']);
	}

	getToken(){//Obtenemos el token que despues enviara el interceptor x cada req
		return localStorage.getItem('token');
	}
	//SESION



	
}