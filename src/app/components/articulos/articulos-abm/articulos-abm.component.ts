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

  articulo= { CodigoProducto: "", Descripcion: "", RazonSocial: "", StockActual: "", PrecioVenta: "" };
  proveedor= { Id: "", RazonSocial: "" };
  
  articulos:any = [];
  proveedores:any = [];

  errorCodigoProducto=0;
  errorDescripcion=0;
  errorRazonSocial=0;
  errorStockActual=0;
  errorPrecioVenta=0;  

  confirmacion:boolean = false;
  error:boolean = false;
  mensaje = "";

  constructor(private articulosService:ArticulosService, private router:Router, private usuariosService:UsuariosService) { }

  ngOnInit(): void {    
    this.usuariosService.logued$.emit();
    this.articulosService.listarArticulo().subscribe(
      res => {
        let result:any=res;
        this.articulos = result.articulo;
        this.proveedores = result.proveedor;
      },
			err => console.log(err)
		)
    this.confirmacion=false;
    this.error=false;   
  }

  registrar(){    
    this.articulosService.agregarArticulo(this.articulo).subscribe(
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

  editar(articulo:any){
    this.confirmacion=false;
    this.error=false;

    console.log(articulo);
    if(!this.verificarEdit(articulo))
    {      
      this.error=true;
    } else
    {
      this.articulosService.editarArticulo(articulo).subscribe(
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
  }

  eliminar(articulo:any){
    this.confirmacion=false;
    this.error=false;
    this.articulosService.eliminarArticulo(articulo.Id).subscribe(
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
    this.errorCodigoProducto=this.verificarCodigoProducto(this.articulo.CodigoProducto);
    this.errorDescripcion=this.verificarDescripcion(this.articulo.Descripcion);
    this.errorRazonSocial=this.verificarRazonSocial(this.articulo.RazonSocial);
    this.errorStockActual=this.verificarStockActual(this.articulo.StockActual);
    this.errorPrecioVenta=this.verificarPrecioVenta(this.articulo.PrecioVenta);

    console.log(this.articulo.CodigoProducto);
    console.log(this.articulo.Descripcion);
    console.log(this.errorRazonSocial);
    console.log(this.errorStockActual);
    console.log(this.errorPrecioVenta);
        
    if((this.errorCodigoProducto+this.errorDescripcion+this.errorRazonSocial+this.errorRazonSocial+this.errorStockActual+this.errorPrecioVenta)>0){
      this.error=true;      
      return false;
    }
    return true;
  }

  verificarEdit(articulo:any):boolean{    
    this.errorCodigoProducto=this.verificarCodigoProducto(articulo.CodigoProducto);
    this.errorDescripcion=this.verificarDescripcion(articulo.Descripcion);
    this.errorRazonSocial=this.verificarRazonSocial(articulo.RazonSocial);
    this.errorStockActual=this.verificarStockActual(articulo.StockActual);
    this.errorPrecioVenta=this.verificarPrecioVenta(articulo.PrecioVenta);
        
    if((this.errorCodigoProducto+this.errorDescripcion+this.errorRazonSocial+this.errorRazonSocial+this.errorStockActual+this.errorPrecioVenta)>0){
      this.error=true;      
      return false;
    }
    return true;
  }

  verificarCodigoProducto(CodigoProducto:any): number {
    CodigoProducto = CodigoProducto.replace(' ','');

    if(CodigoProducto.length==0){
      this.mensaje = "Debes completar todos los datos";
      return 1;
    }
    else if(CodigoProducto.length > 50)
    {      
      this.mensaje = "Codigo Producto muy largo";
      return 2;
    } else    
    return 0;
  }
  
  verificarDescripcion(Descripcion:any): number {
    Descripcion = Descripcion.replace(' ','');

    if(Descripcion.length==0)
      return 1;
    else if(Descripcion.length > 255){      
      this.mensaje = "Descripcion muy largo";
      return 2;
      } else
    return 0;
  } 

  verificarRazonSocial(RazonSocial:any): number {
    RazonSocial = RazonSocial.replace(' ','');

    if(RazonSocial.length==0)
      return 1;
    else if(RazonSocial.length > 150){      
      this.mensaje = "Descripcion muy largo";
      return 2;
    } else
      return 0;
  }

  verificarStockActual(StockActual:any): number {
    if(StockActual==null || StockActual.length==0)
      return 1;    
    else if(StockActual < 0 || StockActual > 1000){ 
      this.mensaje = "StockActual debe estar entre 0 y 1000";
      return 2;
    } else
      return 0;
  }  

  verificarPrecioVenta(PrecioVenta:any): number {
    if(PrecioVenta==null|| PrecioVenta.length==0)
      return 1;    
      else if(PrecioVenta < 0.01 || PrecioVenta > 1000000){ 
        this.mensaje = "Precio Venta debe estar entre 0.01 y 1000000";
      return 2;
    } else
      return 0;
  }

  recargarForm(){    
    this.articulo.CodigoProducto="";
    this.articulo.Descripcion="";
    this.articulo.RazonSocial="";
    this.articulo.StockActual="";
    this.articulo.PrecioVenta="";    
	  this.mensaje="";
  }

}
