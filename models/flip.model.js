export class CardGenerator {
    generatePairs(totalPairs = 10) {
        const base = Array.from({ length: totalPairs }, (_, i) => i + 1);
        const cards = [...base, ...base];
        for (let i = cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const tmp = cards[i];
            cards[i] = cards[j];
            cards[j] = tmp;
        }
        return cards;
    }
}
//# sourceMappingURL=flip.model.js.map