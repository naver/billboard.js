## How to start developing billboard.js

For anyone interested in developing billboard.js, follow the instructions below.
> Required Node.js version: `10.10.0+`

### Development Environment

#### 1. Clone the repository

Clone the billboard.js repository and install the dependency modules.

```bash
# Create a folder and move.
$ mkdir billboard.js && cd billboard.js

# Clone the repository.
$ git clone https://github.com/naver/billboard.js.git
```

#### 2. Install dependencies
`pnpm` is used for dependency management.

```
# Install the dependency modules.
$ pnpm install
```

#### 3. Build

Use package scripts to build billboard.js

```bash
# Run webpack-dev-server for development
$ pnpm start

# Build
$ pnpm run build

# Generate jsdoc
$ pnpm run jsdoc
```

Two folders will be created after the build is completed.

- **dist** folder: Includes the **billboard.js** and **billboard.min.js** files.
- **doc** folder: Includes API documentation. The home page for the documentation is **doc/index.html**.

### Linting

To maintain the same code style and quality, we adopted [ESLint](https://eslint.org/). The [rules](https://github.com/naver/eslint-config-naver/tree/master/rules) are based on the [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript) with some modifications.
Setup your editor for checking or run the command below for linting.

```bash
$ pnpm run lint
```

### Test

Once you have created a branch and finished the development, you must perform tests with `pnpm test` command before pushing to a remote repository.

```bash
$ pnpm test
```
Running the `pnpm test` command will start Vitest tests in browser mode.

## Bug Report

If you find a bug, please report it to us by posting [issues](https://github.com/naver/billboard.js/issues) on GitHub.
