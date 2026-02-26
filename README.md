# Periodic Table Spectrum Viewer

An interactive 3D periodic table with detailed emission spectrum visualization for all 118 elements.

<img width="1268" height="670" alt="main1" src="https://github.com/user-attachments/assets/5c36110f-ce15-42a0-9e6b-4c38393c565d" />
<img width="1038" height="642" alt="main2" src="https://github.com/user-attachments/assets/11568db1-c9c4-46b8-8b0f-1d2b4fa44677" />

Online website: https://huggingface.co/spaces/AK51/periodic_table

## Features

- **3D Interactive Periodic Table**: Explore all 118 elements in a beautiful 3D layout using Three.js
- **Emission Spectra**: View accurate emission spectra for each element
- **Detailed Spectrum Viewer**: Click on any spectrum to see an expanded view with:
  - Visible spectrum (380-750nm) with continuous color gradient
  - UV and IR regions for elements with lines outside visible range
  - Electron transition information
  - Wavelength labels and intensity data
- **Element Information**: 
  - Cosmic origin (how the element was created in the universe)
  - Chemistry properties and uses
  - Physics data (electron configuration, isotopes)
- **Color-Coded Categories**: Elements colored by type (metals, nonmetals, noble gases, etc.)
- **Hover Effects**: Elements pop forward when you hover over them
- **Collapsible Info Panel**: Full-height panel with collapsible sections

## How to Use

1. **Rotate**: Click and drag to rotate the periodic table
2. **Zoom**: Scroll to zoom in/out
3. **Select Element**: Click on any element to view its details
4. **View Detailed Spectrum**: Click on the emission spectrum graph to open a full-width detailed view
5. **Deselect**: Press ESC or click away to deselect

## Data Sources

- Spectral data from [NIST Atomic Spectra Database](https://www.nist.gov/pml/atomic-spectra-database)
- Cosmic origin information based on astrophysics research
- Chemistry and physics data from scientific databases

## Technology

- **Three.js**: 3D visualization
- **Vanilla JavaScript**: No framework dependencies
- **Canvas API**: Spectrum rendering
- **CSS3**: Modern styling and animations

## Credits

Created by Andy Kong

## License

MIT License - Feel free to use and modify for your own projects!



