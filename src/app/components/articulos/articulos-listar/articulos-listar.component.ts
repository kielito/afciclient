import { Component, OnInit } from '@angular/core';
import { ArticulosService } from '../../../services/articulos.service';
import { UsuariosService } from '../../../services/usuarios.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-articulos-listar',
  templateUrl: './articulos-listar.component.html',
  styleUrls: ['./articulos-listar.component.css'],  
})
export class ArticulosListarComponent implements OnInit {
    
  articulos:any = []; //variable del componente, disponible para todas las clases (la puedo usar desde el HTML)  
    
  constructor(private articulosService:ArticulosService) { }

  ngOnInit(): void {
    this.articulosService.listarArticulo().subscribe(
      res => {
        this.articulos = res;
      },
			err => console.log(err)
		)
	}
  
}
