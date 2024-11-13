const fs = require('fs');
const axios = require('axios');

// Handle output (either print or write to file)
function handleOutput(text, outputFile) {
  if (outputFile) {
    try {
      fs.writeFileSync(outputFile, text);
    } catch (err) {
      console.error(`Couldn't write ${outputFile}:\n  ${err}`);
      process.exit(1);
    }
  } else {
    console.log(text);
  }
}

// Read file contents
async function cat(path, outputFile) {
  try {
    const contents = fs.readFileSync(path, 'utf8');
    handleOutput(contents, outputFile);
  } catch (err) {
    console.error(`Error reading ${path}:\n  ${err}`);
    process.exit(1);
  }
}

// Read URL contents
async function webCat(url, outputFile) {
  try {
    const resp = await axios.get(url);
    handleOutput(resp.data, outputFile);
  } catch (err) {
    console.error(`Error fetching ${url}:\n  ${err}`);
    process.exit(1);
  }
}

// Process a single path (file or URL)
async function processPath(path, outputFile) {
  if (path.startsWith('http')) {
    await webCat(path, outputFile);
  } else {
    await cat(path, outputFile);
  }
}

// Parse command line arguments
let paths = [];
let outputFile;

if (process.argv[2] === '--out') {
  outputFile = process.argv[3];
  // Get all remaining arguments as paths
  paths = process.argv.slice(4);
} else {
  // Get all remaining arguments as paths
  paths = process.argv.slice(2);
}

if (paths.length === 0) {
  console.error('Please provide at least one file path or URL');
  process.exit(1);
}

// Process all paths sequentially
async function processAllPaths() {
  for (let path of paths) {
    await processPath(path, outputFile);
  }
}

processAllPaths(); 