import { Component, OnInit } from '@angular/core';
import { InformeService } from '../../../services/informe.service';
import { UsuariosService } from '../../../services/usuarios.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-informe-listar',
  templateUrl: './informe-listar.component.html',
  styleUrls: ['./informe-listar.component.css']
})
export class InformeListarComponent implements OnInit {

  constructor(private informeservice:InformeService, private router:Router, private usuariosService:UsuariosService) { }

  ngOnInit(): void {
    this.usuariosService.logued$.emit();
  }

}
