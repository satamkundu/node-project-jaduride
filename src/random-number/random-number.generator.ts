export function* randomNumberGenerator(): Generator<number> {
    while (true) {
        yield Math.floor(Math.random() * 101);
    }
}