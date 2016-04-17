'use strict';

class HeaderController {
    constructor(el, params = {}) {
        this.el = el;
        this.params = params;

        // Handlebars templates
        this.tpl = require('../../templates/header.hbs');
    }

    render() {
        this.el.innerHTML = this.tpl({
            players: this.params
        });
    }

    updateScore(params) {
        this.params = params;
        this.render();
    }
}

export default HeaderController;