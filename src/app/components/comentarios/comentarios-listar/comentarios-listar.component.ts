import { Component, OnInit } from '@angular/core';
import { ComentariosService } from '../../../services/comentarios.service';
import { UsuariosService } from '../../../services/usuarios.service';

@Component({
  selector: 'app-comentarios-listar',
  templateUrl: './comentarios-listar.component.html',
  styleUrls: ['./comentarios-listar.component.css']
})
export class ComentariosListarComponent implements OnInit {

  comentarios:any = []; //variable del componente, disponible para todas las clases (la puedo usar desde el HTML)
  revelar:boolean=false; // true

  archivoSeleccionado:any;
  file:any;
  admin:Boolean=false;
  usuario:any = [];

  constructor(private comentariosService:ComentariosService, private usuariosService: UsuariosService) { }

  ngOnInit(): void {
    this.usuariosService.logued$.emit();
    this.comentariosService.listarComentarios().subscribe(
      res => { 
				this.comentarios = res; 
				console.log(res)
			},
      err => console.log(err)
    )
  }

  SeleccionArchivo(event: any): void{
    if(event.target.files && event.target.files[0]){
      this.file = <File>event.target.files[0];

      const reader = new FileReader();
      reader.onload = e => this.archivoSeleccionado = reader.result;
      reader.readAsDataURL(this.file);   
      
      console.log(this.file);
    }
  }

  cargarArchivo(){
    console.log(this.file);
    this.usuariosService.cargar(this.file).subscribe(
      res => {
        console.log(res);
                
      },        
        err => {
          console.log(err);         
      }
    )
  }

  logout(){
    //Es de notar que la redireccion del metodo logOut podria haberse hecho aqui y dejar el servicio lo mas acotado posible.    
    this.usuariosService.logOut();
  }

}
