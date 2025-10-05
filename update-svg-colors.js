const fs = require('fs');
const path = require('path');

// Brick red color in hex
const BRICK_RED = '#8B0000';

// Directory containing SVGs
const svgDir = path.join(__dirname, 'public');

// Get all SVG files
const svgFiles = fs.readdirSync(svgDir).filter(file => file.endsWith('.svg'));

svgFiles.forEach(svgFile => {
    const filePath = path.join(svgDir, svgFile);
    
    try {
        // Read the SVG file
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Replace fill and stroke colors with brick red
        // This regex matches fill="#..." or fill='#...' or fill: #...; or fill:rgb(...)
        let updatedContent = content
            .replace(/(fill|stroke)="[^"]*"/g, `$1="${BRICK_RED}"`)
            .replace(/(fill|stroke)='[^']*'/g, `$1='${BRICK_RED}'`)
            .replace(/(fill|stroke):\s*#[0-9a-fA-F]{3,6};?/g, `$1: ${BRICK_RED};`)
            .replace(/(fill|stroke):\s*rgb\([^)]*\);?/g, `$1: ${BRICK_RED};`);
        
        // If the content changed, write it back
        if (updatedContent !== content) {
            fs.writeFileSync(filePath, updatedContent);
            console.log(`Updated colors in ${svgFile}`);
        } else {
            console.log(`No color changes needed for ${svgFile}`);
        }
    } catch (error) {
        console.error(`Error processing ${svgFile}:`, error.message);
    }
});

console.log('SVG color update complete!');
