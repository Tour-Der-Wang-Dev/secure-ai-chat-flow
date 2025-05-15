
# Available Scripts

This document lists all available npm/yarn scripts for this project, explaining their purpose and providing usage examples.

## Development Scripts

### `dev`

**Purpose**: Starts the development server with hot module replacement.

**Usage**:
```bash
npm run dev
# or
yarn dev
```

This will start the development server on http://localhost:8080 by default (or another port if 8080 is already in use).

### `build`

**Purpose**: Creates a production build of the application.

**Usage**:
```bash
npm run build
# or
yarn build
```

This compiles the TypeScript files, bundles the application with Vite, and outputs the result to the `/dist` folder.

### `preview`

**Purpose**: Locally preview the production build.

**Usage**:
```bash
npm run preview
# or
yarn preview
```

This serves the production build locally so you can test it before deployment. Must run `build` first.

## Linting and Type Checking

### `lint`

**Purpose**: Runs ESLint to check for code quality issues.

**Usage**:
```bash
npm run lint
# or
yarn lint
```

This will identify any code style issues according to the project's ESLint configuration.

### `lint:fix`

**Purpose**: Automatically fixes ESLint issues where possible.

**Usage**:
```bash
npm run lint:fix
# or
yarn lint:fix
```

### `type-check`

**Purpose**: Runs TypeScript compiler to check for type errors without emitting files.

**Usage**:
```bash
npm run type-check
# or
yarn type-check
```

## Testing

### `test`

**Purpose**: Runs the test suite.

**Usage**:
```bash
npm run test
# or
yarn test
```

### `test:watch`

**Purpose**: Runs tests in watch mode, re-running when files change.

**Usage**:
```bash
npm run test:watch
# or
yarn test:watch
```

## Combined Commands

### `validate`

**Purpose**: Runs linting, type checking, and tests in sequence to validate code quality.

**Usage**:
```bash
npm run validate
# or
yarn validate
```

This is useful to run before committing code or creating pull requests.

## Deployment

### `deploy`

**Purpose**: Builds and deploys the application to the hosting environment.

**Usage**:
```bash
npm run deploy
# or
yarn deploy
```

This script depends on the specific deployment setup and hosting provider.

## Additional Utilities

### `clean`

**Purpose**: Removes build artifacts and cache.

**Usage**:
```bash
npm run clean
# or
yarn clean
```

### `analyze`

**Purpose**: Analyzes the bundle size using rollup-plugin-visualizer.

**Usage**:
```bash
npm run analyze
# or
yarn analyze
```

This generates a visual report of the bundle size to help optimize the application.
