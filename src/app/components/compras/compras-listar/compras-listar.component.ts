import { Component, OnInit } from '@angular/core';
import { ComprasService } from '../../../services/compras.service';
import { UsuariosService } from '../../../services/usuarios.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-compras-listar',
  templateUrl: './compras-listar.component.html',
  styleUrls: ['./compras-listar.component.css']
})
export class ComprasListarComponent implements OnInit {
  
  pedidos:any = [];

  constructor(private comprasService: ComprasService, private router:Router, private usuariosService:UsuariosService) { }

  ngOnInit(): void {
    this.usuariosService.logued$.emit();
    this.comprasService.listarPedido().subscribe( //se utiliza subscribe ya que el metodo trabaja con la base de datos			
      res => { 
        this.pedidos = res;
      },
			err => console.log(err) //Parametro 2: si hubo un error lo informo
		) 
  }  

  logout(){
    //Es de notar que la redireccion del metodo logOut podria haberse hecho aqui y dejar el servicio lo mas acotado posible.    
    this.usuariosService.logOut();
  }

}
