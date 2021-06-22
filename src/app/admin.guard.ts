import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(	
	private router:Router				
	){}

  canActivate(){
	if(localStorage.usuario)
	{
		var usuario = JSON.parse(localStorage.usuario);

		if(usuario.Perfil==="Admin")
		{						
			return true;
		}
		this.router.navigate(['usuarios/home']);
		console.log('No tiene permiso para la sección');
		return false;	
	}
	else {
		console.log('Debe iniciar sesión');
		return false;
	}
	}
  
}
