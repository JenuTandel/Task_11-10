import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nameLogoPipe'
})
export class NameLogoPipePipe implements PipeTransform {
  transform(value: string): string {
    let logo="";
    value = value.toUpperCase();
    if(value.indexOf(' ')>=0){
      const nameArray = value.split(' ');
      logo = `${nameArray[0].charAt(0)}${nameArray[1].charAt(0)}`;
    }
    else{
      logo = value.substring(0,2);
    }
    return logo;
  }
}
