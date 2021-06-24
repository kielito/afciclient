import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../../services/usuarios.service';
import {Router,ActivatedRoute } from '@angular/router';
import { templateJitUrl } from '@angular/compiler';

@Component({
  selector: 'app-usuarios-activar',
  templateUrl: './usuarios-activar.component.html',
  styleUrls: ['./usuarios-activar.component.css']
})
export class UsuariosActivarComponent implements OnInit {

  parametro:string="";
  mensaje:string="";
  estado:boolean= false;

  constructor(private usuariosService: UsuariosService, private router:Router, private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.usuariosService.logued$.emit();
    this.parametro = this.activatedRoute.snapshot.params.id;
    
    this.usuariosService.activar(this.parametro).subscribe(
      res => {
        this.estado = true;
        console.log(res);
        this.mensaje = res.toString();
                
      },        
        err => {
          this.estado = false;
          console.log(err);
          this.mensaje = err.error.message.toString();          
      }
    )
    
  }

}
