import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterprov'
})
export class FilterprovPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if(arg === '' || arg.Length < 3) return value;
      const resultProveedores = [];
      for(const proveedor of value){
        if(proveedor.RazonSocial.toLowerCase().indexOf(arg.toLowerCase()) > -1){
          resultProveedores.push(proveedor);
        };
      };
      return resultProveedores;
    }
  }
