import { Component, OnInit } from '@angular/core';
import { DeclaracionService } from '../../../services/declaracion.service';
import { UsuariosService } from '../../../services/usuarios.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-declaracion-abm',
  templateUrl: './declaracion-abm.component.html',
  styleUrls: ['./declaracion-abm.component.css']
})
export class DeclaracionAbmComponent implements OnInit {

  constructor(private declaracionService:DeclaracionService, private router:Router, private usuariosService:UsuariosService) { }

  ngOnInit(): void {
    this.usuariosService.logued$.emit();
    
  }

}
