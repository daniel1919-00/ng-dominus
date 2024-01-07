import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    standalone: true,
    name: 'dmFileSize'
})
export class DmFileSizePipe implements PipeTransform {
    /**
     * Converts bytes to a human-readable string
     * @param bytes
     * @param threshold Threshold after which the unit is increased. e.g. 1024B -> 1KB
     * @param digits The number of fraction digits shown. E.g. 2.25MB
     */
    transform(bytes: number, threshold = 1024, digits = 2): string {
        if (Math.abs(bytes) < threshold) {
            return bytes + ' bytes';
        }

        const units = ['kB', 'MB', 'GB', 'TB', 'PB'];
        const maxUnits = units.length - 1;
        let unit = -1;
        const ra = 10 ** 1;

        do {
            bytes /= threshold;
            ++unit;
        } while (Math.round(Math.abs(bytes) * ra) / ra >= threshold && unit < maxUnits);

        return bytes.toFixed(2) + ' ' + units[unit];
    }
}
