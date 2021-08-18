import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuariosListarComponent } from "./components/usuarios/usuarios-listar/usuarios-listar.component";
import { UsuariosIngresarComponent } from "./components/usuarios/usuarios-ingresar/usuarios-ingresar.component";
import { UsuariosPrincipalComponent } from "./components/usuarios/usuarios-principal/usuarios-principal.component";
import { UsuariosHomeComponent } from "./components/usuarios/usuarios-home/usuarios-home.component";
import { UsuariosAbmComponent} from "./components/usuarios/usuarios-abm/usuarios-abm.component";

import { DeclaracionAbmComponent } from "./components/declaracion/declaracion-abm/declaracion-abm.component";
import { DeclaracionListarComponent } from "./components/declaracion/declaracion-listar/declaracion-listar.component";

import { InformeAbmComponent } from "./components/informe/informe-abm/informe-abm.component";
import { InformeListarComponent } from "./components/informe/informe-listar/informe-listar.component";


import { AuthGuard } from './auth.guard';
import { AdminGuard } from './admin.guard';

const routes: Routes = [	
	{//ruta por default: "/"
		path: '',
		redirectTo: 'usuarios/principal',
		pathMatch: 'full'
	},
	//USUARIOS	
	{
		path: 'usuarios/listar',
		component: UsuariosListarComponent,		
		canActivate: [AuthGuard]
	},
	{
		path: 'usuarios/ingresar',
		component: UsuariosIngresarComponent
	},		
	{
		path: 'usuarios/principal',
		component: UsuariosPrincipalComponent
	},
	{
		path:'usuarios/home',
		component: UsuariosHomeComponent,
		canActivate: [AuthGuard]
	},	
	{
		path: 'usuarios/abmusuarios',
		component: UsuariosAbmComponent,
		canActivate: [AuthGuard, AdminGuard]
	},
	// DECLARACION
	{
		path: 'declaracion/abmdeclaraciones',
		component: DeclaracionAbmComponent,
		canActivate: [AuthGuard, AdminGuard]
	},	
	{
		path: 'declaracion/listar',
		component: DeclaracionListarComponent,
		canActivate: [AuthGuard, AdminGuard]
	}
	,
	// INFORME
	{
		path: 'informe/abminformes',
		component: InformeAbmComponent,
		canActivate: [AuthGuard, AdminGuard]
	},	
	{
		path: 'informe/listar',
		component: InformeListarComponent,
		canActivate: [AuthGuard, AdminGuard]
	}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
