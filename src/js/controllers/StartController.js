'use strict';

/**
 * Start Controller
 */
class StartController {
    constructor() {
        // Handlebars templates
        this.startTpl = require('../../templates/start.hbs');
    }

    /**
     * Render the view
     *
     * @returns {Object} - DOM element
     */
    render() {
        let div = document.createElement('div');
        div.classList.add('start');
        div.innerHTML = this.startTpl();

        this.startButton = div.querySelector('.button');
        this.startButton.addEventListener('click', this.startHandler);

        return div;
    }

    /**
     * Destroy the view
     */
    destroy() {
        this.startButton.removeEventListener('click', this.startHandler);
    }

    /**
     * Start button handler
     *
     * @param {Event} e - DOM event
     */
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