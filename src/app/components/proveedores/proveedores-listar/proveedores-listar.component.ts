import { Component, OnInit } from '@angular/core';
import { ProveedoresService } from '../../../services/proveedores.service';
import { UsuariosService } from '../../../services/usuarios.service';

@Component({
  selector: 'app-proveedores-listar',
  templateUrl: './proveedores-listar.component.html',
  styleUrls: ['./proveedores-listar.component.css']
})
export class ProveedoresListarComponent implements OnInit {

  proveedores:any = [];
  
  constructor(private proveedoresService:ProveedoresService, private usuariosService: UsuariosService) { }

  filterProveedor = '';

  ngOnInit(): void {
    this.usuariosService.logued$.emit();
    this.proveedoresService.listarProveedor().subscribe(
      res => {
        this.proveedores = res;
      },
			err => console.log(err)
		)
  }

}
