import { SceneManager } from './SceneManager.js';
import { DataManager } from './DataManager.js';
import { PeriodicTableComponent } from './PeriodicTableComponent.js';
import { SpectrumDisplayComponent } from './SpectrumDisplayComponent.js';
import { InteractionController } from './InteractionController.js';

async function init() {
    const loadingDiv = document.getElementById('loading');
    const appContainer = document.getElementById('app-container');

    try {
        // Initialize DataManager and load spectral data
        const dataManager = new DataManager();
        await dataManager.loadSpectralData('spectral-data.json');

        // Initialize SceneManager
        const container = document.getElementById('canvas-container');
        const sceneManager = new SceneManager(container);
        
        if (!sceneManager.initialize()) {
            throw new Error('Failed to initialize WebGL');
        }

        // Create PeriodicTableComponent
        const periodicTable = new PeriodicTableComponent(
            sceneManager.getScene(),
            dataManager
        );
        periodicTable.createPeriodicTable();

        // Create SpectrumDisplayComponent
        const spectrumDisplay = new SpectrumDisplayComponent(dataManager);

        // Create InteractionController
        const interactionController = new InteractionController(
            sceneManager,
            periodicTable,
            spectrumDisplay
        );
        interactionController.initialize();

        // Start animation loop
        sceneManager.start();

        // Hide loading indicator
        loadingDiv.style.display = 'none';
        appContainer.style.display = 'block';

    } catch (error) {
        console.error('Initialization error:', error);
        loadingDiv.innerHTML = `
            <div style="color: #ff6b6b;">
                <h2>Failed to Load Application</h2>
                <p>${error.message}</p>
                <p>Please refresh the page to try again.</p>
            </div>
        `;
    }
}

// Start the application when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
