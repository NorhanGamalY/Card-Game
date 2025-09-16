export class CardGenerator {
  generatePairs(totalPairs: number = 10): number[] {
    const base: number[] = Array.from({ length: totalPairs }, (_, i) => i + 1); 
    const cards: number[] = [...base, ...base]; 

    for (let i = cards.length - 1; i > 0; i--) {
      const j: number = Math.floor(Math.random() * (i + 1));
    const tmp = cards[i]!;
      cards[i] = cards[j]!;
      cards[j] = tmp;    }
    return cards;
  }
}
