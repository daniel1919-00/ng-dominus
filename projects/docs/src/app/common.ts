export function timeoutAsync(ms: number) {
    return new Promise<void>(resolve => { setTimeout(resolve, ms); });
}
