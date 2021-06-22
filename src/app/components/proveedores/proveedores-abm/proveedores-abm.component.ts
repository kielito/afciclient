import { Component, OnInit } from '@angular/core';
import { ProveedoresService } from '../../../services/proveedores.service';
import { UsuariosService } from '../../../services/usuarios.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-proveedores-abm',
  templateUrl: './proveedores-abm.component.html',
  styleUrls: ['./proveedores-abm.component.css']
})
export class ProveedoresAbmComponent implements OnInit {

  datos= {  nombre:"", precio:"" };
  precio = 1;
  proveedores:any = [];
  errorNombre=0;
  errorPrecio=0;
  confirmacion:boolean = false;
  error:boolean = false;
  mensaje = "";

  constructor(private proveedoresService:ProveedoresService, private router:Router, private usuariosService:UsuariosService) { }

  ngOnInit(): void {
    this.usuariosService.logued$.emit();
    this.proveedoresService.listarProveedor().subscribe(
      res => {
        this.proveedores = res;        
      },
			err => console.log(err)
		)
    this.confirmacion=false;
    this.error=false;
  }

  registrar(){		
    this.proveedoresService.agregarProveedor(this.datos).subscribe(
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

  editar(proveedor:any){
    if(!this.verificarForm(proveedor))
    {
      this.error=true;
      console.log('Verifique los datos');
    } else
    {
      this.proveedoresService.editarProveedor(proveedor).subscribe(
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

  eliminar(proveedor:any){
    this.proveedoresService.eliminarProveedor(proveedor).subscribe(
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

  verificarForm(proveedor:any):boolean{    
    this.errorNombre=this.verificarNombre(proveedor.nombre);
    this.errorPrecio=this.verificarPrecio(proveedor.precio);
    
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
