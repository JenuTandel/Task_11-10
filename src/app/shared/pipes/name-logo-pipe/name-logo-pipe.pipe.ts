import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nameLogoPipe'
})
export class NameLogoPipePipe implements PipeTransform {
  transform(value: string): string {
    value = value.toUpperCase();
    const nameArray = value.split(' ');
    return `${nameArray[0].charAt(0)}${nameArray[1].charAt(0)}`;
  }
}
