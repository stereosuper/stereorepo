import { TimelineMax } from 'gsap';

class Sprite {
    constructor({
        image,
        columns,
        rows,
        interval,
        parent,
        loop = false,
        numberEmpty = 0,
    }) {
        this.parent = parent;
        this.image = image;
        this.looped = loop;
        this.cols = columns;
        this.rows = rows;
        this.gridWidth = 100 / (this.cols - 1);
        this.gridHeight = 100 / (this.rows - 1);
        this.interval = interval;

        this.numberEmpty = numberEmpty;

        this.shouldStop = false;

        this.tl = new TimelineMax({
            paused: true,
            repeat: this.looped ? -1 : 0,
            onRepeat: this.checkShouldStop,
            onRepeatScope: this,
        });

        let count = 0;
        let xpos;
        let ypos;

        for (let r = 0; r < this.rows; r += 1) {
            const cols =
                r === this.rows - 1 ? this.cols - this.numberEmpty : this.cols;

            for (let c = 0; c < cols; c += 1) {
                xpos = c * this.gridWidth;
                ypos = r * this.gridHeight;
                this.tl.set(
                    this.image,
                    { backgroundPosition: `${xpos}% ${ypos}%` },
                    count * this.interval
                );
                count += 1;
            }
        }
    }
    reInit() {
        this.tl.pause(0);
    }
    play() {
        this.tl.play();
    }
    pause() {
        this.tl.pause();
    }
    stopAtEnd() {
        this.shouldStop = true;
    }
    checkShouldStop() {
        if (this.shouldStop) {
            this.pause();
            this.parent.startVideoMiddle();
        } else {
            this.tl.resume();
        }
    }
}

export default Sprite;
