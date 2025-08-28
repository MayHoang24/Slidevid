function Slidevid(selector, options = {}) {
    this.container = document.querySelector(selector);
    if (!this.container) {
        console.error(`Slidevid: Container "${selector}" not found!`);
        return;
    }

    this.opt = Object.assign(
        {
            items: 1,
            loop: false,
        },
        options
    );
    this.slides = Array.from(this.container.children);
    this.currentIndex = 0;

    this._init();
}

Slidevid.prototype._init = function () {
    this.container.classList.add("slidevid-wrapper");

    this._createTrack();
    this._createNavigation();
};

Slidevid.prototype._createTrack = function () {
    this.track = document.createElement("div");
    this.track.className = "slidevid-track";
    this.slides.forEach((slide) => {
        slide.className = "slidevid-slide";
        slide.style.flexBasis = `calc(100% / ${this.opt.items})`;
        this.track.appendChild(slide);
    });

    this.container.appendChild(this.track);
};

Slidevid.prototype._createNavigation = function () {
    this.prevBtn = document.createElement("button");
    this.prevBtn.className = "slidevid-prev";
    this.prevBtn.textContent = "Prev";

    this.nextBtn = document.createElement("button");
    this.nextBtn.className = "slidevid-next";
    this.nextBtn.textContent = "Next";

    this.container.append(this.prevBtn, this.nextBtn);

    this.prevBtn.onclick = () => this.moveSlide(-1);
    this.nextBtn.onclick = () => this.moveSlide(1);
};

Slidevid.prototype.moveSlide = function (step) {
    if (this.opt.loop) {
        this.currentIndex =
            (this.currentIndex + step + this.slides.length) %
            this.slides.length;
    } else {
        this.currentIndex = Math.min(
            Math.max(this.currentIndex + step, 0),
            this.slides.length - this.opt.items
        );
    }

    this.offset = -(this.currentIndex * (100 / this.opt.items));

    this.track.style.transform = `translateX(${this.offset}%)`;
};
