'use strict';

class ResultsController {
    constructor(params = {}) {
        this.params = params;

        // Handlebars templates
        this.tpl = require('../../templates/results.hbs');
    }

    render() {
        let div = document.createElement('div');
        div.classList.add('results-container');
        if (this.params.winner) {
            div.classList.add('player-'+ this.params.winner.id);
        }
        div.innerHTML = this.tpl(this.params);

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

export default ResultsController;