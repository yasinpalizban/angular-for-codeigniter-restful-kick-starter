import {Pipe, PipeTransform} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {filter} from 'rxjs/operators';

@Pipe({
  name: 'convertDate',
  pure: false
})
export class ConvertDatePipe implements PipeTransform {

  constructor(
    private router: Router
  ) {
    router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event) => {
      //  console.log(event.url);
    });
  }

  transform(value: any, args?: any): any {
    return 'message ' + value;
  }
}
