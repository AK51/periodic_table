import { getSpectrumColor } from './wavelengthUtils.js';

export class SpectrumDisplayComponent {
    constructor(dataManager) {
        this.dataManager = dataManager;
        this.infoPanel = document.getElementById('info-panel');
        this.elementName = document.getElementById('element-name');
        this.elementDetails = document.getElementById('element-details');
        this.spectrumContainer = document.getElementById('spectrum-container');
    }

    showSpectrum(symbol) {
        const elementData = this.dataManager.getElementData(symbol);
        
        if (!elementData) {
            this.showNoData(symbol);
            return;
        }

        // Update element info
        this.elementName.textContent = elementData.name;
        this.elementDetails.textContent = `Symbol: ${elementData.symbol} | Atomic Number: ${elementData.atomicNumber}`;

        // Create spectrum visualization
        this.createSpectralLines(elementData.spectralLines);

        // Show panel
        this.infoPanel.classList.remove('hidden');
    }

    hideSpectrum() {
        this.infoPanel.classList.add('hidden');
        this.spectrumContainer.innerHTML = '';
    }

    createSpectralLines(lines) {
        this.spectrumContainer.innerHTML = '';

        if (!lines || lines.length === 0) {
            this.spectrumContainer.innerHTML = '<p>No spectral data available</p>';
            return;
        }

        // Sort by intensity and limit to top 20
        const sortedLines = [...lines].sort((a, b) => (b.intensity || 0) - (a.intensity || 0));
        const displayLines = sortedLines.slice(0, 20);

        // Create canvas for spectrum
        const canvas = document.createElement('canvas');
        canvas.width = 360;
        canvas.height = 200;
        canvas.style.width = '100%';
        canvas.style.border = '1px solid rgba(255, 255, 255, 0.2)';
        canvas.style.borderRadius = '5px';
        
        const ctx = canvas.getContext('2d');
        
        // Draw background
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Find wavelength range
        const wavelengths = displayLines.map(l => l.wavelength);
        const minWave = Math.min(...wavelengths, 380);
        const maxWave = Math.max(...wavelengths, 750);
        const range = maxWave - minWave;

        // Draw wavelength scale
        ctx.fillStyle = '#666';
        ctx.font = '10px Arial';
        ctx.textAlign = 'center';
        for (let w = Math.ceil(minWave / 50) * 50; w <= maxWave; w += 50) {
            const x = ((w - minWave) / range) * (canvas.width - 40) + 20;
            ctx.fillRect(x, canvas.height - 20, 1, 10);
            ctx.fillText(w + 'nm', x, canvas.height - 5);
        }

        // Draw spectral lines
        displayLines.forEach(line => {
            const { color, opacity } = getSpectrumColor(line.wavelength);
            const x = ((line.wavelength - minWave) / range) * (canvas.width - 40) + 20;
            const height = (line.intensity || 0.5) * 140;

            ctx.fillStyle = `rgba(${Math.floor(color.r * 255)}, ${Math.floor(color.g * 255)}, ${Math.floor(color.b * 255)}, ${opacity})`;
            ctx.fillRect(x - 2, canvas.height - 30 - height, 4, height);

            // Draw wavelength label for prominent lines
            if (line.intensity > 0.5) {
                ctx.fillStyle = '#fff';
                ctx.font = '9px Arial';
                ctx.save();
                ctx.translate(x, canvas.height - 35 - height);
                ctx.rotate(-Math.PI / 2);
                ctx.fillText(line.wavelength.toFixed(1), 0, 0);
                ctx.restore();
            }
        });

        this.spectrumContainer.appendChild(canvas);

        // Add line details
        const detailsDiv = document.createElement('div');
        detailsDiv.style.marginTop = '10px';
        detailsDiv.style.fontSize = '12px';
        detailsDiv.style.maxHeight = '200px';
        detailsDiv.style.overflowY = 'auto';
        
        detailsDiv.innerHTML = '<h3 style="margin-bottom: 10px;">Spectral Lines:</h3>';
        
        displayLines.forEach(line => {
            const lineDiv = document.createElement('div');
            lineDiv.style.marginBottom = '5px';
            lineDiv.style.padding = '5px';
            lineDiv.style.background = 'rgba(255, 255, 255, 0.05)';
            lineDiv.style.borderRadius = '3px';
            
            const { color } = getSpectrumColor(line.wavelength);
            const colorBox = `<span style="display: inline-block; width: 12px; height: 12px; background: rgb(${Math.floor(color.r * 255)}, ${Math.floor(color.g * 255)}, ${Math.floor(color.b * 255)}); border: 1px solid #fff; margin-right: 5px;"></span>`;
            
            lineDiv.innerHTML = `${colorBox}${line.wavelength.toFixed(1)} nm (Intensity: ${(line.intensity || 0).toFixed(2)})${line.transition ? ' - ' + line.transition : ''}`;
            detailsDiv.appendChild(lineDiv);
        });

        this.spectrumContainer.appendChild(detailsDiv);
    }

    showNoData(symbol) {
        this.elementName.textContent = symbol;
        this.elementDetails.textContent = 'Element information';
        this.spectrumContainer.innerHTML = '<p>Spectral data not available for this element</p>';
        this.infoPanel.classList.remove('hidden');
    }
}
