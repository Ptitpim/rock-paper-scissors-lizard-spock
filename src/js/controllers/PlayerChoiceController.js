'use strict';

/**
 * Player Choice Controller
 */
class PlayerChoiceController {
    constructor(params = {}) {
        this.params = params;

        // Handlebars templates
        this.tpl = require('../../templates/player-choice.hbs');
    }

    /**
     * Render the view
     *
     * @returns {Object} - DOM element
     */
    render() {
        let div = document.createElement('div');
        div.classList.add('player-choice-view');
        div.classList.add('player-'+ this.params.player.id);
        div.innerHTML = this.tpl(this.params);

        this.choices = div.querySelector('.player-choices');
        this.choices.addEventListener('click', this.choiceHandler.bind(this));

        return div;
    }

    /**
     * Destroy the view
     */
    destroy() {
        this.choices.removeEventListener('click', this.choiceHandler);
    }

    /**
     * Choice handler
     *
     * @param {Event} e - DOM event
     */
    choiceHandler(e) {
        e.preventDefault();

        if (e.target.nodeName === 'A') {
            this.choice = e.target.getAttribute('data-choice');
            this.params.player.choice = this.choice;
            this.params.player.choiceLabel = e.target.innerText;

            // Dispatch event
            let event;
            if (window.CustomEvent) {
                event = new CustomEvent('StoreChoice', {
                    detail: {
                        player: this.params.player
                    }
                });
            } else {
                event = document.createEvent('CustomEvent');
                event.initCustomEvent('StoreChoice', true, true, {
                    player: this.params.player
                });
            }

            document.dispatchEvent(event);
        }
    }
}

export default PlayerChoiceController;