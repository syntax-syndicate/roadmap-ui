import config from '@repo/tailwind-config';
import { createPreset } from 'fumadocs-ui/tailwind-plugin';

export default {
  ...config,
  plugins: [...config.plugins, createPreset()],
};
