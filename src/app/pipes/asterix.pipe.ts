import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'asterix'
})
export class AsterixPipe implements PipeTransform {
// ch="hello"
  transform(ch:string) {
    let voyels=["a","e","i","o","u","y"];
    let result="";
    for (let i = 0; i < ch.length; i++) {
     let inetrmediate=ch[i];
     for (let j = 0; j < voyels.length; j++) {
      if (ch[i].toLowerCase()==voyels[j]) {
        inetrmediate="*";
        break;  
      }
     }
     result=result+inetrmediate;
    }
    return result;
  }

}
