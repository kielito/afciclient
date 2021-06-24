import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'; 
import { FormsModule } from '@angular/forms';
import { UsuariosService } from './services/usuarios.service';
import { NavigationComponent } from './components/navigation/navigation.component';
import { UsuariosIngresarComponent } from './components/usuarios/usuarios-ingresar/usuarios-ingresar.component';
import { UsuariosRegistrarComponent } from './components/usuarios/usuarios-registrar/usuarios-registrar.component';
import { UsuariosListarComponent } from './components/usuarios/usuarios-listar/usuarios-listar.component';
import { UsuariosPrincipalComponent } from './components/usuarios/usuarios-principal/usuarios-principal.component';
import { UsuariosHomeComponent } from './components/usuarios/usuarios-home/usuarios-home.component';
import { AuthGuard } from './auth.guard';
import { AdminGuard } from './admin.guard';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { ArticulosListarComponent } from './components/articulos/articulos-listar/articulos-listar.component';
import { ArticulosABMComponent } from './components/articulos/articulos-abm/articulos-abm.component';
import { UsuariosAbmComponent } from './components/usuarios/usuarios-abm/usuarios-abm.component';
import { ProveedoresListarComponent } from './components/proveedores/proveedores-listar/proveedores-listar.component';
import { ProveedoresAbmComponent } from './components/proveedores/proveedores-abm/proveedores-abm.component';
import { UsuariosActivarComponent } from './components/usuarios/usuarios-activar/usuarios-activar.component';
import { ComentariosListarComponent } from './components/comentarios/comentarios-listar/comentarios-listar.component';
import { ComentariosAbmComponent } from './components/comentarios/comentarios-abm/comentarios-abm.component';
import { FilterPipe } from './pipes/filter.pipe';
import { FilterprodPipe } from './pipes/filterprod.pipe';
import { FilterprovPipe } from './pipes/filterprov.pipe';


@NgModule({ //Clase
  declarations: [
    AppComponent,
    NavigationComponent,
    UsuariosIngresarComponent,
    UsuariosRegistrarComponent,
    UsuariosListarComponent,
    UsuariosPrincipalComponent,
    UsuariosHomeComponent,        
    ArticulosListarComponent, 
    ArticulosABMComponent, 
    UsuariosAbmComponent, ProveedoresListarComponent, ProveedoresAbmComponent, UsuariosActivarComponent, ComentariosListarComponent, ComentariosAbmComponent, FilterPipe, FilterprodPipe, FilterprovPipe
  ],
  imports: [ //Seccion
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, //Clase importada
    FormsModule
  ],
  providers: [
    UsuariosService,
    AuthGuard,
    AdminGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi:true      
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }