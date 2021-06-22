import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../../services/usuarios.service';

@Component({
  selector: 'app-usuarios-home',
  templateUrl: './usuarios-home.component.html',
  styleUrls: ['./usuarios-home.component.css']
})
export class UsuariosHomeComponent implements OnInit {

  admin:Boolean=false;
  usuario:any = [];

  constructor(private usuariosService:UsuariosService) { }

  ngOnInit(): void {    
    this.usuariosService.logued$.emit();
    this.usuario = JSON.parse(localStorage.usuario);
    
    if(this.usuario.Perfil==="Admin")							
		  this.admin = true;
    else
		  this.admin = false;      
  }

  logout(){
    //Es de notar que la redireccion del metodo logOut podria haberse hecho aqui y dejar el servicio lo mas acotado posible.
    this.usuariosService.logOut();
  }

}

