import './popover.css'

export class Popover {
    constructor() {
        window.addEventListener('resize', this.recalculatingSizes)
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
        const element = e.target

        const { top, right, width } = element.getBoundingClientRect();
        popover.style.width = width + 70 + 'px';
        popover.style.top = top - popover.offsetHeight - 10 + 'px';
        popover.style.right = right - popover.offsetWidth / 2 - element.offsetWidth / 2 + 'px';

        const arrow = this.renderArrow(popover);
        popover.appendChild(arrow);

        return popover;
    }

    recalculatingSizes() {
        const popover = document.querySelector('.popover');
        const element = document.querySelector('.button');
        const { top, right, width } = element.getBoundingClientRect();
        if (popover) {
            popover.style.width = width + 70 + 'px';
            popover.style.top = top - popover.offsetHeight - 10 + 'px';
            popover.style.right = right - popover.offsetWidth / 2 - element.offsetWidth / 2 + 'px';
        }
    }

    renderArrow(popover) {
        const arrow = document.createElement('div');
        arrow.classList.add('arrow');
        arrow.style.left = popover.offsetWidth / 2 - 10 + 'px';

        return arrow;
    }

    removePopover() {
        const popover = document.querySelector('.popover');
        if (popover) {
            popover.remove();
        }
    }
}