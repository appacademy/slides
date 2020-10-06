#!/usr/bin/env node

// Populates the Lecture Slides with the content at the given LECTURE_PATH
// environment variable

const fs = require('fs');
const path = require('path');

function copyFileSync(source, target) {

  let targetFile = target;

  //if target is a directory a new file with the same name will be created
  if (fs.existsSync(target)) {
    if (fs.lstatSync(target).isDirectory()) {
      targetFile = path.join(target, path.basename(source));
    }
  }

  fs.writeFileSync(targetFile, fs.readFileSync(source));
}

function copyFolderRecursiveSync(source, target, isOutermost) {
  let files = [];

  //check if folder needs to be created or integrated
  let targetFolder = path.join(target);
  if (!isOutermost) targetFolder = path.join(target, path.basename(source));
  if (!fs.existsSync(targetFolder)) {
    fs.mkdirSync(targetFolder);
  }

  //copy
  if (fs.lstatSync(source).isDirectory()) {
    files = fs.readdirSync(source);
    files.forEach(function (file) {
      const curSource = path.join(source, file);
      if (fs.lstatSync(curSource).isDirectory()) {
        copyFolderRecursiveSync(curSource, targetFolder);
      } else {
        copyFileSync(curSource, targetFolder);
      }
    });
  }
}

const rootDir = path.join(__dirname.replace(/\/scripts$/, '/'));

function populateLecture() {
  const LECTURE_PATH = process.env.LECTURE_PATH;

  if (!LECTURE_PATH) {
    console.error(
      'Must define a "LECTURE_PATH" environment variable\n',
      'Run "LECTURE_PATH=<path to lecture notes> node populate-lecture.js"'
    )
  }

  const SLIDES_PATH = path.join(LECTURE_PATH, "slides.md");

  if (fs.existsSync(SLIDES_PATH)) {
    copyFileSync(SLIDES_PATH, rootDir);

    const data = fs.readFileSync(path.join(rootDir, 'slides.md'), 'utf-8');
    const lectureText = "window.lectureText = `\n" + data.replace(/`/g, `\\\``).replace(/\$\{/g, '\\$\\{') + "\n`;";
    fs.writeFileSync(path.join(rootDir, 'assets/lecture-text.js'), lectureText);
  }

  const ASSET_PATH = path.join(LECTURE_PATH, 'assets');

  if (fs.existsSync(ASSET_PATH)) {
    copyFolderRecursiveSync(ASSET_PATH, path.join(rootDir, 'assets'), true);
  }
}

if (require.main === module) {
  console.log('Finished executing script.');
  populateLecture();
}

module.exports = populateLecture;