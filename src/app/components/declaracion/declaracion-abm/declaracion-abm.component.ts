import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTable} from '@angular/material/table';
import { DeclaracionService } from '../../../services/declaracion.service';
import { UsuariosService } from '../../../services/usuarios.service';
import { Router } from '@angular/router';


const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, nombre: '', apellido: '', dni: '', renaf: '', parentesco: '', direccion: ''}
];

@Component({
  selector: 'app-declaracion-abm',
  templateUrl: './declaracion-abm.component.html',
  styleUrls: ['./declaracion-abm.component.css']
})

export class DeclaracionAbmComponent implements OnInit {
  //declaracionIndividual = { selloPAFCI: "", selloAFCI: "", fecha_alta: "", fecha_firma_ddjj: "", tipo_dec_jurada: "", pcia_usuario: "", dni_usuario: "" };  
  declaraciones: any = []; //variable del componente, disponible para todas las clases (la puedo usar desde el HTML)
  confirmacion: boolean = false;
  error: boolean = false;
  mensaje = "";
  usuario: any = []; 


  displayedColumns: string[] = ['position', 'nombre', 'apellido', 'dni', 'renaf', 'parentesco', 'direccion'];
  dataSource = [...ELEMENT_DATA];
  

  constructor(private declaracionService: DeclaracionService, private router: Router, private usuariosService: UsuariosService) { }  

  @ViewChild(MatTable)
  table!: MatTable<PeriodicElement>;

  addData() {
    const randomElementIndex = Math.floor(Math.random() * ELEMENT_DATA.length);   
    this.dataSource.push(ELEMENT_DATA[randomElementIndex]);
    this.table.renderRows();
  }

  removeData() {
    this.dataSource.pop();
    this.table.renderRows();
  }

  ngOnInit(): void {
    this.usuariosService.logued$.emit();
    this.usuario = JSON.parse(localStorage.usuario);
    this.confirmacion = false;
    this.error = false;
  }

  registrar() {
    this.confirmacion = false;
    this.error = false;
    this.usuario.tipo_dec_jurada = "I";
    this.declaracionService.agregarDeclaracion(this.usuario).subscribe(
      res => {
        this.ngOnInit();
        this.mensaje = "agregada";
        this.confirmacion = true;
      },
      err => {
        this.error = true;
        this.mensaje = err.error.message;
      }
    )
  }

}

export interface PeriodicElement {
  position: number;
  nombre: string;
  apellido: string;
  dni: string;
  renaf: string;
  parentesco: string;
  direccion: string;
}