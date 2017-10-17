<img src=https://naver.github.io/billboard.js/img/logo/billboard.js.svg width=350 alt=billboard.js>

[![version][badge-version]][link-version] [![Build Status][badge-build-status]][link-build-status] [![Coverage Status][badge-coverage]][link-coverage] [![download][badge-download]][link-download] [![Greenkeeper][badge-gk]][link-gk]

billboard.js is a re-usable, easy interface JavaScript chart library, based on D3 v4+.
> The name "billboard" comes from the famous `billboard chart` which everybody knows.<br>

> This project was forked from C3.js v0.4.11.
> - [Why we decided to start billboard.js?](https://github.com/naver/billboard.js/wiki/Why-we-decided-to-start-billboard.js%3F)<br>

## Documents
- [API Documetation](http://naver.github.io/billboard.js/release/latest/doc/)
- [Examples](https://naver.github.io/billboard.js/demo/)
- [Roadmap](https://github.com/naver/billboard.js/wiki/Roadmap)
- [Contribution Guide](CONTRIBUTING.md)
- [Migration guide from C3.js](https://github.com/naver/billboard.js/wiki/How-to-migrate-from-C3.js%3F)
- [Third Party Applications](https://github.com/naver/billboard.js/wiki/Third-party-applications)

## Playground
Play with the diverse option generating on the fly!
- https://naver.github.io/billboard.js/playground/

## Supported chart types
![Chart Types](https://naver.github.io/billboard.js/img/chart-types.png)

## Download and Installation

Download dist files from repo directly or install it via npm. 

### For development (Uncompressed)

You can download the uncompressed files for development

#### Latest
  - http://naver.github.io/billboard.js/release/latest/dist/billboard.js
  - http://naver.github.io/billboard.js/release/latest/dist/billboard.css

#### Specific version
  - http://naver.github.io/billboard.js/release/[VERSION]/dist/billboard.js
  - http://naver.github.io/billboard.js/release/[VERSION]/dist/billboard.css

### For production (Compressed)

You can download the compressed files for production

#### Latest
  - http://naver.github.io/billboard.js/release/latest/dist/billboard.min.js
  - http://naver.github.io/billboard.js/release/latest/dist/billboard.min.css

#### Specific version
  - http://naver.github.io/billboard.js/release/[VERSION]/dist/billboard.min.js
  - http://naver.github.io/billboard.js/release/[VERSION]/dist/billboard.min.css

### Packaged version (with D3.js inclusion)
> Packaged version is not an official distribution.
> Is just to provide for ease use of 'billboard.js' with dependency.

 - **Latest**
    - http://naver.github.io/billboard.js/release/latest/dist/billboard.pkgd.js
    - http://naver.github.io/billboard.js/release/latest/dist/billboard.pkgd.min.js
 - **Specific version**
    - http://naver.github.io/billboard.js/release/[VERSION]/dist/billboard.pkgd.js
    - http://naver.github.io/billboard.js/release/[VERSION]/dist/billboard.pkgd.min.js


### Installation with npm

```bash
$ npm install billboard.js
```

### Using CDN

If you want use without installation, load files directly from one of the CDN providers.

- cdnjs: https://cdnjs.com/libraries/billboard.js
- jsDelivr: https://cdn.jsdelivr.net/npm/billboard.js/dist/ [![](https://data.jsdelivr.com/v1/package/npm/billboard.js/badge?style=rounded)](https://www.jsdelivr.com/package/npm/billboard.js)
- unpkg: https://unpkg.com/billboard.js/dist/

## Supported Browsers

> Basically will work on all browsers which has SVG support.

|Internet Explorer|Chrome|Firefox|Safari|iOS|Android|
|---|---|---|---|---|---|
|9+|Latest|Latest|Latest|8+|4+|


## Dependency

|[D3](https://d3js.org/) (required)|
| --- |
| 4+ |

Load billboard.js after D3.js.

```html
<!-- 1) Load D3.js and billboard.js separately -->
    <!-- Load D3 -->
    <script src="https://d3js.org/d3.v4.min.js"></script>
    
    <!-- Load billboard.js with base style -->
    <link rel="stylesheet" href="$YOUR_PATH/billboard.css">
    <script src="$YOUR_PATH/billboard.js"></script>

<!-- 2) or Load billboard.js packaged with D3.js -->
    <link rel="stylesheet" href="$YOUR_PATH/billboard.css">
    <script src="$YOUR_PATH/billboard.pkgd.js"></script>
```

or use importing ESM.

```js
import {bb} from "billboard.js";
```

> **Note**  
> For migration from C3.js, checkout the [migration guide](https://github.com/naver/billboard.js/wiki/How-to-migrate-from-C3.js%3F) 

## Basic usage example

#### 1) Create chart holder element
```html
<div id="chart"></div>
```

#### 2) Generate a chart with options
```js
// generate the chart
var chart = bb.generate({
    bindto: "#chart",
    data: {
    	type: "line",
        columns: [
            ["data1", 30, 200, 100, 400, 150, 250]
        ]
    }
});

// call some API
chart.load( ... );
```

## How to start developing billboard.js?

For anyone interested to develop billboard.js, follow the instructions below.

### Development Environment

#### 1. Clone the repository

Clone the billboard.js repository and install the dependency modules.

```bash
# Create and move a folder.
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

Two folders will be created after complete build is completed.

- **dist** folder: Includes the **billboard.js** and **billboard.min.js** files.
- **doc** folder: Includes API documentation. The home page for the documentation is **doc/index.html**.

### Linting

To keep the same code style, we adopted [ESLint](http://eslint.org/) to maintain our code quality. The [rules](https://github.com/naver/eslint-config-naver/tree/master/rules) are modified version based on [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript).
Setup your editor for check or run below command for linting.

```bash
$ npm run lint
```

### Test

Once you created a branch and done with development, you must perform a test running `npm test` command before you push code to a remote repository.

```bash
$ npm test
```
Running a `npm test` command will start [Mocha](https://mochajs.org/) tests via [Karma-runner](https://karma-runner.github.io/).


## Bug Report

If you find a bug, please report to us posting [issues](https://github.com/naver/billboard.js/issues) on GitHub.

## License
billboard.js is released under the [MIT license](http://naver.github.io/billboard.js/LICENSE).

```
Copyright (c) 2017 NAVER Corp.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
```

<!-- badges -->
[badge-download]: https://img.shields.io/npm/dm/billboard.js.svg?style=flat
[badge-version]: https://img.shields.io/npm/v/billboard.js.svg?style=flat
[badge-build-status]: https://travis-ci.org/naver/billboard.js.svg?branch=master
[badge-coverage]: https://coveralls.io/repos/github/naver/billboard.js/badge.svg
[badge-gk]: https://badges.greenkeeper.io/naver/billboard.js.svg

<!-- links -->
[link-download]: http://npm-stat.com/charts.html?package=billboard.js&from=2017-06-08
[link-version]: https://www.npmjs.com/package/billboard.js
[link-build-status]: https://travis-ci.org/naver/billboard.js
[link-coverage]: https://coveralls.io/github/naver/billboard.js
[link-gk]: https://greenkeeper.io/
