import { Component, OnInit } from '@angular/core';
import { ComprasService } from '../../../services/compras.service';
import { UsuariosService } from '../../../services/usuarios.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-compras-agregar',
  templateUrl: './compras-agregar.component.html',
  styleUrls: ['./compras-agregar.component.css']
})
export class ComprasAgregarComponent implements OnInit {

  datos= {  calle:"", altura:"" };
  errorCalle=0;
  errorAltura=0;
  carrito:any = [
    "id",
    "precio",
    "nombre",
    "cantidad",
    "subtotal"
  ];
  total:number = 0;
  vacio:boolean=false;
  confirmacion:boolean = false;
  error:boolean = false;

  constructor(private comprasService: ComprasService, private router:Router, private usuariosService:UsuariosService) { }

  ngOnInit(): void {
    this.carrito = [];
    this.total = 0;

    this.usuariosService.logued$.emit();
    
    if(localStorage.carrito)
    {
      this.vacio = false;
      var resultado = JSON.parse(localStorage.carrito);      

      for (let i=0;i<resultado.length;i++) {            
        this.carrito.push({
          "id":resultado[i].id,
          "precio":resultado[i].precio,
          "nombre":resultado[i].nombre,
          "cantidad":resultado[i].cantidad,
          "subtotal":resultado[i].cantidad*resultado[i].precio
        });

        this.total = this.total + (resultado[i].cantidad*resultado[i].precio);
      }      
    }
    else
      this.vacio = true;
  }

  registrar(){
    this.confirmacion=false;
    var pedido = this.carrito;

    for (let i=0;i<pedido.length;i++) {            
      delete pedido[i].precio;
      delete pedido[i].nombre;
      delete pedido[i].subtotal;
    };

    console.log(pedido);
    
    pedido.push( {"calle": this.datos.calle,
                  "altura": this.datos.altura});

    this.comprasService.agregarCompra(pedido).subscribe(
      res => {
        let result:any=res;   
        console.log(result);
             
      },
      err => {
        console.log(err.error.message);
      }
    )
    
    this.confirmacion=true;
    this.limpiarDatos();
    localStorage.removeItem('carrito');
    
    this.ngOnInit();
    
  }

  verificarForm():boolean{
    this.errorCalle=this.verificarCalle(this.datos.calle);
    this.errorAltura=this.verificarAltura(this.datos.altura);
    
    if((this.errorCalle+this.errorAltura)>0){      
      this.error=true;
      return false;
    }
    return true;
  }

  verificarCalle(calle:string):number {
    const patron=/^[a-zA-ZÀ-ÿ°.0-9_\s'/\u00f1\u00d1]{1,50}$/;
    if(calle.length==0)
      return 1;
    else if(calle.length<2 && calle.length>50)
      return 2;
    else if(!patron.test(calle))
      return 3;
    else
      return 0;
  }
  
  verificarAltura(altura:any): number {
    const patron=/^[0-9]{1,5}$/;
    if(altura.length==0)
      return 1;   
    else if(!patron.test(altura))
      return 2;
    else if(altura==0 || altura > 50000)
      return 3;
    else
    return 0;
  }

  limpiarDatos(){
    this.datos.altura="";
    this.datos.calle="";
  }

  home(){
    this.router.navigate(['usuarios/home']); //redireccion 
  }


  logout(){
    //Es de notar que la redireccion del metodo logOut podria haberse hecho aqui y dejar el servicio lo mas acotado posible.    
    this.usuariosService.logOut();
  }

}
