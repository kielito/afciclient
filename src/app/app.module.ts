import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'; 
import { FormsModule } from '@angular/forms';
import { UsuariosService } from './services/usuarios.service';
import { NavigationComponent } from './components/navigation/navigation.component';
import { UsuariosIngresarComponent } from './components/usuarios/usuarios-ingresar/usuarios-ingresar.component';
import { UsuariosListarComponent } from './components/usuarios/usuarios-listar/usuarios-listar.component';
import { UsuariosPrincipalComponent } from './components/usuarios/usuarios-principal/usuarios-principal.component';
import { UsuariosHomeComponent } from './components/usuarios/usuarios-home/usuarios-home.component';
import { AuthGuard } from './auth.guard';
import { AdminGuard } from './admin.guard';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { UsuariosAbmComponent } from './components/usuarios/usuarios-abm/usuarios-abm.component';
import { FilterPipe } from './pipes/filter.pipe';

@NgModule({ //Clase
  declarations: [
    AppComponent,
    NavigationComponent,
    UsuariosIngresarComponent,
    UsuariosListarComponent,
    UsuariosPrincipalComponent,
    UsuariosHomeComponent,   
    UsuariosAbmComponent, FilterPipe
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