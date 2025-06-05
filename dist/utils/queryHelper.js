export function pickKey(base, keys) {
    const entries = keys.map((key) => [key, base[key]]);
    return Object.fromEntries(entries);
}
//# sourceMappingURL=queryHelper.js.map