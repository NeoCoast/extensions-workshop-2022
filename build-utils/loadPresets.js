const webpackMerge = require('webpack-merge');

const applyPresets = (env = { presets: [] }) => {
  const presets = env.presets || [];

  const mergedPresets = [].concat(...[presets]);
  // eslint-disable-next-line
  const mergedConfigs = mergedPresets.map((presetName) => require(`./presets/${presetName}`)(env));

  return webpackMerge.merge({}, ...mergedConfigs);
};

module.exports = applyPresets;
