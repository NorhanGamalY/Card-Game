export declare class Cards {
    readonly container: HTMLElement | null;
    mapping: number[];
    readonly imagesDir: string;
    readonly backSrc: string;
    card1: HTMLImageElement | null;
    card2: HTMLImageElement | null;
    readonly totalPairs: number;
    matchedPairs: number;
    music: HTMLAudioElement | null;
    matchSound: HTMLAudioElement | null;
    unmatchSound: HTMLAudioElement | null;
    musicStarted: boolean;
    flipSound: HTMLAudioElement | null;
    progressEl: HTMLProgressElement | null;
    constructor();
    playSound(snd: HTMLAudioElement | null, allowOverlap?: boolean): void;
    init(): void;
    renderImages(): void;
    bindClicks(): void;
    getFaceSrc(pairNumber: number): string;
    flipUp(elem: HTMLImageElement): void;
    flipDown(elem: HTMLImageElement): void;
    isMatched(elem: HTMLImageElement): boolean;
    markMatched(a: HTMLImageElement, b: HTMLImageElement): void;
    resetSelection(): void;
    updateProgress(percent?: number): void;
    change(elem: HTMLImageElement): void;
}
