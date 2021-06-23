import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if(arg === '' || arg.Length < 3) return value;
    const resultUsuarios = [];
    for(const usuario of value){
      if(usuario.Usuario.toLowerCase().indexOf(arg.toLowerCase()) > -1){
        resultUsuarios.push(usuario);
      };
    };
    return resultUsuarios;
  }

}
