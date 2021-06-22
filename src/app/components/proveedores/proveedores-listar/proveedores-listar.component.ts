import { Component, OnInit } from '@angular/core';
import { ProveedoresService } from '../../../services/proveedores.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-proveedores-listar',
  templateUrl: './proveedores-listar.component.html',
  styleUrls: ['./proveedores-listar.component.css']
})
export class ProveedoresListarComponent implements OnInit {

  proveedores:any = [];
  
  constructor(private proveedoresService:ProveedoresService) { }

  ngOnInit(): void {
    this.proveedoresService.listarProveedor().subscribe(
      res => {
        this.proveedores = res;
      },
			err => console.log(err)
		)
  }

}
