import {
    Directive,
    Renderer2,
    ElementRef,
    Input
} from '@angular/core';
@Directive({
    selector: '[accountMask]'
})
export class AccountMaskDirective {
       
    constructor(private elementRef: ElementRef, private renderer: Renderer2) {

    }

    ngOnInit() {

    }

    ngAfterContentInit() {
        let accountNo = this.elementRef.nativeElement.innerHTML;
        this.elementRef.nativeElement.innerHTML = accountNo.replace(/\d(?=\d{4})/g, '*');
        //this.elementRef.nativeElement.innerHTML = maskedNumbers.replace(/./g, '*') + visibleNumbers;
    }

}