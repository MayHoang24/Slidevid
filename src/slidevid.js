function Slidevid(selector, options = {}) {
    this.container = document.querySelector(selector);
    if (!this.container) {
        console.error(`Slidevid: Container "${selector}" not found!`);
        return;
    }

    this.opt = Object.assign({}, options);
    this.slides = Array.from(this.container.children);

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
    console.log(step);
};
