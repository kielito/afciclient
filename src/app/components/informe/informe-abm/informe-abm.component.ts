import { Component, OnInit } from '@angular/core';
import { InformeService } from '../../../services/informe.service';
import { UsuariosService } from '../../../services/usuarios.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-informe-abm',
  templateUrl: './informe-abm.component.html',
  styleUrls: ['./informe-abm.component.css']
})
export class InformeAbmComponent implements OnInit {

  constructor(private informeservice:InformeService, private router:Router, private usuariosService:UsuariosService) { }

  ngOnInit(): void {
    this.usuariosService.logued$.emit();
  }

}
