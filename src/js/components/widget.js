import './widget.css'

export class Widget {
    constructor() {
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

    showPopover() {
        if (this.hasPopover === false) {
            this.renderPopover()
            this.hasPopover = true;
        } else {
            this.removePopover()
            this.hasPopover = false;
        }
    }

    renderPopover(e) {
        const popover = document.createElement('div');
        popover.classList.add('popover');

        const popoverTitle = document.createElement('h2');
        popoverTitle.classList.add('popover-title');
        popoverTitle.textContent = 'Popover title';

        const popoverText = document.createElement('p');
        popoverText.classList.add('popover-text');
        popoverText.textContent = 'And here`s some amazing content. It`s very engaging. Right?';

        document.body.appendChild(popover);
        popover.appendChild(popoverTitle);
        popover.appendChild(popoverText);

        return popover;
    }

    removePopover() {
        const popover = document.querySelector('.popover')
        if (popover) {
            popover.remove();
        }
    }
}