import { CardGenerator } from "./flip.model.js";
export class Cards {
    constructor() {
        this.mapping = []
        this.imagesDir = "./images"
        this.backSrc = "./images/flip.jpeg"
        this.card1 = null
        this.card2 = null
        this.totalPairs = 10
        this.matchedPairs = 0
        this.music = null
        this.matchS = null
        this.unmatchS = null
        this.musicStarted = false
        this.flipSound = null
        this.progressEl = null
        this.container = document.getElementById("container")
        this.music = document.getElementById("bg-music")
        this.matchS = document.getElementById("match-sound")
        this.unmatchS = document.getElementById("unmatch-sound")
        this.flipSound = document.getElementById("flip-sound")
        this.progressEl = document.getElementById("game-progress")
        this.init()
    }
    playSound(snd, allowOverlap = false) {
        if (!snd)
            return
        try {
            if (allowOverlap) {
                const s = snd.cloneNode(true)
                void s.play()
            }
            else {
                snd.currentTime = 0
                void snd.play()
            }
        }
        catch { }
    }
    init() {
        const gen = new CardGenerator()
        this.mapping = gen.generatePairs(this.totalPairs)
        this.matchedPairs = 0
        this.updateProgress(0)
        this.renderImages()
        this.bindClicks()
    }
    renderImages() {
        if (!this.container)
            return
        this.container.innerHTML = ""
        for (let i = 0; i < this.mapping.length; i++) {
            const img = document.createElement("img");
            img.id = String(i + 1)
            img.alt = "card"
            img.src = this.backSrc
            img.dataset.index = String(i)
            img.style.cursor = "pointer"
            this.container.appendChild(img)
        }
    }
    bindClicks() {
        for (let i = 0; i < this.mapping.length; i++) {
            const el = document.getElementById(String(i + 1))
            if (el)
                el.addEventListener("click", () => this.change(el))
        }
    }
    getFaceSrc(pairNumber) {
        return `${this.imagesDir}/${pairNumber}.jpeg`
    }
    flipUp(elem) {
        const idx = Number(elem.dataset.index)
        const pairNum = this.mapping[idx]
        elem.src = this.getFaceSrc(pairNum)
        elem.dataset.flipped = "true"
    }
    flipDown(elem) {
        elem.src = this.backSrc
        elem.dataset.flipped = "false"
    }
    isMatched(elem) {
        return elem.dataset.matched === "true"
    }
    markMatched(a, b) {
        a.dataset.matched = "true"
        b.dataset.matched = "true"
        a.style.pointerEvents = "none"
        b.style.pointerEvents = "none"
    }
    resetSelection() {
        this.card1 = null
        this.card2 = null
    }
    updateProgress(percent) {
        const p = typeof percent === "number"
            ? Math.max(0, Math.min(100, percent))
            : Math.round((this.matchedPairs / this.totalPairs) * 100)
        if (this.progressEl)
            this.progressEl.value = p
    }
    change(elem) {
        this.playSound(this.flipSound, true)
        this.flipUp(elem)
        if (this.music && !this.musicStarted) {
            this.music.play().catch(() => { })
            this.musicStarted = true
        }
        if (this.isMatched(elem))
            return
        if (elem === this.card1)
            return
        if (this.card1 && this.card2)
            return
        this.flipUp(elem);
        if (!this.card1) {
            this.card1 = elem;
            return;
        }
        if (!this.card2) {
            this.card2 = elem;
            const same = this.card1.src === this.card2.src && this.card1 !== this.card2;
            if (same) {
                if (this.matchS) {
                    this.matchS.currentTime = 0;
                    this.matchS.play().catch(() => { });
                }
                this.markMatched(this.card1, this.card2);
                this.matchedPairs += 1
                this.updateProgress()
                if (this.matchedPairs === this.totalPairs) {
                }
                this.resetSelection()
            }
            else {
                if (this.unmatchS) {
                    this.unmatchS.currentTime = 0
                    this.unmatchS.play().catch(() => { })
                }
                const first = this.card1
                const second = this.card2;
                window.setTimeout(() => {
                    this.flipDown(first)
                    this.flipDown(second)
                    this.resetSelection()
                }, 1000)
            }
        }
    }
}
//# sourceMappingURL=card.model.js.map