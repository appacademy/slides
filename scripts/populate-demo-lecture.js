#!/usr/bin/env node

// Populates the Demo Lecture with the README of this repo

const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname.replace(/\/scripts$/, '/'));

const data = fs.readFileSync(path.join(rootDir, 'README.md'), 'utf-8');
const header = `
// Node.js is used to write this to the README.md file.
// CommonJS-style export used for compatibility with Node.js
`

const lectureText = header + "module.exports = `\n" + data.replace(/`/g, `\\\``).replace(/\$\{/g, '\\$\\{') + "\n`;";

fs.writeFileSync(path.join(rootDir, 'frontend/util/demo_text.js'), lectureText);
