import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appChangeBg]'
})
export class ChangeBgDirective {

  @Input() isCorrect : boolean = false;
  constructor(private ef: ElementRef, private render: Renderer2) { }
  @HostListener('click') answered(){
    if(this.isCorrect){
      this.render.setStyle(this.ef.nativeElement, 'color','green');
      this.render.setStyle(this.ef.nativeElement, 'font-size','16px');
      this.render.setStyle(this.ef.nativeElement, 'font-weight','500');
    }else{
      this.render.setStyle(this.ef.nativeElement, 'color','red');
      this.render.setStyle(this.ef.nativeElement, 'font-size','16px');
      this.render.setStyle(this.ef.nativeElement, 'font-weight','500');
    }
  }
}
