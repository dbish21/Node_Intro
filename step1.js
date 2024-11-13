const fs = require('fs');

function cat(path) {
  try {
    const contents = fs.readFileSync(path, 'utf8');
    console.log(contents);
  } catch (err) {
    console.error(`Error reading ${path}:\n  ${err}`);
    process.exit(1);
  }
}

// Get the file path from command line arguments
const path = process.argv[2];
if (path) {
  cat(path);
} else {
  console.error('Please provide a file path');
  process.exit(1);
} 