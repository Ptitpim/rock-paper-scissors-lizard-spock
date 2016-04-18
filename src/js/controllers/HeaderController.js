'use strict';

/**
 * Header Controller
 */
class HeaderController {
    /**
     * Contructor
     *
     * @param {Object} el - DOM element
     * @param {Object} params - parameters for render
     */
    constructor(el, params = {}) {
        this.el = el;
        this.params = params;

        // Handlebars templates
        this.tpl = require('../../templates/header.hbs');
    }

    /**
     * Render the view
     */
    render() {
        this.el.innerHTML = this.tpl({
            players: this.params
        });
    }

    /**
     * Update the view with the new score
     *
     * @param {Object} params - parameters for render
     */
    updateScore(params) {
        this.params = params;
        this.render();
    }
}

export default HeaderController;