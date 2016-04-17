'use strict';

class StartController {
    constructor() {
        // Handlebars templates
        this.startTpl = require('../../templates/start.hbs');
    }

    render() {
        let div = document.createElement('div');
        div.innerHTML = this.startTpl();

        this.startButton = div.querySelector('.button');
        this.startButton.addEventListener('click', this.startHandler);

        return div;
    }

    destroy() {
        this.startButton.removeEventListener('click', this.startHandler);
    }

    startHandler(e) {
        e.preventDefault();

        // Dispatch event
        let event;
        if (window.CustomEvent) {
            event = new CustomEvent('StartGame', {});
        } else {
            event = document.createEvent('CustomEvent');
            event.initCustomEvent('StartGame', true, true, {});
        }

        document.dispatchEvent(event);
    }
}

export default StartController;