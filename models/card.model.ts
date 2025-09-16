import { CardGenerator } from "./flip.model.js";
import { AudioService } from "./audio.service.js";

type ImgEl = HTMLImageElement;

export class Cards {
  private readonly container: HTMLElement | null
  private mapping: number[] = []
  private readonly source = "./images"
  private readonly flipSrc = "./images/flip.jpeg"
  private card1: ImgEl | null = null
  private card2: ImgEl | null = null
  private readonly totalPairs = 10
  private match = 0
  private music: HTMLAudioElement | null = null
  private matchS: HTMLAudioElement | null = null
  private unmatchS: HTMLAudioElement | null = null
  private flipSound: HTMLAudioElement | null = null
  private progressEl: HTMLProgressElement | null = null
  private audio!: AudioService

  constructor() {
    this.container = document.getElementById("container")
    this.music = document.getElementById("bg-music") as HTMLAudioElement | null
    this.matchS = document.getElementById("match-sound") as HTMLAudioElement | null
    this.unmatchS = document.getElementById("unmatch-sound") as HTMLAudioElement | null
    this.flipSound = document.getElementById("flip-sound") as HTMLAudioElement | null
    this.progressEl = document.getElementById("game-progress") as HTMLProgressElement | null

    this.audio = new AudioService(this.music, this.matchS, this.unmatchS, this.flipSound)

    this.init()
  }

  private init(): void {
    const gen = new CardGenerator();
    this.mapping = gen.generatePairs(this.totalPairs);
    this.match = 0;
    this.prog(0);
    this.renderImages();
    this.clicks();
  }

  private renderImages(): void {
    if (!this.container) return;
    this.container.innerHTML = "";

    for (let i = 0; i < this.mapping.length; i++) {
      const img: ImgEl = document.createElement("img");
      img.id = String(i + 1);
      img.alt = "card";
      img.src = this.flipSrc;
      img.dataset.index = String(i);
      img.dataset.flipped = "false";
      img.style.cursor = "pointer";
      this.container.appendChild(img);
    }
  }

  private clicks(): void {
    for (let i = 0; i < this.mapping.length; i++) {
      const el = document.getElementById(String(i + 1)) as ImgEl | null;
      if (el) el.addEventListener("click", () => this.change(el));
    }
  }

  private changeSrc(pairNumber: number): string {
    return `${this.source}/${pairNumber}.jpeg`;
  }

  private flipU(elem: ImgEl): void {
    const idx = Number(elem.dataset.index);
    const pairNum: number = this.mapping[idx];
    elem.src = this.changeSrc(pairNum);
    elem.dataset.flipped = "true";
  }

  private flipD(elem: ImgEl): void {
    elem.src = this.flipSrc;
    elem.dataset.flipped = "false";
  }

  private isMatched(elem: ImgEl): boolean {
    return elem.dataset.matched === "true"
  }

  private markMatched(a: ImgEl, b: ImgEl): void {
    a.dataset.matched = "true"
    b.dataset.matched = "true"
    a.style.pointerEvents = "none"
    b.style.pointerEvents = "none"
  }

  private clear(): void {
    this.card1 = null
    this.card2 = null
  }

  private prog(percent?: number): void {
    const p = typeof percent === "number"
      ? Math.max(0, Math.min(100, percent))
      : Math.round((this.match / this.totalPairs) * 100)
    if (this.progressEl) this.progressEl.value = p
  }

  private change(elem: ImgEl): void {
    this.audio.flip(true);
    this.audio.ensureMusicStarted()

    if (this.isMatched(elem)) return
    if (elem === this.card1) return
    if (this.card1 && this.card2) return

    this.flipU(elem)

    if (!this.card1) {
      this.card1 = elem
      return
    }

    if (!this.card2) {
      this.card2 = elem

      const same = this.card1.src === this.card2.src && this.card1 !== this.card2

      if (same) {
        this.audio.match()
        this.markMatched(this.card1, this.card2)
        this.match += 1
        this.prog()
        this.clear()

      } else {
        this.audio.unmatch()

        const first: ImgEl = this.card1
        const second: ImgEl = this.card2
        window.setTimeout(() => {
          this.flipD(first)
          this.flipD(second)
          this.clear()
        }, 1000);
      }
    }
  }
}
