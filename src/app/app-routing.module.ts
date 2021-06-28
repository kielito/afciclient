import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuariosListarComponent } from "./components/usuarios/usuarios-listar/usuarios-listar.component";
import { UsuariosIngresarComponent } from "./components/usuarios/usuarios-ingresar/usuarios-ingresar.component";
import { UsuariosRegistrarComponent } from "./components/usuarios/usuarios-registrar/usuarios-registrar.component";
import { UsuariosPrincipalComponent } from "./components/usuarios/usuarios-principal/usuarios-principal.component";
import { UsuariosHomeComponent } from "./components/usuarios/usuarios-home/usuarios-home.component";
import { UsuariosAbmComponent} from "./components/usuarios/usuarios-abm/usuarios-abm.component";
import { UsuariosActivarComponent} from "./components/usuarios/usuarios-activar/usuarios-activar.component";
import { AuthGuard } from './auth.guard';
import { AdminGuard } from './admin.guard';
import { ArticulosListarComponent} from "./components/articulos/articulos-listar/articulos-listar.component";
import { ArticulosABMComponent} from "./components/articulos/articulos-abm/articulos-abm.component";
import { ProveedoresListarComponent} from "./components/proveedores/proveedores-listar/proveedores-listar.component";
import { ProveedoresAbmComponent } from "./components/proveedores/proveedores-abm/proveedores-abm.component";

import { ComentariosListarComponent} from "./components/comentarios/comentarios-listar/comentarios-listar.component";
import { ComentariosAbmComponent } from "./components/comentarios/comentarios-abm/comentarios-abm.component";

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
		path: 'usuarios/registrar',
		component: UsuariosRegistrarComponent,		
		canActivate: [AuthGuard, AdminGuard]
	},
	{
		path: 'usuarios/activar/:id',
		component: UsuariosActivarComponent
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

	//ARTICULOS
	{
		path: 'articulos/listar',
		component: ArticulosListarComponent,
		canActivate: [AuthGuard]
	},
	{
		path: 'articulos/abmarticulos',
		component: ArticulosABMComponent,
		canActivate: [AuthGuard, AdminGuard]
	},

	//PROVEEDORES
	{
		path: 'proveedores/listar',
		component: ProveedoresListarComponent,
		canActivate: [AuthGuard]
	},
	{
		path: 'proveedores/abmproveedores',
		component: ProveedoresAbmComponent,
		canActivate: [AuthGuard, AdminGuard]
	},
	//COMENTARIOS
	{
		path: 'comentario/listar',
		component: ComentariosListarComponent,
		canActivate: [AuthGuard]
	},
	{
		path: 'comentario/abmcomentarios',
		component: ComentariosAbmComponent,
		canActivate: [AuthGuard]
	}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
