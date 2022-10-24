## How to start developing billboard.js?

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
`npm` and `Yarn` are supported.

```
# Install the dependency modules.
$ npm install

# or
$ yarn
```

#### 3. Build

Use npm script to build billboard.js

```bash
# Run webpack-dev-server for development
$ npm start

# Build
$ npm run build

# Generate jsdoc
$ npm run jsdoc
```

Two folders will be created after the build is completed.

- **dist** folder: Includes the **billboard.js** and **billboard.min.js** files.
- **doc** folder: Includes API documentation. The home page for the documentation is **doc/index.html**.

### Linting

To maintain the same code style and quality, we adopted [ESLint](https://eslint.org/). The [rules](https://github.com/naver/eslint-config-naver/tree/master/rules) are based on the [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript) with some modifications.
Setup your editor for check or run the below command for linting.

```bash
$ npm run lint
```

### Test

Once you created a branch and finished the development, you must perform a test with `npm test` command before the push to a remote repository.

```bash
$ npm test
```
Running the `npm test` command will start [Mocha](https://mochajs.org/) tests via [Karma-runner](https://karma-runner.github.io/).

## Bug Report

If you find a bug, please report to us by posting [issues](https://github.com/naver/billboard.js/issues) on GitHub.
