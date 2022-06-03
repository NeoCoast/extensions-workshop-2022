#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const archiver = require('archiver');

const DEST_DIR = path.join(__dirname, '../dist');
const DEST_ZIP_DIR = path.join(__dirname, '../dist-zip');
const DEST_TMP = path.join(__dirname, '../dist-tmp');

const extractExtensionData = () => {
  const extPackageJson = require('../package.json'); // eslint-disable-line

  return {
    name: extPackageJson.name,
    version: extPackageJson.version,
  };
};

const makeDirIfNotExists = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
};

const mangleManifest = (browser) => {
  const manifestPath = path.join(DEST_TMP, 'manifest.json');
  const manifest = fs.readJsonSync(manifestPath);

  if (browser === 'chrome') {
    delete manifest.applications;
  }

  fs.writeJsonSync(manifestPath, manifest);
};

const buildZip = (src, dist, zipFilename, browser = 'chrome') => {
  // Generate tmp dist folder
  makeDirIfNotExists(DEST_TMP);
  fs.copySync(src, DEST_TMP);
  mangleManifest(browser);

  const archive = archiver('zip', { zlib: { level: 9 } });
  const stream = fs.createWriteStream(path.join(dist, zipFilename));

  return new Promise((resolve, reject) => {
    archive
      .directory(DEST_TMP, false)
      .on('error', (err) => reject(err))
      .pipe(stream);

    stream.on('close', () => {
      fs.removeSync(DEST_TMP);
      resolve();
    });
    archive.finalize();
  });
};

const main = async () => {
  const { name, version } = extractExtensionData();
  const browsers = ['chrome', 'firefox'];

  for (const browser of browsers) { // eslint-disable-line
    const zipFilename = `${name}-${browser}-v${version}.zip`;

    makeDirIfNotExists(DEST_ZIP_DIR);

    try {
      await buildZip(DEST_DIR, DEST_ZIP_DIR, zipFilename, browser); // eslint-disable-line
      console.info(`${browser} zip file ready!`); // eslint-disable-line
    } catch (error) {
      console.err(error); // eslint-disable-line
    }
  }
};

main();
