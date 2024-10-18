import { defineConfig } from 'tsup';

import ganttPackage from './packages/gantt/package.json';
import typesPackage from './packages/types/package.json';

export default defineConfig({
  entry: ['index.ts'],
  sourcemap: false,
  minify: true,
  dts: true,
  format: ['cjs', 'esm'],
  loader: {
    '.ts': 'tsx',
  },
  external: [
    ...Object.keys(ganttPackage.dependencies),
    ...Object.keys(typesPackage.devDependencies),
    ...Object.keys(typesPackage.devDependencies),
  ],
  noExternal: ['@repo/types'],
});
