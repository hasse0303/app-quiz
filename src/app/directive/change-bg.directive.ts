import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appChangeBg]'
})
export class ChangeBgDirective {

  @Input() isCorrect : boolean = false;
  constructor(private ef: ElementRef, private render: Renderer2) { }
  @HostListener('click') answered(){
    if(this.isCorrect){
      this.render.setStyle(this.ef.nativeElement, 'background-color','#3f51b5');
      this.render.setStyle(this.ef.nativeElement, 'color','#fff');
      this.render.setStyle(this.ef.nativeElement, 'font-size','16px');
    }else{
      this.render.setStyle(this.ef.nativeElement, 'color','#fff');
      this.render.setStyle(this.ef.nativeElement, 'background-color','red');
      this.render.setStyle(this.ef.nativeElement, 'font-size','16px');
    }
  }
}
