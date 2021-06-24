import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../../services/usuarios.service';

@Component({
  selector: 'app-usuarios-listar',
  templateUrl: './usuarios-listar.component.html',
  styleUrls: ['./usuarios-listar.component.css']
})
export class UsuariosListarComponent implements OnInit {
  
  usuarios:any = []; //variable del componente, disponible para todas las clases (la puedo usar desde el HTML)
  revelar:boolean= true; //para mostrar (true) u ocultar (false) en el formulario  

  constructor(private usuariosService:UsuariosService) { }

  filterUsuarios = '';

  ngOnInit(){ //Metodo: se ejecuta cuando se instancia el objeto de esta clase
		this.usuariosService.logued$.emit();
    this.usuariosService.listarUsuarios().subscribe( //se utiliza subscribe ya que el metodo trabaja con la base de datos
			//res => console.log(res), //Parametro 1: si se ejecuto bien se informa
      res => { 
        this.usuarios = res;
      },
			err => console.log(err) //Parametro 2: si hubo un error lo informo
		) //los log se ven en la consola del navegador    
	}

  logout(){
    //Es de notar que la redireccion del metodo logOut podria haberse hecho aqui y dejar el servicio lo mas acotado posible.    
    this.usuariosService.logOut();
  }

}
