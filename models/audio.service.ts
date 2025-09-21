export class AudioService {
  musicStarted = false;

  constructor(
    public music: HTMLAudioElement | null,
    public matchS: HTMLAudioElement | null,
    public unmatchS: HTMLAudioElement | null,
    public tickS: HTMLAudioElement | null
  ) {}

  play(snd: HTMLAudioElement | null, allowOverlap = false): void {
    if (!snd) return;
    try {
      if (allowOverlap) {
        const s = snd.cloneNode(true) as HTMLAudioElement;
        void s.play()
      } else {
        snd.currentTime = 0;
        void snd.play();
      }
    } catch {}
  }

  ensureMusicStarted(): void {
    if (this.music && !this.musicStarted) {
      this.music.play().catch(() => {});
      this.musicStarted = true;
    }
  }

  flip(allowOverlap = true): void {
    this.play(this.tickS, allowOverlap);
  }

  match(): void {
    this.play(this.matchS)
  }

  unmatch(): void {
    this.play(this.unmatchS);
  }
}
