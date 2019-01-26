import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertToInitials'
})
export class ConvertToInitialsPipe implements PipeTransform {
  transform(value: string, args: string[]): any {
    if (!value) {
      return value;
    }

    return value.split(' ')
      .map((txt) => txt.substring(0, 1).toUpperCase())
      .join('');
  }
}
