'use strict';

class PlayerChoiceController {
    constructor(params = {}) {
        this.params = params;

        // Handlebars templates
        this.tpl = require('../../templates/player-choice.hbs');
    }

    render() {
        let div = document.createElement('div');
        div.innerHTML = this.tpl(this.params);

        this.choices = div.querySelector('.player-choices');
        this.choices.addEventListener('click', this.choiceHandler.bind(this));

        return div;
    }

    destroy() {
        this.choices.removeEventListener('click', this.choiceHandler);
    }

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