import {CustomAngularFormControl} from "./custom-angular-form-control";
import {MatFormFieldControl} from "@angular/material/form-field";
import {Component, ElementRef, Input, OnDestroy, OnInit, Optional, Self} from "@angular/core";
import {NgControl, Validators} from "@angular/forms";
import {FocusMonitor, FocusOrigin} from "@angular/cdk/a11y";
import {Subject, Subscription} from "rxjs";
import {coerceBooleanProperty} from "@angular/cdk/coercion";

@Component({
    standalone: true,
    template: ''
})
export abstract class CustomAngularMaterialFormControl<T> extends CustomAngularFormControl implements OnInit, OnDestroy, MatFormFieldControl<T> {
    @Input() placeholder = '';

    abstract id: string;
    stateChanges = new Subject<void>();
    focused = false;

    protected _required: boolean = false;

    private focusMonSub?: Subscription;
    private formControlStatusChangesSub?: Subscription;

    /**
     * Base class for custom angular material form controls
     * @param ngControl
     * @param focusMonitor If set, the focus monitor will monitor the selfElementRef
     * @param selfElementRef Required if focusMonitor is set
     * @protected
     */
    protected constructor(
        @Optional() @Self() ngControl: NgControl,
        private focusMonitor?: FocusMonitor,
        private selfElementRef?: ElementRef
    ) {
        super(ngControl);
    }

    ngOnInit() {
        if (this.focusMonitor && this.selfElementRef) {
           this.focusMonSub = this.focusMonitor.monitor(this.selfElementRef.nativeElement, true).subscribe(origin => this.onFocusLost(origin));
        }

        if (this.ngControl) {
            const ngFormControl = this.ngControl.control;
            if (ngFormControl) {
                this._required = ngFormControl.hasValidator(Validators.required) ?? false;
                this.formControlStatusChangesSub = ngFormControl.statusChanges.subscribe(() => {
                    const required = ngFormControl.hasValidator(Validators.required) ?? false;
                    if(required !== this._required) {
                        this._required = required;
                        this.stateChanges.next();
                    }
                });
            }
        }
    }

    abstract get empty(): boolean;

    @Input()
    get disabled() {
        return this._disabled;
    }

    set disabled(dis) {
        this._disabled = coerceBooleanProperty(dis);
        this.stateChanges.next();
    }

    @Input()
    get required(): boolean {
        return this._required;
    }

    set required(req: any) {
        this._required = coerceBooleanProperty(req);
        this.stateChanges.next();
    }

    get errorState(): boolean {
        return (this.ngControl && this.ngControl.invalid && this.ngControl.touched) as boolean;
    }

    get shouldLabelFloat() {
        return this.focused || !this.empty;
    }

    setDescribedByIds(): void {
    }

    onContainerClick(): void {
        this.controlTouched();
    }

    ngOnDestroy() {
        this.stateChanges.complete();
        if(this.focusMonitor)
        {
            this.focusMonitor.stopMonitoring((this.selfElementRef as ElementRef).nativeElement);
            (this.focusMonSub as Subscription).unsubscribe();
        }
        this.formControlStatusChangesSub?.unsubscribe();
    }

    /**
     * FocusMonitor needs to be set in the constructor.
     * Called whenever the form control loses focus.
     * @protected
     */
    protected onFocusLost(origin: FocusOrigin) {
        this.focused = !!origin;
        this.stateChanges.next();
    }
}
