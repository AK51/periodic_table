import * as THREE from 'three';

export function wavelengthToRGB(wavelength) {
    let r, g, b;
    
    if (wavelength >= 380 && wavelength < 440) {
        r = -(wavelength - 440) / (440 - 380);
        g = 0.0;
        b = 1.0;
    } else if (wavelength >= 440 && wavelength < 490) {
        r = 0.0;
        g = (wavelength - 440) / (490 - 440);
        b = 1.0;
    } else if (wavelength >= 490 && wavelength < 510) {
        r = 0.0;
        g = 1.0;
        b = -(wavelength - 510) / (510 - 490);
    } else if (wavelength >= 510 && wavelength < 580) {
        r = (wavelength - 510) / (580 - 510);
        g = 1.0;
        b = 0.0;
    } else if (wavelength >= 580 && wavelength < 645) {
        r = 1.0;
        g = -(wavelength - 645) / (645 - 580);
        b = 0.0;
    } else if (wavelength >= 645 && wavelength <= 750) {
        r = 1.0;
        g = 0.0;
        b = 0.0;
    } else {
        r = 0.0;
        g = 0.0;
        b = 0.0;
    }
    
    // Apply intensity correction for edge wavelengths
    let factor;
    if (wavelength >= 380 && wavelength < 420) {
        factor = 0.3 + 0.7 * (wavelength - 380) / (420 - 380);
    } else if (wavelength >= 420 && wavelength <= 700) {
        factor = 1.0;
    } else if (wavelength > 700 && wavelength <= 750) {
        factor = 0.3 + 0.7 * (750 - wavelength) / (750 - 700);
    } else {
        factor = 0.0;
    }
    
    // Apply gamma correction
    const gamma = 0.80;
    r = Math.pow(r * factor, gamma);
    g = Math.pow(g * factor, gamma);
    b = Math.pow(b * factor, gamma);
    
    return new THREE.Color(r, g, b);
}

export function getSpectrumColor(wavelength) {
    if (wavelength < 380) {
        // UV - use violet with reduced opacity
        return { color: new THREE.Color(0x9400D3), opacity: 0.5 };
    } else if (wavelength > 750) {
        // IR - use dark red with reduced opacity
        return { color: new THREE.Color(0x8B0000), opacity: 0.5 };
    } else {
        // Visible spectrum
        return { color: wavelengthToRGB(wavelength), opacity: 1.0 };
    }
}
