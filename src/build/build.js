const fs = require('fs-extra');
const path = require('path');
const postcss = require('postcss');
const scss = require('postcss-scss');

const srcDir = path.join(__dirname, '..', 'styles');
const destDir = path.join(__dirname, '..', '..', 'lib', 'scss');

const removeCommentsPlugin = postcss.plugin('remove-comments', () => {
    return (root) => {
        root.walkComments(comment => comment.remove());
    };
});

const processFile = (file) => {
    const filePath = path.join(srcDir, file);
    const destFilePath = path.join(destDir, file);

    fs.readFile(filePath, 'utf8')
        .then((data) => {
            return postcss([removeCommentsPlugin])
                .process(data, { syntax: scss });
        })
        .then((result) => {
            fs.outputFile(destFilePath, result.css);
        })
        .catch(err => console.error(`Error processing file ${file}:`, err));
};

fs.remove(path.join(__dirname, '..', '..', 'lib'))
    .then(() => fs.readdir(srcDir))
    .then(files => {
        files.forEach(file => {
            if (file.endsWith('.scss')) {
                processFile(file);
            } else {
                // Copy non-SCSS files directly
                fs.copy(path.join(srcDir, file), path.join(destDir, file));
            }
        });
    })
    .then(() => console.log('Packaging completed successfully.'))
    .catch(err => console.error('Error during packaging:', err));
