import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'header' })
export class HeaderPipe implements PipeTransform {
  transform(value: string): string {
    return value
      .split('_')
      .map(([first, ...rest]) =>
        [first.toUpperCase(), ...rest].join('')
      )
      .join(' ');
  }
}
