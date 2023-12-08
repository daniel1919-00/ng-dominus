import {ControlValueAccessor, NgControl} from "@angular/forms";
import {Component} from "@angular/core";

@Component({
    standalone: true,
    template: ''
})
export abstract class CustomAngularFormControl implements ControlValueAccessor {
    protected _disabled: boolean = false;
    private touched: boolean = false;
    protected onChange = (value: any) => value;
    protected onTouched = () => {
    };

    protected constructor(
        public ngControl: NgControl
    ) {
        if (this.ngControl) {
            this.ngControl.valueAccessor = this;
        }
    }

    abstract get value();
    abstract set value(val: any);

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    controlTouched() {
        !this.touched && this.onTouched();
    }

    setDisabledState(isDisabled: boolean): void {
        this._disabled = isDisabled;
    }

    writeValue(value: any): void {
        this.value = value;
    }
}
