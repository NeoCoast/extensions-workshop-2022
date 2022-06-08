module.exports = [
  { from: 'public/icons', to: 'icons' },
  {
    from: 'public/manifest.json',
    to: '.',
    transform: (content) => {
      const manifest = JSON.parse(content.toString());
      manifest.version = process.env.npm_package_version;

      return Buffer.from(JSON.stringify(manifest));
    },
  },
];
