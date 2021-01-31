/**
 * Constructs a valid answer for the game.
 * @returns a 4-tuple of unique digits
 */
export default function uniqueAnswer() {
    const r = [0, 0, 0, 0].map(() => Math.floor(Math.random() * 10));
    const u = new Set(r);
    if (u.size !== 4) {
        return uniqueAnswer();
    }
    return Array.from(u);
}