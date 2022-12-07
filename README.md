<picture>
  <source srcset="https://naver.github.io/billboard.js/img/logo/billboard.js-white.svg" media="(prefers-color-scheme: dark)">
  <img src="https://naver.github.io/billboard.js/img/logo/billboard.js.svg" width="350" alt="billboard.js"><br>
</picture>

[![Latest Version][badge-latest]][link-version] [![Next version][badge-next]][link-version] [![bb][badge-@billboard.js/react]][link-@billboard.js/react]<br> 
 [![semantic-release][badge-semantic-release]][link-semantic-release] ![React][badge-react]

![CI Status][badge-ci-status] [![Coverage Status][badge-coverage]][link-coverage] [![Known Vulnerabilities][badge-snyk]][link-snyk] 
[![download][badge-download]][link-download] [![jsDelivr][badge-jsDelivr]][link-jsDelivr] [![gzip size][badge-gzip-size]][link-gzip-size]

billboard.js is a re-usable, easy interface JavaScript chart library, based on [D3.js](https://d3js.org/).
> The name "billboard" comes from the famous `billboard chart` which everybody knows.<br>
> - [Why we decided to start billboard.js?](https://github.com/naver/billboard.js/wiki/Why-we-decided-to-start-billboard.js%3F)

## Documents
- [API Documentation](https://naver.github.io/billboard.js/release/latest/doc/)
- [Examples](https://naver.github.io/billboard.js/demo/)
- [Roadmap](https://github.com/naver/billboard.js/wiki/Roadmap)
- [Contribution Guide](CONTRIBUTING.md)
- [Development Guide](DEVELOPMENT.md)
- [Comparison table with other libraries](https://github.com/naver/billboard.js/wiki/Comparison-table)
- [Migration guide from C3.js](https://github.com/naver/billboard.js/wiki/How-to-migrate-from-C3.js%3F)
- [Third Party Applications](https://github.com/naver/billboard.js/wiki/Third-party-applications)
- [Who's using billboard.js](https://github.com/naver/billboard.js/wiki/Who's-using-billboard.js)
- [Benchmark](https://naver.github.io/billboard.js/demo/benchmark/)
- Technicals:
  - [How to bundle for legacy browsers?](https://github.com/naver/billboard.js/wiki/How-to-bundle-for-legacy-browsers%3F)
  - [How to generate chart image in Node.js environment?](https://github.com/naver/billboard.js/wiki/How-to-generate-chart-image-in-Node.js-environment%3F)
  - find out more at [Wiki](https://github.com/naver/billboard.js/wiki) page.
- v2 updates:
  - [v2 CHANGELOG](https://github.com/naver/billboard.js/wiki/CHANGELOG-v2)
  - [Migration Guide to v2](https://github.com/naver/billboard.js/wiki/Migration-Guide-to-v2)
- v3 updates:
  - [billboard.js 3.0 release: D3.js v6 support & new candlestick type!](https://netil.medium.com/billboard-js-3-0-release-d3-js-v6-support-new-candlestick-type-9bd74af6a753)

## Questions?
If you have any questions, checkout the previous posts or create a new one at:
- [Stack Overflow: billboard.js tagged posts](https://stackoverflow.com/questions/tagged/billboard.js)
- [Issue with 'question' label](https://github.com/naver/billboard.js/issues?utf8=%E2%9C%93&q=label%3Aquestion)

## Supported chart types
<img src="https://naver.github.io/billboard.js/img/chart-types.png?v=10" width=800>

## Download and Installation

Download dist files from the repo directly or install it via npm.

<details>
  <summary>Dist file list from the repo. (click to expand)</summary>

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

</details>

### Themes
> If you want apply themes, simply load one of the theme css file provided instead of the default css file.
> - [Screenshot Preview](https://github.com/naver/billboard.js/wiki/Themes)


<details>
  <summary>Dist theme file list from the repo. (click to expand)</summary>

#### datalab
- https://naver.github.io/billboard.js/release/latest/dist/theme/datalab.css
- https://naver.github.io/billboard.js/release/latest/dist/theme/datalab.min.css


#### insight
- https://naver.github.io/billboard.js/release/latest/dist/theme/insight.css
- https://naver.github.io/billboard.js/release/latest/dist/theme/insight.min.css

#### graph
- https://naver.github.io/billboard.js/release/latest/dist/theme/graph.css
- https://naver.github.io/billboard.js/release/latest/dist/theme/graph.min.css

</details>

### Nightly version

Nightly version is the latest build from the master branch.
With nightly, you can try upcoming changes prior the official release.

- https://github.com/naver/billboard.js/tree/nightly/dist

> The version info will be given as the build datetime: `x.x.x-nightly-yyyymmddhhmmss`

There're two ways to install from `nightly` branch directly.
```js
// Specify on 'package.json' file
"dependencies": {
      ...
      "billboard.js": "naver/billboard.js#nightly"
},
```

```sh
# Run install command from shell
$ npm install git+https://github.com/naver/billboard.js.git#nightly --save
```

### Next(Release Canditate) version

Next version is the 'release candidate' build, prior the latest official release.

```sh
# Run install command from shell
$ npm install billboard.js@next --save
```

### Installation with npm

```bash
$ npm install billboard.js
```

### Packages

Name | For | Description
:---: | :---:| :---:
[![bb][badge-@billboard.js/react]][link-@billboard.js/react] | ![React][badge-react] | React component for billboard.js

### Using CDN

If you want to use 'billboard.js' without installation, load files directly from one of the CDN providers.

- cdnjs: https://cdnjs.com/libraries/billboard.js
- jsDelivr: https://cdn.jsdelivr.net/npm/billboard.js/dist/
- PageCDN: https://pagecdn.com/lib/billboardjs
- unpkg: https://unpkg.com/billboard.js/dist/

## Supported Browsers

> - Basically will work on all SVG supported browsers.
> - <sup>*</sup>Notes for legacy browsers:
>   - Recommended to use `packaged` build or construct your own build following [`How to bundle for legacy browsers?`](https://github.com/naver/billboard.js/wiki/How-to-bundle-for-legacy-browsers%3F) instruction.
>   - D3.js dropped the support of legacy browsers since [v6](https://observablehq.com/@d3/d3v6-migration-guide).
>   - The support isn't fully guaranteed.

|Internet Explorer|Chrome|Firefox|Safari|iOS|Android|
|---|---|---|---|---|---|
|9+<sup>*</sup>|Latest|Latest|Latest|8+|4+|


## Dependency by version

[D3.js](https://d3js.org/) (required)| billboard.js
 :---: | :---:
 4.x ~ 5.x | 1.x ~ 2.x
 6.x+ | 3.x+

Load billboard.js after D3.js.

```html
<!-- 1) Load D3.js and billboard.js separately -->
    <!-- Load D3: -->
    <script src="https://d3js.org/d3.v6.min.js"></script>

    <!-- Load billboard.js with base(or theme) style -->
    <link rel="stylesheet" href="$YOUR_PATH/billboard.css">
    <script src="$YOUR_PATH/billboard.js"></script>

<!-- 2) or Load billboard.js packaged with D3.js -->
    <link rel="stylesheet" href="$YOUR_PATH/billboard.css">
    <script src="$YOUR_PATH/billboard.pkgd.js"></script>
```

or use importing ESM.
> 📌 Also check: [How to load as ESM directly from the browser?](https://github.com/naver/billboard.js/wiki/How-to-load-as-ESM-directly-from-the-browser%3F)

```js
// 1) import billboard.js
// as named import with desired shapes and interaction modules
// https://github.com/naver/billboard.js/wiki/CHANGELOG-v2#modularization-by-its-functionality
import {bb, area, bar, zoom} from "billboard.js";

// or as importing default
import bb, {area, bar, zoom} from "billboard.js";

// 2) import css if your dev-env supports. If don't, include them via <link>
import "billboard.js/dist/billboard.css";

// or theme style. Find more themes from 'theme' folder
import "billboard.js/dist/theme/insight.css"
```

> **Note**
> - For migration from C3.js, checkout the [migration guide](https://github.com/naver/billboard.js/wiki/How-to-migrate-from-C3.js%3F).
> - If has an issue bundling for legacy browsers, checkout "[How to bundle for legacy browsers?](https://github.com/naver/billboard.js/wiki/How-to-bundle-for-legacy-browsers%3F)".

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
      // for ESM import usage, import 'line' module and execute it as
      // type: line(),
      type: "line",
      columns: [
          ["data1", 30, 200, 100, 400, 150, 250]
      ]
    },
    zoom: {
      // for ESM import usage, import 'zoom' module and execute it as
      // enabled: zoom()
      enabled: true
    }
});

// call some API
chart.load( ... );
```

## License
billboard.js is released under the [MIT license](https://github.com/naver/billboard.js/blob/master/LICENSE).

```
Copyright (c) 2017 ~ present NAVER Corp.

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
[badge-jsDelivr]: https://data.jsdelivr.com/v1/package/npm/billboard.js/badge?style=rounded
[badge-ci-status]: https://github.com/naver/billboard.js/workflows/CI/badge.svg
[badge-coverage]: https://coveralls.io/repos/github/naver/billboard.js/badge.svg
[badge-snyk]: https://snyk.io/test/github/naver/billboard.js/badge.svg?targetFile=package.json
[badge-gzip-size]: https://img.badgesize.io/https://unpkg.com/billboard.js/dist/billboard.min.js?compression=gzip
[badge-latest]: https://img.shields.io/npm/v/billboard.js/latest.svg
[badge-next]: https://img.shields.io/npm/v/billboard.js/next.svg
[badge-semantic-release]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[badge-react]: https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=fff&labelColor=grey&color=62d9fb
[badge-@billboard.js/react]: https://img.shields.io/npm/v/@billboard.js/react?style=flat&labelColor=grey&label=%40billboard.js%2Freact

<!-- links -->
[link-download]: https://npm-stat.com/charts.html?package=billboard.js&from=2017-06-08
[link-jsDelivr]: https://www.jsdelivr.com/package/npm/billboard.js
[link-version]: https://www.npmjs.com/package/billboard.js
[link-coverage]: https://coveralls.io/github/naver/billboard.js
[link-snyk]: https://snyk.io/test/github/naver/billboard.js?targetFile=package.json
[link-gzip-size]: https://unpkg.com/billboard.js/dist/billboard.min.js
[link-semantic-release]: https://github.com/semantic-release/semantic-release
[link-@billboard.js/react]: https://www.npmjs.com/package/@billboard.js/react

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fnaver%2Fbillboard.js.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fnaver%2Fbillboard.js?ref=badge_large)
