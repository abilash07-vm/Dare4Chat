import { Pipe, PipeTransform } from '@angular/core';
import { User } from 'src/Interfaces/user';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(value: User[], args: string): User[] {
    if(!value)return [];
      if(!args)return value;

      args = args.toLowerCase();

      let l=value.filter(function(data:User){
        console.log((data.username).toLowerCase().includes(args));
          let count=(data.username).toLowerCase().search(args);
          console.log(data.username,args,count);
          return (count!=-1)
      });
      console.log('result: ',l);
      
      return l;
  }

}
