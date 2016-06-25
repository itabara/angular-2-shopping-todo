/**
 * Created by Iulian on 25/06/16.
 */
import {Pipe} from 'angular2/core';
import {PipeTransform} from 'angular2/core';
import {ListItem} from './list-item';

@Pipe({
  name: 'myFilter'
})

export class FilterPipe implements PipeTransform{
  transform(value: ListItem[], args:string[]):any{
    if (value.length === 0){
      return value;
    }
    var resultArray = [];
    for(let item of value){
      if (item.name.match('^.*' + args[0] + '.')){
        resultArray.push(item);
      }
    }

    return resultArray;
  }
}
