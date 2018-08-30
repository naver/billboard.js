<img src="https://naver.github.io/billboard.js/img/logo/billboard.js.svg" width="350" alt="billboard.js">

[![version][badge-version]][link-version] [![Build Status][badge-build-status]][link-build-status] [![Coverage Status][badge-coverage]][link-coverage] [![download][badge-download]][link-download] [![Greenkeeper][badge-gk]][link-gk]

billboard.js is a re-usable, easy interface JavaScript chart library, based on D3 v4+.
> The name "billboard" comes from the famous `billboard chart` which everybody knows.<br>

> This project was forked from C3.js v0.4.11.
> - [Why we decided to start billboard.js?](https://github.com/naver/billboard.js/wiki/Why-we-decided-to-start-billboard.js%3F)<br>

## Documents
- [API Documentation](https://naver.github.io/billboard.js/release/latest/doc/)
- [Examples](https://naver.github.io/billboard.js/demo/)
- [Roadmap](https://github.com/naver/billboard.js/wiki/Roadmap)
- [Contribution Guide](CONTRIBUTING.md)
- [Comparison table with other libraries](https://github.com/naver/billboard.js/wiki/Comparison-table)
- [Migration guide from C3.js](https://github.com/naver/billboard.js/wiki/How-to-migrate-from-C3.js%3F)
- [Third Party Applications](https://github.com/naver/billboard.js/wiki/Third-party-applications)
- [Who's using billboard.js](https://github.com/naver/billboard.js/wiki/Who's-using-billboard.js)

## Playground
Play with the diverse options generating on the fly!
- https://naver.github.io/billboard.js/playground/

## Questions?
If you have any questions, checkout the previous posts or create a new one at:
- [Stack Overflow: billboard.js tagged posts](https://stackoverflow.com/questions/tagged/billboard.js)
- [Issue with 'question' label](https://github.com/naver/billboard.js/issues?utf8=%E2%9C%93&q=label%3Aquestion)

## Supported chart types
![Chart Types](https://naver.github.io/billboard.js/img/chart-types.png?v=3)

## Download and Installation

Download dist files from the repo directly or install it via npm. 

### For development (Uncompressed)

You can download the uncompressed files for development

#### Latest
  - https://naver.github.io/billboard.js/release/latest/dist/billboard.js
  - https://naver.github.io/billboard.js/release/latest/dist/billboard.css

#### Specific version
  - https://naver.github.io/billboard.js/release/[VERSION]/dist/billboard.js
  - https://naver.github.io/billboard.js/release/[VERSION]/dist/billboard.css

### For production (Compressed)

You can download the compressed files for production

#### Latest
  - https://naver.github.io/billboard.js/release/latest/dist/billboard.min.js
  - https://naver.github.io/billboard.js/release/latest/dist/billboard.min.css

#### Specific version
  - https://naver.github.io/billboard.js/release/[VERSION]/dist/billboard.min.js
  - https://naver.github.io/billboard.js/release/[VERSION]/dist/billboard.min.css

### Packaged version (with D3.js inclusion)
> Packaged version is not an official distribution.
> It's to provide an easy way to load 'billboard.js' with dependency.

 - **Latest**
    - https://naver.github.io/billboard.js/release/latest/dist/billboard.pkgd.js
    - https://naver.github.io/billboard.js/release/latest/dist/billboard.pkgd.min.js
 - **Specific version**
    - https://naver.github.io/billboard.js/release/[VERSION]/dist/billboard.pkgd.js
    - https://naver.github.io/billboard.js/release/[VERSION]/dist/billboard.pkgd.min.js

### Themes
> If you want apply themes, simply load one of the theme css file provided instead of the default css file.

#### insight
- https://naver.github.io/billboard.js/release/latest/dist/theme/insight.css
- https://naver.github.io/billboard.js/release/latest/dist/theme/insight.min.css

### Nightly version

Nightly version is the latest build from the master branch.
With nightly, you can try upcoming changes prior the official release.

- https://github.com/naver/billboard.js/tree/nightly/dist

> The version info will be given as the build datetime: `x.x.x-nightly-yyyymmddhhmmss`


### Installation with npm

```bash
$ npm install billboard.js
```

### Using CDN

If you want to use 'billboard.js' without installation, load files directly from one of the CDN providers.

- cdnjs: https://cdnjs.com/libraries/billboard.js
- jsDelivr: https://cdn.jsdelivr.net/npm/billboard.js/dist/ [![](https://data.jsdelivr.com/v1/package/npm/billboard.js/badge?style=rounded)](https://www.jsdelivr.com/package/npm/billboard.js)
- unpkg: https://unpkg.com/billboard.js/dist/

## Supported Browsers

> Basically will work on all SVG supported browsers.

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
// as named import
import {bb} from "billboard.js";

// or as importing default
import bb from "billboard.js";
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

For anyone interested in developing billboard.js, follow the instructions below.

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

## License
billboard.js is released under the [MIT license](https://github.com/naver/billboard.js/blob/master/LICENSE).

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
[link-download]: https://npm-stat.com/charts.html?package=billboard.js&from=2017-06-08
[link-version]: https://www.npmjs.com/package/billboard.js
[link-build-status]: https://travis-ci.org/naver/billboard.js
[link-coverage]: https://coveralls.io/github/naver/billboard.js
[link-gk]: https://greenkeeper.io/