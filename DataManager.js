export class DataManager {
    constructor() {
        this.elementsData = new Map();
    }

    async loadSpectralData(dataUrl) {
        try {
            const response = await fetch(dataUrl);
            if (!response.ok) {
                throw new Error(`Failed to load spectral data: ${response.statusText}`);
            }
            const data = await response.json();
            
            if (!this.validateData(data)) {
                throw new Error('Invalid spectral data format');
            }

            // Store elements in a Map for quick lookup
            data.elements.forEach(element => {
                this.elementsData.set(element.symbol, element);
            });

            return true;
        } catch (error) {
            console.error('Error loading spectral data:', error);
            throw error;
        }
    }

    getElementData(symbol) {
        return this.elementsData.get(symbol) || null;
    }

    getAllElements() {
        return Array.from(this.elementsData.keys());
    }

    validateData(data) {
        if (!data || !Array.isArray(data.elements)) {
            return false;
        }

        for (const element of data.elements) {
            if (!element.symbol || !element.name || !element.atomicNumber) {
                return false;
            }
            if (!Array.isArray(element.spectralLines)) {
                return false;
            }
        }

        return true;
    }

    validateWavelength(wavelength) {
        return wavelength >= 10 && wavelength <= 10000;
    }
}
