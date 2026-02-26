import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export class InteractionController {
    constructor(sceneManager, periodicTable, spectrumDisplay) {
        this.sceneManager = sceneManager;
        this.periodicTable = periodicTable;
        this.spectrumDisplay = spectrumDisplay;
        this.controls = null;
        this.renderer = sceneManager.getRenderer();
        this.camera = sceneManager.getCamera();
    }

    initialize() {
        // Set up OrbitControls
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
        this.controls.minDistance = 10;
        this.controls.maxDistance = 50;
        this.controls.enablePan = true;

        // Mouse move for hover
        this.renderer.domElement.addEventListener('mousemove', (e) => this.onMouseMove(e));

        // Click for selection
        this.renderer.domElement.addEventListener('click', (e) => this.onClick(e));

        // ESC key for deselection
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.deselectElement();
            }
        });

        // Update controls in animation loop
        this.updateControls();
    }

    onMouseMove(event) {
        const rect = this.renderer.domElement.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

        const element = this.periodicTable.getElementAtPosition(x, y, this.camera);
        
        if (element) {
            this.renderer.domElement.style.cursor = 'pointer';
            this.periodicTable.highlightElement(element);
        } else {
            this.renderer.domElement.style.cursor = 'default';
            this.periodicTable.highlightElement(null);
        }
    }

    onClick(event) {
        const rect = this.renderer.domElement.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

        const element = this.periodicTable.getElementAtPosition(x, y, this.camera);
        
        if (element) {
            this.periodicTable.selectElement(element);
            this.spectrumDisplay.showSpectrum(element);
        } else {
            this.deselectElement();
        }
    }

    deselectElement() {
        this.periodicTable.selectElement(null);
        this.spectrumDisplay.hideSpectrum();
    }

    updateControls() {
        const animate = () => {
            requestAnimationFrame(animate);
            if (this.controls) {
                this.controls.update();
            }
        };
        animate();
    }

    dispose() {
        if (this.controls) {
            this.controls.dispose();
        }
    }
}
