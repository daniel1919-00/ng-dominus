import {
    ChangeDetectorRef,
    Component,
    ElementRef,
    Input, OnChanges,
    OnDestroy,
    Optional,
    Self, SimpleChanges,
    ViewChild
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatFormField, MatFormFieldControl} from "@angular/material/form-field";
import {ControlValueAccessor, NgControl, Validators} from "@angular/forms";
import {BehaviorSubject, Subject, takeUntil} from "rxjs";
import {FocusMonitor} from "@angular/cdk/a11y";
import {ENTER} from "@angular/cdk/keycodes";
import {coerceBooleanProperty} from "@angular/cdk/coercion";
import {MatChipInputEvent, MatChipsModule} from "@angular/material/chips";
import {MatAutocompleteModule, MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {MatIconModule} from "@angular/material/icon";

@Component({
    selector: 'dm-tags',
    standalone: true,
    imports: [CommonModule, MatChipsModule, MatIconModule, MatAutocompleteModule],
    providers: [
        {
            provide: MatFormFieldControl,
            useExisting: DmTagsComponent
        }
    ],
    templateUrl: './dm-tags.component.html',
    styles: ``
})
export class DmTagsComponent implements OnChanges, OnDestroy, MatFormFieldControl<any>, ControlValueAccessor {
    static nextId = 0;

    @ViewChild('tagsInput') tagInput!: ElementRef;

    @Input() autocompleteOptions?: string[] | Promise<string[]>;
    @Input() placeholder = '';
    @Input() value: string[] = [];
    @Input() addOnKeycodes: number[] = [ENTER];
    @Input() addOnBlur: boolean = true;

    readonly id = `dm-tags-${DmTagsComponent.nextId++}`;
    focused = false;
    stateChanges = new Subject<void>();

    protected filteredAutocompleteOptions$?: BehaviorSubject<string[]>;

    private touched: boolean = false;
    private onChange = (tags: string[]) => tags;
    private onTouched = () => {
    };
    private componentDestroyed$: Subject<void> = new Subject<void>();
    private _required: boolean = false;
    private _disabled = false;

    constructor(
        private changeDetector: ChangeDetectorRef,
        private fm: FocusMonitor,
        @Optional() @Self() public ngControl: NgControl,
        @Optional() public parentFormField: MatFormField,
        private elRef: ElementRef
    ) {
        if (this.ngControl) {
            this.ngControl.valueAccessor = this;
            const ngFormControl = this.ngControl.control;
            if (ngFormControl) {
                this._required = ngFormControl.hasValidator(Validators.required) ?? false;
                ngFormControl.statusChanges.pipe(takeUntil(this.componentDestroyed$)).subscribe(() => {
                    this._required = ngFormControl.hasValidator(Validators.required) ?? false;
                    this.changeDetector.markForCheck();
                    this.stateChanges.next();
                });
            }
        }

        if (this.parentFormField) {
            this.fm.monitor(elRef.nativeElement, true).subscribe(origin => this.focused = !!origin);
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        if(changes['autocompleteOptions']) {
            if(this.autocompleteOptions) {
                this.filteredAutocompleteOptions$ = new BehaviorSubject<string[]>(Array.isArray(this.autocompleteOptions) ? this.autocompleteOptions : []);
            } else {
                this.filteredAutocompleteOptions$ = undefined;
            }
        }
    }

    add(ev: MatChipInputEvent) {
        ev.chipInput!.clear();
        this.addValue((ev.value || '').trim());
    }

    remove(item: string, itemIndex: number) {
        const currentValues = this.value;
        currentValues.splice(itemIndex, 1);
        this.onChange(currentValues);
        this.setTouched();
        this.changeDetector.markForCheck();
        this.stateChanges.next();
    }

    selected(event: MatAutocompleteSelectedEvent) {
        this.tagInput.nativeElement.value = '';
        this.addValue(event.option.viewValue);
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    setTouched() {
        if (!this.touched) {
            this.onTouched();
        }
    }

    setDescribedByIds(): void {
    }

    onContainerClick(): void {
        this.setTouched();
    }

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

    get empty() {
        return this.value.length === 0 && this.tagInput?.nativeElement.value === '';
    }

    get shouldLabelFloat() {
        return this.focused || !this.empty;
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    writeValue(value: string[] | null): void {
        if (value === null) {
            this.value = [];
        } else if (Array.isArray(value)) {
            this.value = value || [];
        } else {
            throw new Error('TagEditorComponent input value must be an array!');
        }

        this.changeDetector.markForCheck();
        this.stateChanges.next();
    }

    private addValue(value: string) {
        const currentValues = this.value;
        if (value && currentValues.indexOf(value) === -1) {
            currentValues.push(value);
            this.onChange(currentValues);
            this.stateChanges.next();
        }
    }

    ngOnDestroy() {
        this.componentDestroyed$.next();
        this.componentDestroyed$.complete();
        this.fm.stopMonitoring(this.elRef.nativeElement);
        this.stateChanges.complete();
    }
}
