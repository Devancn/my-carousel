import { createElement, Text, Wrapper } from './createElement'

import { Timeline, Animation } from './animation'
import { ease } from './cubicBezier'

// import { Carousel } from './carousel.view';

class Carousel {
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

let component = <Carousel data={[
    "https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg",
    "https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg",
    "https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg",
    "https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg",
]} />


component.mountTo(document.body)