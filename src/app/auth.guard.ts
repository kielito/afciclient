import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UsuariosService } from './services/usuarios.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
		private authService:UsuariosService,
		private router:Router
	){}

  canActivate(){
	
	if(localStorage.usuario)
	{
		var usuario = JSON.parse(localStorage.usuario);
		if(this.authService.isLoggedIn()){
			return true;				
	}
		this.router.navigate(['usuarios/ingresar']);
		console.log('Debe iniciar sesión');
		return false;
	}
	this.router.navigate(['usuarios/ingresar']);
	console.log('Debe iniciar sesión');
	return false;
	}  
}