import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nameLogoPipe'
})
export class NameLogoPipePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
