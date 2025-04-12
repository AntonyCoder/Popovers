import './widget.css'
import { Popover } from '../popover/popover';

export class Widget {
    constructor() {
        this.popover = new Popover();
        this.hasPopover = false;
        this.showPopover = this.showPopover.bind(this);
    }


    renderWidget() {
        const button = document.createElement('a');
        button.classList.add('button');
        button.textContent = 'Click to toggle popover';

        document.body.appendChild(button);

        button.addEventListener('click', this.showPopover);
    }

    showPopover(e) {
        if (this.hasPopover === false) {
            this.popover.renderPopover(e);
            this.hasPopover = true;
        } else {
            this.popover.removePopover();
            this.hasPopover = false;
        }
    }
}