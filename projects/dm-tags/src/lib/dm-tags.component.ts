import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    Input,
    OnChanges,
    OnDestroy,
    Optional,
    Self,
    SimpleChanges,
    ViewChild
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatFormFieldControl} from "@angular/material/form-field";
import {BehaviorSubject, startWith, Subject, Subscription} from "rxjs";
import {ENTER} from "@angular/cdk/keycodes";
import {MatChipInputEvent, MatChipsModule} from "@angular/material/chips";
import {MatAutocompleteModule, MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {MatIconModule} from "@angular/material/icon";
import {FocusMonitor, FocusOrigin} from "@angular/cdk/a11y";
import {NgControl} from "@angular/forms";
import {CustomAngularMaterialFormControl} from "../shared/custom-angular-material-form-control";

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
    styles: ``,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DmTagsComponent extends CustomAngularMaterialFormControl<string[]> implements OnChanges, OnDestroy {
    static nextId = 0;

    readonly id = `dm-tags-${DmTagsComponent.nextId++}`;

    /**
     * If set then an autocomplete list is appended to the tags input.
     * Can be a function that will be called initially and whenever the users inputs text, and should return a promise with the filtered list items.
     */
    @Input() autocompleteOptions?: string[] | ((searchString: string) => Promise<string[]>);
    /**
     * Keycode presses to add the current input string as a tag
     */
    @Input() addOnKeycodes: number[] = [ENTER];
    /**
     * Add the current input string on element blur.
     * This is ignored when autocomplete options are shown, since the input loses focus when selecting the options.
     */
    @Input() addOnBlur: boolean = true;
    /**
     * Whether duplicate values are allowed
     */
    @Input() allowDuplicates: boolean = false;
    /**
     * Function that returns true to allow the item or false to reject it
     */
    @Input() onBeforeAdd?: (item: string) => boolean;

    /**
     * Function that returns true to allow the deletion or false to reject it
     */
    @Input() onBeforeRemove?: (item: string) => boolean;

    protected filteredAutocompleteOptions$ = new BehaviorSubject<string[]>([]);

    @ViewChild('tagInput') private readonly tagInput?: ElementRef;
    private _value: string[] = [];
    private autocomplete$?: Subject<string>;
    private autocompleteSub?: Subscription;

    constructor(
        @Optional() @Self() ngControl: NgControl,
        selfElementRef: ElementRef,
        focusMonitor: FocusMonitor,
    ) {
        super(ngControl, focusMonitor, selfElementRef);
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['value'] && !changes['value'].firstChange) {
            this.onChange(this._value);
        }

        if (changes['autocompleteOptions']) {
            if (!changes['autocompleteOptions'].firstChange) {
                this.autocompleteSub?.unsubscribe();
            }

            if (this.autocompleteOptions) {
                this.autocomplete$ = new Subject<string>();

                this.autocompleteSub = this.autocomplete$.pipe(startWith('')).subscribe((searchString) => {
                    if (Array.isArray(this.autocompleteOptions)) {
                        if (searchString === '') {
                            this.filteredAutocompleteOptions$.next(this.autocompleteOptions);
                            return;
                        }

                        this.filteredAutocompleteOptions$.next(this.autocompleteOptions.filter(item => item.includes(searchString)));
                        return;
                    }

                    this.autocompleteOptions && this.autocompleteOptions(searchString).then(results => this.filteredAutocompleteOptions$.next(results));
                });
            } else {
                this.autocomplete$ = undefined;
            }
        }
    }

    override onContainerClick(): void {
        super.onContainerClick();
        this.tagInput && (this.tagInput.nativeElement as HTMLInputElement).focus();
    }

    @Input()
    set value(val: string[] | null) {
        this._value = val || [];
        this.stateChanges.next();
    }

    get value(): string[] {
        return this._value;
    }

    get empty() {
        return this.value.length === 0 && (this.tagInput?.nativeElement.value || '') === '';
    }

    protected add(ev: MatChipInputEvent) {
        const value = (ev.value || '').trim();
        ev.chipInput!.clear();

        if (this.onBeforeAdd && !this.onBeforeAdd(value)) {
            return;
        }

        this.addValue(value);
    }

    protected remove(item: string, itemIndex: number) {
        if (this.onBeforeRemove && !this.onBeforeRemove(item)) {
            return;
        }

        const currentValues = this.value;
        currentValues.splice(itemIndex, 1);
        this.onChange(currentValues);
        this.controlTouched();
        this.stateChanges.next();
    }

    protected selected(event: MatAutocompleteSelectedEvent) {
        if (this.tagInput) {
            this.tagInput.nativeElement.value = '';
        }
        this.addValue(event.option.viewValue);
        this.autocomplete$?.next('');
    }

    protected autoComplete(event: KeyboardEvent) {
        const value = (event.target as HTMLInputElement)?.value || '';
        this.autocomplete$?.next(value.trim().toLowerCase());
    }

    private addValue(value: string) {
        if (!value) {
            return;
        }

        const currentValues = this.value;
        if (!this.allowDuplicates && currentValues.indexOf(value) !== -1) {
            return;
        }

        currentValues.push(value);
        this.onChange(currentValues);
        this.stateChanges.next();
    }

    protected override onFocusLost(origin: FocusOrigin) {
        if (this.addOnBlur && !this.filteredAutocompleteOptions$.getValue().length) {
            const tagInputEl: HTMLInputElement = this.tagInput?.nativeElement;
            if (tagInputEl) {
                const value = tagInputEl.value.trim();
                if (value !== '') {
                    tagInputEl.value = '';
                    this.addValue(value);
                }
            }
        }

        super.onFocusLost(origin);
    }

    override ngOnDestroy() {
        super.ngOnDestroy();
        this.autocompleteSub?.unsubscribe();
    }
}
