// const { createDefaultPreset } = require("ts-jest");

// const tsJestTransformCfg = createDefaultPreset().transform;

// /** @type {import("jest").Config} **/
// module.exports = {
//   testEnvironment: "node",
//   transform: {
//     ...tsJestTransformCfg,
//   },
// };

// module.exports = {
//   preset: 'ts-jest',
//   testEnvironment: 'jsdom', 
//   moduleNameMapper: {
//     '^@/(.*)$': '<rootDir>/src/$1', 
//     '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
//   },
//   setupFilesAfterEnv: ['./jest.setup.ts'],
//   testPathIgnorePatterns: ['./.next/', '<rootDir>/node_modules/'],
// };


// /** @type {import('jest').Config} */
// import nextJest from 'next/jest'
 
// const createJestConfig = nextJest({
//   dir: './',
// })
 
// const customJestConfig = {
//   setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
//   testEnvironment: 'jsdom',
//   moduleNameMapper: {
//     '^@/components/(.*)$': '<rootDir>/components/$1',
//   },
// }
 
// export default createJestConfig(customJestConfig)


import nextJest from 'next/jest.js'

const createJestConfig = nextJest({
  dir: './',
})

// const customJestConfig = {
//   setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
//   moduleNameMapper: {
//     '^@/(.*)$': '<rootDir>/$1',
//     '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
//   },
//   testEnvironment: 'jsdom',
// }
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^.+\\.(css|less|scss|sass)$' : '<rootDir/__mocks__/style.js>',
    '^.+\\.(jpg|jpeg|png|gif|webp|svg)$':'<rootDir>/__mocks__/fileMock.js',
    '^@/(.*)$': '<rootDir>/src/$1', 
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '^@/components/(.*)$': '<rootDir>/components/$1',
    '^@/pages/(.*)$': '<rootDir>/app/$1',
  },
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],

}
export default createJestConfig(customJestConfig)








// import nextJest from 'next/jest'
// const next = require('next/jest');
// import type { Config } from 'jest'




// import {nextJest} from 'next/jest.js'
 
// // import { pathsToModuleNameMapper } from 'ts-jest'
// // import {compilerOptions } from './tsconfig.json';
// import { pathsToModuleNameMapper } from 'ts-jest'
// import { compilerOptions } from './tsconfig.json' with { type: "json" };
// const createJestConfig = nextJest({
//   // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
//   dir: './',
// })

// // Add any custom config to be passed to Jest
// const customJestConfig = {
//   setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
//   testEnvironment: 'jest-environment-jsdom',
//   moduleNameMapper: {
//     ...pathsToModuleNameMapper(compilerOptions.paths),
//     '^.+\\.(css|less|scss|sass)$' : '<rootDir/__mocks__/style.js>',
//     '^.+\\.(jpg|jpeg|png|gif|webp|svg)$':'<rootDir>/__mocks__/fileMock.js',
//     '^@/(.*)$': '<rootDir>/src/$1', 
//     '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
//     '^@/components/(.*)$': '<rootDir>/components/$1',
//     '^@/pages/(.*)$': '<rootDir>/app/$1',
//   },
//   moduleNameMapper: {
//     ...pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),
//   },
//   extensionsToTreatAsEsm: ['.ts', '.tsx'],
//   moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],

// }

// module.exports = createJestConfig(customJestConfig)