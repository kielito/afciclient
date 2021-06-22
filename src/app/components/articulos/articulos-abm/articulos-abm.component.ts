import { Component, OnInit } from '@angular/core';
import { ArticulosService } from '../../../services/articulos.service';
import { UsuariosService } from '../../../services/usuarios.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-articulos-abm',
  templateUrl: './articulos-abm.component.html',
  styleUrls: ['./articulos-abm.component.css']
})
export class ArticulosABMComponent implements OnInit {

  datos= {  nombre:"", precio:"" };
  precio = 1;
  articulos:any = [];
  errorNombre=0;
  errorPrecio=0;
  confirmacion:boolean = false;
  error:boolean = false;
  mensaje = "";

  constructor(private articulosService:ArticulosService, private router:Router, private usuariosService:UsuariosService) { }

  ngOnInit(): void {    
    this.usuariosService.logued$.emit();
    this.articulosService.listarArticulo().subscribe(
      res => {
        this.articulos = res;        
      },
			err => console.log(err)
		)
    this.confirmacion=false;
    this.error=false;   
  }

  registrar(){		
    this.articulosService.agregarArticulo(this.datos).subscribe(
      res => {
        let id: any=res;
        this.mensaje = "agregado";
        this.confirmacion=true;
      },
      err => {
        this.error=true;
        console.log(err.error.message);
      }
    )
    this.limpiarDatos();
    this.ngOnInit(); 
  }

  editar(articulo:any){
    if(!this.verificarForm(articulo))
    {
      this.error=true;
      console.log('Verifique los datos');
    } else
    {
      this.articulosService.editarArticulo(articulo).subscribe(
        res => {
          console.log(res);
          this.mensaje = "actualizado";
          this.confirmacion=true;
        },
        err => {
          this.error=true;
          console.log(err.error.message);
        }
      )
    }
    this.ngOnInit();    
  }

  eliminar(articulo:any){
    this.articulosService.eliminarArticulo(articulo).subscribe(
      res => {
        console.log(res);
        this.mensaje = "eliminado";
          this.confirmacion=true;
      },
      err => {
        console.log(err.error.message);
      }
    )
    this.ngOnInit();    
  }

  verificarForm(articulo:any):boolean{    
    this.errorNombre=this.verificarNombre(articulo.nombre);
    this.errorPrecio=this.verificarPrecio(articulo.precio);
    
    if((this.errorNombre+this.errorPrecio)>0){
      this.error=true;      
      return false;
    }
    return true;
  }

  verificarNombre(nombre:string):number {
    if(nombre.length==0)
      return 1;
    else if(nombre.replace(' ','') === "")
    {
      this.datos.nombre = "";
      return 2;
    } else
    return 0;
  }
  
  verificarPrecio(precio:any): number {
    if(precio.length==0)
      return 1;
    return 0;
  }

  limpiarDatos() {      
      this.datos.nombre = "";
      this.datos.precio = "";
    }

}
