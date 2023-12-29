const sass = require('sass');
const fs = require('fs');
const path = require('path');

// Ensure the dist directory exists
const distDir = path.join(__dirname, '..', '..', 'lib', 'dist');
if (!fs.existsSync(distDir)){
    fs.mkdirSync(distDir, { recursive: true });
}

// SCSS file to compile
const scssFile = path.join(__dirname, '..', '..', 'lib', 'scss', 'yupma_ui.scss');
// Output CSS file and Minified CSS file
const cssFile = path.join(distDir, 'index.css');
const cssMinFile = path.join(distDir, 'index.min.css');

// Function to write CSS file
const writeCssFile = (filePath, cssContent) => {
    fs.writeFile(filePath, cssContent, function(err){
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
        writeCssFile(cssFile, result.css);
        // Minify and write the minified CSS file
        sass.render({
            file: scssFile,
            outputStyle: 'compressed',
        }, function(minErr, minResult) {
            if (!minErr) {
                writeCssFile(cssMinFile, minResult.css);
            } else {
                console.error('Error during CSS minification:', minErr);
            }
        });
    } else {
        console.error('Error during SCSS compilation:', err);
    }
});
