import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterprod'
})
export class FilterprodPipe implements PipeTransform {

  transform(value: any, arg: any): any {
  if(arg === '' || arg.Length < 3) return value;
    const resultProductos = [];
    for(const articulo of value){
      if(articulo.Descripcion.toLowerCase().indexOf(arg.toLowerCase()) > -1){
        resultProductos.push(articulo);
      };
    };
    return resultProductos;
  }
}