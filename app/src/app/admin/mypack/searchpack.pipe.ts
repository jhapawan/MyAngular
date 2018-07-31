import { Token } from './../../shared/usertoken';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchpack',
  pure: false

})
export class SearchpackPipe implements PipeTransform {

  transform(value: any, args: string[]): any {
    let arr: Array<Token> = [];
    let filter = args[0];

    if (args.length == 0) return value;
    else {

      var filteredArray = value.filter(function (array_el) {
        if (array_el.skill) {
          return array_el.skill.filter(function (nestedFilter) {
            return args.filter(function (argumented) {
              //return (nestedFilter.skill == argumented.skill);
              if (nestedFilter.skill.toLowerCase().trim() == argumented.toLowerCase().trim()) {
                arr.push(array_el);
              }
            })
          })
        }
      });

      return arr;

    }

  }

}
