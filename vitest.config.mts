import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
    plugins: [tsconfigPaths()], //allows test to work with type script
    test: {
        environment: 'jsdom', //use jsdom for testing react components
        exclude: ['**/node_modules/**', '**/test/**', 'playwright-report/**', 'test-results/**'], //exclude test files
        deps: {
            inline: ['wagmi', '@wagmi/core']
        }
    },

})