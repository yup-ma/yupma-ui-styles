// npm run update-readme -- --type=major/minor/ptach/1.2.24
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

// Function to increment version based on the type of release
function incrementVersion(version, type) {
    const versionParts = version.split('.').map(part => parseInt(part, 10));

    switch (type) {
        case 'major':
            versionParts[0] += 1; // Increment major version
            versionParts[1] = 0; // Reset minor version
            versionParts[2] = 0; // Reset patch version
            break;
        case 'minor':
            versionParts[1] += 1; // Increment minor version
            versionParts[2] = 0; // Reset patch version
            break;
        case 'patch':
            versionParts[2] += 1; // Increment patch version
            break;
        default:
            return null; // Invalid type, return null
    }

    return versionParts.join('.');
}

// Function to parse command line arguments
function parseArguments() {
    const args = process.argv.slice(2);
    const argsObj = {};
    args.forEach(arg => {
        const [key, value] = arg.split('=');
        argsObj[key.replace('--', '')] = value; // Remove leading -- from key
    });
    return argsObj;
}

// Get command line arguments
const args = parseArguments();

// Determine the type of version increment or specific version
const versionInput = args['type'];
let newVersion;

if (['major', 'minor', 'patch'].includes(versionInput)) {
    // Increment version based on the type
    newVersion = incrementVersion(currentVersion, versionInput);
} else if (versionInput && /^\d+\.\d+\.\d+$/.test(versionInput)) {
    // If a specific version is provided and it's in the correct format
    newVersion = versionInput;
} else if (!versionInput) {
    // Default to 'patch' if no input is provided
    newVersion = incrementVersion(currentVersion, 'patch');
} else {
    console.error('Invalid version increment type or version format.');
    process.exit(1);
}

// Ensure newVersion is valid
if (!newVersion) {
    console.error('Failed to calculate new version.');
    process.exit(1);
}

// Update the version in package.json
packageJson.version = newVersion;
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

// Read Readme.md
let readmeContent = fs.readFileSync(readmePath, 'utf8');

// Replace the current version with the new version
readmeContent = readmeContent.replace(new RegExp(currentVersion, 'g'), newVersion);

// Write the modified content back to Readme.md
fs.writeFileSync(readmePath, readmeContent);

console.log(`Readme.md and package.json have been updated to version ${newVersion}.`);
