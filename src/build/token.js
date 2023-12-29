const sass = require('sass');
const fs = require('fs');
const path = require('path');

const scssFile = path.join(__dirname, '..', '..', 'lib', 'scss', 'tokens.scss');
const cssFile = path.join(__dirname, '..', '..', 'lib', 'dist', 'tokens.css');

// Function to write CSS file
const writeCssFile = (filePath, cssContent) => {
    fs.writeFile(filePath, cssContent, function(err) {
        if (!err) {
            console.log(`CSS compiled successfully to ${filePath}.`);
        } else {
            console.error(`Error writing CSS file ${filePath}:`, err);
        }
    });
};

// Compile SCSS to CSS
sass.render({
    file: scssFile,
    outFile: cssFile,
}, function(err, result) {
    if (!err) {
        // Write the standard CSS file
        writeCssFile(cssFile, result.css.toString());
        // Minify and write the minified CSS file
    } else {
        console.error('Error during SCSS compilation:', err);
    }
});
