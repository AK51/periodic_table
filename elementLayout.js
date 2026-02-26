export const ELEMENT_LAYOUT = {
    tileSize: 1.0,
    spacing: 0.1,
    
    // Simplified layout for the 10 elements we have data for
    positions: {
        "H": { row: 1, column: 1 },
        "He": { row: 1, column: 18 },
        "Li": { row: 2, column: 1 },
        "C": { row: 2, column: 14 },
        "N": { row: 2, column: 15 },
        "O": { row: 2, column: 16 },
        "Na": { row: 3, column: 1 },
        "Fe": { row: 4, column: 8 },
        "Cu": { row: 4, column: 11 },
        "Au": { row: 6, column: 11 }
    }
};

export const ELEMENT_COLORS = {
    "metal": 0x4A90E2,
    "nonmetal": 0x7ED321,
    "metalloid": 0xF5A623,
    "noble-gas": 0xBD10E0,
    "alkali-metal": 0xFF6B6B,
    "alkaline-earth": 0xFFA07A,
    "transition-metal": 0x87CEEB,
    "lanthanide": 0xFFD700,
    "actinide": 0xFF69B4,
    "halogen": 0x50E3C2,
    "unknown": 0xCCCCCC
};

export function getElementPosition(symbol) {
    const pos = ELEMENT_LAYOUT.positions[symbol];
    if (!pos) return null;
    
    const tileSize = ELEMENT_LAYOUT.tileSize;
    const spacing = ELEMENT_LAYOUT.spacing;
    const unit = tileSize + spacing;
    
    // Center the periodic table
    const x = (pos.column - 9.5) * unit;
    const y = -(pos.row - 3.5) * unit;
    const z = 0;
    
    return { x, y, z, row: pos.row, column: pos.column };
}
