import {Injector, Pipe, PipeTransform, ProviderToken} from '@angular/core';

@Pipe({
    name: 'dmTableRender',
    standalone: true
})
export class DmTableRenderPipe implements PipeTransform {
    constructor(private injector: Injector) {}

    transform(value: unknown, pipeToken: ProviderToken<any>, args: any[]): unknown {
        return this.injector.get(pipeToken).transform(value, ...args);
    }
}
