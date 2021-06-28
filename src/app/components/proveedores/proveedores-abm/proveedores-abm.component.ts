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

  proveedor= {  TipoDocumento:"", NumeroDocumento:"", RazonSocial:"", Email:"", Direccion:"", Localidad:"", Provincia:"", CodigoPostal:"", Descripcion:"" };
  precio = 1;
  proveedores:any = [];

  errorTipoDocumento=0;
  errorNumeroDocumento=0;
  errorRazonSocial=0;
  errorDireccion=0;
  errorLocalidad=0;
  errorEmail=0;
  errorProvincia=0;
  errorCodigoPostal=0;
  errorDescripcion=0;

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
    this.proveedoresService.agregarProveedor(this.proveedor).subscribe(
      res => {
        this.ngOnInit(); 
        this.mensaje = "agregado";
        this.confirmacion=true;        
        this.recargarForm();
      },
      err => {
        this.error=true;
        this.mensaje = err.error.message;
      }
    )    
  }

  editar(proveedor:any){
    this.confirmacion=false; 
    this.error=false;

    if(this.verificarForm())
    {
      this.error=true;
    } else
    {
      this.proveedoresService.editarProveedor(proveedor).subscribe(
        res => {
          this.ngOnInit();
          this.mensaje = "actualizado";
          this.confirmacion=true;
        },
        err => {
          this.error=true;
          this.mensaje = err.error.message;
        }
      )
    }
    this.ngOnInit();    
  }

  eliminar(proveedor:any){
    this.confirmacion=false;
    this.error=false;
    this.proveedoresService.eliminarProveedor(proveedor.Id).subscribe(
      res => {
        this.mensaje = "eliminado";
        this.confirmacion=true;
      },
      err => {
        this.error=true;
        this.mensaje = err.error.message;
      }
    )
    this.ngOnInit();    
  }
  
  verificarForm():boolean{    
    this.errorTipoDocumento=this.verificarTipoDocumento(this.proveedor.TipoDocumento);
    this.errorNumeroDocumento=this.verificarNumeroDocumento(this.proveedor.NumeroDocumento);
    this.errorRazonSocial=this.verificarRazonSocial(this.proveedor.RazonSocial);
    this.errorDireccion=this.verificarDireccion(this.proveedor.Email);
    this.errorLocalidad=this.verificarLocalidad(this.proveedor.Direccion);
    this.errorEmail=this.verificarEmail(this.proveedor.Localidad);
    this.errorProvincia=this.verificarProvincia(this.proveedor.Provincia);
    this.errorCodigoPostal=this.verificarCodigoPostal(this.proveedor.CodigoPostal);
    this.errorDescripcion=this.verificarDescripcion(this.proveedor.Descripcion);
    
    if((this.errorTipoDocumento+this.errorNumeroDocumento+this.errorRazonSocial+this.errorDireccion+this.errorLocalidad+this.errorEmail+this.errorProvincia+this.errorCodigoPostal+this.errorDescripcion)>0){
      this.error=true;      
      return false;
    }
    return true;
  }

  verificarTipoDocumento(TipoDocumento:string):number {
    if(TipoDocumento.length==0)
      return 1;
    else if(TipoDocumento.replace(' ','') === "")
    {
      this.proveedor.TipoDocumento = "";
      return 2;
    } else
    return 0;
  }
  
  verificarNumeroDocumento(NumeroDocumento:any): number {
    if(NumeroDocumento.length==0)
      return 1;
    else if(NumeroDocumento.replace(' ','') === "")
    { 
      this.proveedor.NumeroDocumento = "";
      return 2;
    } else
    return 0;
  } 

  verificarRazonSocial(RazonSocial:any): number {
    if(RazonSocial.length==0)
      return 1;
    else if(RazonSocial.replace(' ','') === "")
    { 
      this.proveedor.RazonSocial = "";
      return 2;
    } else
    return 0;
  }

  verificarDireccion(Email:any): number {
    if(Email.length==0)
      return 1;
    else if(Email.replace(' ','') === "")
    { 
      this.proveedor.Email = "";
      return 2;
    } else
    return 0;
  }

  verificarLocalidad(Direccion:any): number {
    if(Direccion.length==0)
      return 1;
    else if(Direccion.replace(' ','') === "")
    { 
      this.proveedor.Direccion = "";
      return 2;
    } else
    return 0;
  }

  verificarEmail(Localidad:any): number {
    if(Localidad.length==0)
      return 1;
    else if(Localidad.replace(' ','') === "")
    { 
      this.proveedor.Localidad = "";
      return 2;
    } else
    return 0;
  }

  verificarProvincia(Provincia:any): number {
    if(Provincia.length==0)
      return 1;
    else if(Provincia.replace(' ','') === "")
    { 
      this.proveedor.Provincia = "";
      return 2;
    } else
    return 0;
  }

  verificarCodigoPostal(CodigoPostal:any): number {
    if(CodigoPostal.length==0)
      return 1;
    else if(CodigoPostal.replace(' ','') === "")
    { 
      this.proveedor.CodigoPostal = "";
      return 2;
    } else
    return 0;
  }

  verificarDescripcion(Descripcion:any): number {
    if(Descripcion.length==0)
      return 1;
    else if(Descripcion.replace(' ','') === "")
    { 
      this.proveedor.Descripcion = "";
      return 2;
    } else
    return 0;
  }

  recargarForm(){    
    this.proveedor.CodigoPostal="";
    this.proveedor.Descripcion="";
    this.proveedor.Direccion="";
    this.proveedor.Email="";
    this.proveedor.Localidad="";
    this.proveedor.NumeroDocumento="";
    this.proveedor.Provincia="";
    this.proveedor.RazonSocial="";
    this.proveedor.TipoDocumento="";
	  this.mensaje="";
  }

}
