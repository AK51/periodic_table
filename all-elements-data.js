// Complete periodic table data with cosmic origins and spectral lines
// This will be integrated into index.html

const ALL_ELEMENTS = [
    // Period 1
    { symbol: "H", name: "Hydrogen", atomicNumber: 1, category: "nonmetal", row: 1, col: 1,
      cosmicOrigin: "Big Bang", originColor: "#FFD700",
      astronomyInfo: "The most abundant element in the universe, created during the Big Bang 13.8 billion years ago. Hydrogen makes up about 75% of all normal matter and is the fuel that powers stars through nuclear fusion.",
      spectralLines: [{ wavelength: 656.3, intensity: 1.0 }, { wavelength: 486.1, intensity: 0.5 }, { wavelength: 434.0, intensity: 0.3 }, { wavelength: 410.2, intensity: 0.2 }]},
    
    { symbol: "He", name: "Helium", atomicNumber: 2, category: "noble-gas", row: 1, col: 18,
      cosmicOrigin: "Big Bang", originColor: "#FFD700",
      astronomyInfo: "The second most abundant element in the universe, primarily created during the Big Bang. Also produced by nuclear fusion in stars.",
      spectralLines: [{ wavelength: 587.6, intensity: 1.0 }, { wavelength: 667.8, intensity: 0.3 }, { wavelength: 501.6, intensity: 0.4 }]},
    
    // Period 2
    { symbol: "Li", name: "Lithium", atomicNumber: 3, category: "alkali-metal", row: 2, col: 1,
      cosmicOrigin: "Cosmic Ray & Dying Stars", originColor: "#9370DB",
      astronomyInfo: "Created through multiple processes: some from the Big Bang, most from dying low-mass stars, and some isotopes from cosmic ray collisions.",
      spectralLines: [{ wavelength: 670.8, intensity: 1.0 }, { wavelength: 610.4, intensity: 0.3 }]},
    
    { symbol: "Be", name: "Beryllium", atomicNumber: 4, category: "alkaline-earth", row: 2, col: 2,
      cosmicOrigin: "Cosmic Ray Fission", originColor: "#9370DB",
      astronomyInfo: "Created by cosmic ray spallation - when high-energy cosmic rays collide with heavier elements in space, breaking them apart.",
      spectralLines: [{ wavelength: 234.9, intensity: 1.0 }, { wavelength: 313.0, intensity: 0.4 }]},
