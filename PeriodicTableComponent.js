import * as THREE from 'three';
import { getElementPosition, ELEMENT_COLORS } from './elementLayout.js';

export class PeriodicTableComponent {
    constructor(scene, dataManager) {
        this.scene = scene;
        this.dataManager = dataManager;
        this.elementMeshes = new Map();
        this.highlightedElement = null;
        this.selectedElement = null;
    }

    createPeriodicTable() {
        const elements = this.dataManager.getAllElements();
        
        elements.forEach(symbol => {
            const elementData = this.dataManager.getElementData(symbol);
            const position = getElementPosition(symbol);
            
            if (!position) return;
            
            // Create element tile
            const geometry = new THREE.BoxGeometry(0.9, 0.9, 0.1);
            const color = ELEMENT_COLORS[elementData.category] || ELEMENT_COLORS.unknown;
            const material = new THREE.MeshStandardMaterial({
                color: color,
                emissive: 0x000000,
                metalness: 0.3,
                roughness: 0.7
            });
            
            const mesh = new THREE.Mesh(geometry, material);
            mesh.position.set(position.x, position.y, position.z);
            mesh.userData = { symbol, elementData };
            
            this.scene.add(mesh);
            this.elementMeshes.set(symbol, mesh);
            
            // Add text label
            this.addTextLabel(symbol, position);
        });
    }

    addTextLabel(symbol, position) {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = 128;
        canvas.height = 128;
        
        context.fillStyle = 'white';
        context.font = 'bold 60px Arial';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillText(symbol, 64, 64);
        
        const texture = new THREE.CanvasTexture(canvas);
        const spriteMaterial = new THREE.SpriteMaterial({ map: texture });
        const sprite = new THREE.Sprite(spriteMaterial);
        sprite.scale.set(0.6, 0.6, 1);
        sprite.position.set(position.x, position.y, position.z + 0.1);
        
        this.scene.add(sprite);
    }

    highlightElement(symbol) {
        // Reset previous highlight
        if (this.highlightedElement && this.highlightedElement !== this.selectedElement) {
            const prevMesh = this.elementMeshes.get(this.highlightedElement);
            if (prevMesh) {
                prevMesh.material.emissive.setHex(0x000000);
            }
        }
        
        // Apply new highlight
        if (symbol && symbol !== this.selectedElement) {
            const mesh = this.elementMeshes.get(symbol);
            if (mesh) {
                mesh.material.emissive.setHex(0x444444);
            }
        }
        
        this.highlightedElement = symbol;
    }

    selectElement(symbol) {
        // Reset previous selection
        if (this.selectedElement) {
            const prevMesh = this.elementMeshes.get(this.selectedElement);
            if (prevMesh) {
                prevMesh.material.emissive.setHex(0x000000);
            }
        }
        
        // Apply new selection
        if (symbol) {
            const mesh = this.elementMeshes.get(symbol);
            if (mesh) {
                mesh.material.emissive.setHex(0x00ff00);
            }
        }
        
        this.selectedElement = symbol;
    }

    getElementAtPosition(x, y, camera) {
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2(x, y);
        
        raycaster.setFromCamera(mouse, camera);
        
        const meshes = Array.from(this.elementMeshes.values());
        const intersects = raycaster.intersectObjects(meshes);
        
        if (intersects.length > 0) {
            return intersects[0].object.userData.symbol;
        }
        
        return null;
    }

    getSelectedElement() {
        return this.selectedElement;
    }
}
