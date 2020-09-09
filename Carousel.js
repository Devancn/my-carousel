import { createElement, Text, Wrapper } from './createElement'

import { Timeline, Animation } from './animation'
import { ease } from './cubicBezier'

export class Carousel {
    constructor(config) {
        this.children = [];
        this.attributes = new Map();
    }

    setAttribute(name, value) {
        this[name] = value;
    }

    appendChild(child) {
        this.children.push(child)
    }
    render() {
        let children = this.data.map(url => {
            let element = <img src={url} />;
            element.addEventListener("dragstart", event => event.preventDefault())
            return element
        })

        let position = 0;

        let timeLine = new Timeline;
        timeLine.start();

        let nextPic = () => {
            let nextPosition = (position + 1) % this.data.length;

            let current = children[position];
            let next = children[nextPosition]

            let currentAnimation = new Animation(current.style, "transform",
                -100 * position,
                -100 - 100 * position,
                500, 0, ease, v => `translateX(${v}%)`
            );
            let nextAnimation = new Animation(next.style, "transform",
                100 - 100 * nextPosition,
                -100 * nextPosition,
                500, 0, ease, v => `translateX(${v}%)`
            );

            timeLine.add(currentAnimation);
            timeLine.add(nextAnimation);

            position = nextPosition;
            setTimeout(nextPic, 3000)
        }
        setTimeout(nextPic, 3000)

        return <div class="carousel">
            {children}
        </div>;
    }
    mountTo(parent) {
        this.render().mountTo(parent)
    }

}
