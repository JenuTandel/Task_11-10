import { Pipe, PipeTransform, ɵgetDebugNodeR2 } from '@angular/core';
import { ItemsList } from '@ng-select/ng-select/lib/items-list';
import { filter } from 'rxjs';
import { Company } from 'src/app/company/company.model';
import { DataCommunicationService } from 'src/app/company/data-communication.service';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  /**
   * search company from Company array
   * @param data 
   * @param searchItem 
   * @returns Company[]
   */
  transform(data: Company[], searchItem: string): any {

    if (!searchItem) {
      return data;
    }
    searchItem = searchItem.toLowerCase();
    const d = data.filter((item) => {
      return JSON.stringify(item).toLowerCase().includes(searchItem);
    })
    return d;
  }
}
