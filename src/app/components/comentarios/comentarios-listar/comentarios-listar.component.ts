import { Component, OnInit } from '@angular/core';
import { ComentariosService } from '../../../services/comentarios.service';

@Component({
  selector: 'app-comentarios-listar',
  templateUrl: './comentarios-listar.component.html',
  styleUrls: ['./comentarios-listar.component.css']
})
export class ComentariosListarComponent implements OnInit {

  comentarios:any = []; //variable del componente, disponible para todas las clases (la puedo usar desde el HTML)
  revelar:boolean=false; // true

  constructor(private comentariosService:ComentariosService) { }

  ngOnInit(): void {
    this.comentariosService.listarComentarios().subscribe(
      res => { 
				this.comentarios = res; 
				console.log(res)
			},
      err => console.log(err)
    )
  }

}
