const fs = require('fs');
const path = require('path');

// Define the paths to the files
const packageJsonPath = path.join(__dirname, '..', '..', 'package.json');
const readmePath = path.join(__dirname, '..', '..', 'Readme.md');

// Read package.json and parse it
let packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
const currentVersion = packageJson.version;

// Check if version is defined
if (!currentVersion) {
    console.error('Version is not defined in package.json');
    process.exit(1);
}

// Increment the version
const versionParts = currentVersion.split('.').map(part => parseInt(part, 10));
versionParts[2] += 1; // Increment the patch version
const newVersion = versionParts.join('.');

// Update the version in package.json
packageJson.version = newVersion;
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

// Read Readme.md
let readmeContent = fs.readFileSync(readmePath, 'utf8');

// Replace ${version} with the new version
readmeContent = readmeContent.replace(/\$\{version\}/g, '@'+newVersion);

// Write the modified content back to Readme.md
fs.writeFileSync(readmePath, readmeContent);

console.log(`Readme.md and package.json have been updated to version ${newVersion}.`);
