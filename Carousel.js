import { createElement, Text, Wrapper } from './createElement'

import { Timeline, Animation } from './animation'
import { ease } from './cubicBezier'


export class Carousel {
    constructor(config) {
        this.children = [];
        this.attributes = new Map();
        this.properties = new Map();
    }

    setAttribute(name, value) {
        this[name] = value;
    }

    appendChild(child) {
        this.children.push(child)
    }
    render() {
        let timeLine = new Timeline;
        timeLine.start();

        let position = 0;

        let nextPicStopHandler = null

        let children = this.data.map((url, currentPosition) => {
            let lastPosition = (currentPosition - 1 + this.data.length) % this.data.length;
            let nextPosition = (currentPosition + 1) % this.data.length;


            let offset = 0;

            let onStart = () => {
                timeLine.pause()
                clearTimeout(nextPicStopHandler)

                let currentElement = children[currentPosition];
                let currentTransformValue = Number(currentElement.style.transform.match(/^translateX\(([\s\S]+)px\)/)[1]);
                offset = currentTransformValue + 500 * currentPosition;

            }
            let onPan = event => {
                let lastElement = children[lastPosition];
                let currentElement = children[currentPosition];
                let nextElement = children[nextPosition];

                let currentTransformValue = -500 * currentPosition + offset;
                let lastTransformValue = - 500 - 500 * lastPosition + offset;
                let nextTransformValue = 500 - 500 * nextPosition + offset;

                let dx = event.clientX - event.startX;
                lastElement.style.transform = `translateX(${lastTransformValue + dx}px)`;
                currentElement.style.transform = `translateX(${currentTransformValue + dx}px)`;
                nextElement.style.transform = `translateX(${nextTransformValue + dx}px)`;
            }
            let element = <img src={url} onStart={onStart} onPan={onPan} enableGesture={true} />;
            element.style.transform = "translateX(0px)"
            element.addEventListener("dragstart", event => event.preventDefault())
            return element
        })



        let nextPic = () => {
            let nextPosition = (position + 1) % this.data.length;

            let current = children[position];
            let next = children[nextPosition]

            let currentAnimation = new Animation(current.style, "transform",
                -100 * position,
                -100 - 100 * position,
                500, 0, ease, v => `translateX(${5 * v}px)`
            );
            let nextAnimation = new Animation(next.style, "transform",
                100 - 100 * nextPosition,
                -100 * nextPosition,
                500, 0, ease, v => `translateX(${5 * v}px)`
            );

            timeLine.add(currentAnimation);
            timeLine.add(nextAnimation);

            position = nextPosition;
            nextPicStopHandler = setTimeout(nextPic, 3000)
        }
        nextPicStopHandler = setTimeout(nextPic, 3000)

        return <div class="carousel">
            {children}
        </div>;
    }
    mountTo(parent) {
        this.render().mountTo(parent)
    }

}
