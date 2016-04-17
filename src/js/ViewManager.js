'use strict';

import StartController from './controllers/StartController';
import PlayerChoiceController from './controllers/PlayerChoiceController.js';
import ResultsController from './controllers/ResultsController.js';

class ViewManager {
    constructor(container) {
        this.currentController = null;
        this.controllers = {
            Start: StartController,
            PlayerChoice: PlayerChoiceController,
            Results: ResultsController
        };
        this.el = document.getElementById('content');
    }

    /**
     * Load Controller
     *
     * @param {String} controller - controller name
     * @param {Object} params - controller parameters
     */
    loadView(controller, params = {}) {
        console.info(`Load ${controller}Controller`);
        this.currentController = new this.controllers[controller](params);

        this.el.appendChild(this.currentController.render());
    }

    /**
     * Unload controller
     */
    unloadView() {
        this.currentController.destroy();
        this.el.innerHTML = '';
    }
}

export default ViewManager;