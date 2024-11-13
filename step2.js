const fs = require('fs');
const axios = require('axios');

function cat(path) {
  try {
    const contents = fs.readFileSync(path, 'utf8');
    console.log(contents);
  } catch (err) {
    console.error(`Error reading ${path}:\n  ${err}`);
    process.exit(1);
  }
}

async function webCat(url) {
  try {
    const resp = await axios.get(url);
    console.log(resp.data);
  } catch (err) {
    console.error(`Error fetching ${url}:\n  ${err}`);
    process.exit(1);
  }
}

// Get the path/url from command line arguments
const path = process.argv[2];
if (!path) {
  console.error('Please provide a file path or URL');
  process.exit(1);
}

// Check if the argument is a URL or file path
if (path.startsWith('http')) {
  webCat(path);
} else {
  cat(path);
} 