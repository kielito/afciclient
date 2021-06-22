import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  logueado:Boolean= true;
  perfil:string= "";

  constructor(private usuariosService:UsuariosService) { }

  ngOnInit(): void {
    this.usuariosService.logued$.subscribe(log => {      
      this.logueado = this.usuariosService.isLoggedIn();
      if(localStorage.usuario)
      {
        var usuario = JSON.parse(localStorage.usuario);
        this.perfil = usuario.Perfil;        
      }
    });
        
  }

  logout(){
    //Es de notar que la redireccion del metodo logOut podria haberse hecho aqui y dejar el servicio lo mas acotado posible.
    this.logueado = false;
    this.usuariosService.logOut();
  }
}
