## [3.0.2](https://github.com/naver/billboard.js/compare/3.0.1...3.0.2) (2021-03-31)


### Bug Fixes

* **type:** filter nullish data ([857bbca](https://github.com/naver/billboard.js/commit/857bbca08dff854782fc604a820882e326a6288b)), closes [#2020](https://github.com/naver/billboard.js/issues/2020)

## [3.0.1](https://github.com/naver/billboard.js/compare/3.0.0...3.0.1) (2021-03-26)


### Bug Fixes

* **axis:** calculate x axis height correctly for negative tick rotation settings ([fe42e64](https://github.com/naver/billboard.js/commit/fe42e64ca2bab7532cd2933fe4da5925d37e384c)), closes [#1994](https://github.com/naver/billboard.js/issues/1994) [#1995](https://github.com/naver/billboard.js/issues/1995)
* **candlestick:** fix exporting candlestick module ([1a9b75b](https://github.com/naver/billboard.js/commit/1a9b75b1cd183d86aabc9d0a17bb83e4bad12225)), closes [#2007](https://github.com/naver/billboard.js/issues/2007)
* **deploy:** fix deploying gh-pages ([baec455](https://github.com/naver/billboard.js/commit/baec4551df4ad74bd7cfda2f6bc19f12bc6ac47b))

# [3.0.0](https://github.com/naver/billboard.js/compare/2.2.6...3.0.0) (2021-03-26)


### Bug Fixes

* **axis:** fix axis.x.max error throw ([de06361](https://github.com/naver/billboard.js/commit/de063614b96ac938631aa11a9a7059ec53a4bc59)), closes [#1981](https://github.com/naver/billboard.js/issues/1981)
* **axis:** fix axis.x.tick.tooltip on rotated axis ([eed2f86](https://github.com/naver/billboard.js/commit/eed2f86ace926f65d69ee55c46b88a5b9b6c15c0)), closes [#1990](https://github.com/naver/billboard.js/issues/1990)
* **subchart:** fix duplicated node generation on data load ([d9a5d9a](https://github.com/naver/billboard.js/commit/d9a5d9a7f89e87f48b0bc5654ba097f6d7aa52c2)), closes [#2003](https://github.com/naver/billboard.js/issues/2003)
* **zoom:** fix zoom on latest chrome ([37edc9b](https://github.com/naver/billboard.js/commit/37edc9b55d55ecf5f67f104927499cae05eca3fa)), closes [/github.com/d3/d3-zoom/issues/231#issuecomment-802305692](https://github.com//github.com/d3/d3-zoom/issues/231/issues/issuecomment-802305692) [#1992](https://github.com/naver/billboard.js/issues/1992)


### Features

* **all:** update for d3 v6 ([2752e55](https://github.com/naver/billboard.js/commit/2752e5541dc2e6d9d54acd1a936756a745e30002)), closes [#1641](https://github.com/naver/billboard.js/issues/1641)
* **api:** Enhance .export() option to specify size ([3c2de80](https://github.com/naver/billboard.js/commit/3c2de807ffd2f82d8fa7d2ff1dbf4901be873405)), closes [#815](https://github.com/naver/billboard.js/issues/815) [#1969](https://github.com/naver/billboard.js/issues/1969)
* **api:** Intent to ship subchart APIs ([5572dc9](https://github.com/naver/billboard.js/commit/5572dc937ba44af2c6ae0e68cb60d8f72bd017ec)), closes [#1993](https://github.com/naver/billboard.js/issues/1993)
* **candlestick:** Intent to ship candlestick ([8d37bd8](https://github.com/naver/billboard.js/commit/8d37bd896827ac080f0585036efe1240038b2b92)), closes [#76](https://github.com/naver/billboard.js/issues/76) [#1167](https://github.com/naver/billboard.js/issues/1167)
* **candlestick:** Intent to ship candlestick type ([42307cb](https://github.com/naver/billboard.js/commit/42307cbabd80a9bd23cef7ac1ccc982787803921))


### BREAKING CHANGES

* **all:** - Update to work on d3 v6
- Added getPoint() to get event's position coordinate

https://github.com/d3/d3/blob/master/CHANGES.md
https://observablehq.com/d/f91cccf0cad5e9cb

# [3.0.0-next.1](https://github.com/naver/billboard.js/compare/2.2.2...3.0.0-next.1) (2021-02-08)


### Features

* **all:** update for d3 v6 ([2752e55](https://github.com/naver/billboard.js/commit/2752e5541dc2e6d9d54acd1a936756a745e30002)), closes [#1641](https://github.com/naver/billboard.js/issues/1641)


### BREAKING CHANGES

* **all:** - Update to work on d3 v6
- Added getPoint() to get event's position coordinate

## [2.2.6](https://github.com/naver/billboard.js/compare/2.2.5...2.2.6) (2021-03-11)


### Bug Fixes

* **tooltip:** fix linked tooltip recursive call ([b6af8ec](https://github.com/naver/billboard.js/commit/b6af8ec4be0e5677f5d6ce7555c986920e47c2b5)), closes [#1979](https://github.com/naver/billboard.js/issues/1979)

## [2.2.5](https://github.com/naver/billboard.js/compare/2.2.4...2.2.5) (2021-03-05)


### Bug Fixes

* **axis:** remove x axis transition during resize ([a938681](https://github.com/naver/billboard.js/commit/a9386819449774a4ef4b3fb31466b6ea669dbbb4)), closes [#1949](https://github.com/naver/billboard.js/issues/1949)

## [2.2.4](https://github.com/naver/billboard.js/compare/2.2.3...2.2.4) (2021-03-04)


### Bug Fixes

* **legend:** fix hiding via .hide() ([c489a77](https://github.com/naver/billboard.js/commit/c489a7769d526d1e32e540589f6111f1cc875a5f)), closes [#1950](https://github.com/naver/billboard.js/issues/1950)
* **zoom:** fix x Axis tick transition during zoom ([3f08b11](https://github.com/naver/billboard.js/commit/3f08b11a0041b08ef70b194d5d855c65da430efa)), closes [#1949](https://github.com/naver/billboard.js/issues/1949)
>>>>>>> master

## [2.2.3](https://github.com/naver/billboard.js/compare/2.2.2...2.2.3) (2021-02-16)


### Bug Fixes

* **api:** fix loading area-line-range ([fe46492](https://github.com/naver/billboard.js/commit/fe4649249fb3fed67df26e08b7142a7614c05ac3)), closes [#1938](https://github.com/naver/billboard.js/issues/1938)
* **legend:** legend.inset.anchor is working again ([b5ba930](https://github.com/naver/billboard.js/commit/b5ba9307c0ee734dad032b795952a9f444137a6d)), closes [#1935](https://github.com/naver/billboard.js/issues/1935) [#1936](https://github.com/naver/billboard.js/issues/1936)

## [2.2.2](https://github.com/naver/billboard.js/compare/2.2.1...2.2.2) (2021-02-05)


### Bug Fixes

* **grid:** fix rendering when interaction is disabled ([d194a83](https://github.com/naver/billboard.js/commit/d194a836893cedb7e3402379abd88fd078c31fe9)), closes [#1924](https://github.com/naver/billboard.js/issues/1924)
* **shape:** retrieve raw x scale value ([38ac0a7](https://github.com/naver/billboard.js/commit/38ac0a7262df60824de04917275ee5080422055e)), closes [#1927](https://github.com/naver/billboard.js/issues/1927)

## [2.2.1](https://github.com/naver/billboard.js/compare/2.2.0...2.2.1) (2021-02-01)


### Bug Fixes

* **build:** suport for legacy browser ([594d18e](https://github.com/naver/billboard.js/commit/594d18e4aa201c4ba5b33b22640c0ab035992503)), closes [/webpack.js.org/migrate/5/#need-to-support-an-older-browser-like-ie-11](https://github.com//webpack.js.org/migrate/5//issues/need-to-support-an-older-browser-like-ie-11) [#1913](https://github.com/naver/billboard.js/issues/1913)
* **gauge:** units position if fullCircle ([62cd79e](https://github.com/naver/billboard.js/commit/62cd79edd10c5628351bec026288c48e3f822856)), closes [#1914](https://github.com/naver/billboard.js/issues/1914)

# [2.2.0](https://github.com/naver/billboard.js/compare/2.1.4...2.2.0) (2021-01-26)


### Bug Fixes

* **api:** fix incorrect legend text positioning ([f1ede3f](https://github.com/naver/billboard.js/commit/f1ede3f48b4802b0a1b7ec11776fae20fce18840)), closes [#1888](https://github.com/naver/billboard.js/issues/1888)
* **api:** fix zoom for timesries axis ([0421a50](https://github.com/naver/billboard.js/commit/0421a50ca306738fa76a56fe9694c65141ea54fe)), closes [#1868](https://github.com/naver/billboard.js/issues/1868)
* **arc:** fix setting color value ([fad9e86](https://github.com/naver/billboard.js/commit/fad9e86fa172cb14a2cc6f2fb8418e72a5932192)), closes [#1857](https://github.com/naver/billboard.js/issues/1857) [#1847](https://github.com/naver/billboard.js/issues/1847)
* **axis:** fix incorrect tick interval calculation ([1a96f3e](https://github.com/naver/billboard.js/commit/1a96f3e6a2a98cea3faf163851a1cbf46a295b72)), closes [#1896](https://github.com/naver/billboard.js/issues/1896)
* **axis:** rotated horizontal xAxisHeight is calculated correctly after loading new data ([ef2754f](https://github.com/naver/billboard.js/commit/ef2754fb71e7597fa1f0c6c61fc4e4bf281904fb)), closes [#1786](https://github.com/naver/billboard.js/issues/1786) [#1787](https://github.com/naver/billboard.js/issues/1787)
* **bar:** fix bar width on zoom ([25e987a](https://github.com/naver/billboard.js/commit/25e987aae1ca9ee704f39109a3586e4f49d0f5c7)), closes [#1907](https://github.com/naver/billboard.js/issues/1907)
* **bar:** fix bar width rendering for 'total' data key ([eacaecb](https://github.com/naver/billboard.js/commit/eacaecb855e156b6107fe1564da5c6a941ba4b65)), closes [#1818](https://github.com/naver/billboard.js/issues/1818)
* **browser:** fix referencing global order ([8f84cb3](https://github.com/naver/billboard.js/commit/8f84cb326b6c6b0dc341ae65b9cdcdae53e7e9b0)), closes [#1778](https://github.com/naver/billboard.js/issues/1778)
* **browser:** fix retrieving global ([3474ac0](https://github.com/naver/billboard.js/commit/3474ac06ecf7676312b35a18e3f985816339e029)), closes [#1826](https://github.com/naver/billboard.js/issues/1826)
* **color:** fix color callback mismatch ([86ef214](https://github.com/naver/billboard.js/commit/86ef214a2daf22fb7e4058644776c9d1101e7350)), closes [#1847](https://github.com/naver/billboard.js/issues/1847)
* **data:** fix data.order to work for arc types ([3a716a0](https://github.com/naver/billboard.js/commit/3a716a0984364291fd0b7dd90edb268721faf7d0)), closes [#1863](https://github.com/naver/billboard.js/issues/1863)
* **eventrect:** fix resizing event rect element after .load() ([12bf547](https://github.com/naver/billboard.js/commit/12bf547c131e69333f02337e2492a4ebb10b87b9)), closes [#1864](https://github.com/naver/billboard.js/issues/1864)
* **eventRect:** fix data.onclick work for scatter/bubble ([109c87d](https://github.com/naver/billboard.js/commit/109c87dc09dc1daa274ade5bf2806ad3716d3135)), closes [#1795](https://github.com/naver/billboard.js/issues/1795)
* **point:** fix usePoint defs id value ([6df4653](https://github.com/naver/billboard.js/commit/6df465310e9862704a5a423cc2526c0312c1a29e)), closes [#1887](https://github.com/naver/billboard.js/issues/1887)
* **radar:** fix data label text position ([c69d674](https://github.com/naver/billboard.js/commit/c69d674e5ff9d7d3c0e0678fab74c5275bbe92af)), closes [#1871](https://github.com/naver/billboard.js/issues/1871)
* **text:** data labels are working in Internet Explorer again ([865224e](https://github.com/naver/billboard.js/commit/865224e77f02b0542e8d0acf3d2bfef219cf7702)), closes [#1877](https://github.com/naver/billboard.js/issues/1877)
* **tooltip:** fix arc's tooltip interaction ([a8586a3](https://github.com/naver/billboard.js/commit/a8586a3ec2234a11d1b531b1a22908b275d57a08)), closes [#1859](https://github.com/naver/billboard.js/issues/1859)
* **types:** fix .load() data type ([7108e7b](https://github.com/naver/billboard.js/commit/7108e7b0e391c41067aae850ce547376096be12c)), closes [#1848](https://github.com/naver/billboard.js/issues/1848)


### Features

* **api:** make return values for axis.labels() ([efa5174](https://github.com/naver/billboard.js/commit/efa517417ec2900cb00a94adced61ee743449db4)), closes [#1865](https://github.com/naver/billboard.js/issues/1865)
* **data:** Intent to ship data.label multiline ([8903aa6](https://github.com/naver/billboard.js/commit/8903aa69796e4af9227c2172cf088d0253abee41)), closes [#1784](https://github.com/naver/billboard.js/issues/1784)
* **data.labels.colors:** Add callback support ([ac1affa](https://github.com/naver/billboard.js/commit/ac1affa0ebb2de238591be4e295563203afcd258)), closes [#1845](https://github.com/naver/billboard.js/issues/1845)
* **gauge:** added support for drawing gauge from 'startingAngle' to 'arcLength' ([25954ad](https://github.com/naver/billboard.js/commit/25954ad5d4db2e4207cc5614e9e3b477e537a184)), closes [#1633](https://github.com/naver/billboard.js/issues/1633) [#1803](https://github.com/naver/billboard.js/issues/1803) [#1849](https://github.com/naver/billboard.js/issues/1849)
* **gauge:** Intent to ship gauge.background ([632c600](https://github.com/naver/billboard.js/commit/632c600a65c831760a03c355c21b56d66c929cbf)), closes [#1804](https://github.com/naver/billboard.js/issues/1804)
* **pie:** Intent to ship pie.outerRadius ([ca67418](https://github.com/naver/billboard.js/commit/ca67418bfb0b14f8650a8934c953f2a343e06da7)), closes [#1825](https://github.com/naver/billboard.js/issues/1825)
* **point:** Intent to ship point.opacity ([fc5ad35](https://github.com/naver/billboard.js/commit/fc5ad35d5a18b1eb3ddb1f96639c5c5746e807ad)), closes [#1867](https://github.com/naver/billboard.js/issues/1867)

## [2.1.4](https://github.com/naver/billboard.js/compare/2.1.3...2.1.4) (2020-11-11)


### Bug Fixes

* **api:** fix tooltip showing when lesser data loaded ([74320cf](https://github.com/naver/billboard.js/commit/74320cfd0aaa1d181d23b1ea971a7573d2d11c56)), closes [#1761](https://github.com/naver/billboard.js/issues/1761)
* **event:** fix referencing event element ([38568c1](https://github.com/naver/billboard.js/commit/38568c18d729f52a7dc913a523763cd4e74f6d91)), closes [#1752](https://github.com/naver/billboard.js/issues/1752)
* **gauge:** fix to be consistent max label value ([0c2006f](https://github.com/naver/billboard.js/commit/0c2006fdf156a4372da399f2d1d3448bf9874f91)), closes [#1759](https://github.com/naver/billboard.js/issues/1759)
* **radar:** fix labels showing on esm usage ([d56ff52](https://github.com/naver/billboard.js/commit/d56ff52512d80450e314f28cf2c930d0d815ee04)), closes [#1765](https://github.com/naver/billboard.js/issues/1765)
* **shape:** shape not showing on ie11 ([d1366d1](https://github.com/naver/billboard.js/commit/d1366d17869770859666691fca6153fd675dea83)), closes [#1758](https://github.com/naver/billboard.js/issues/1758)
* **tooltip:** fix to reset pending events from .show() ([ce8210c](https://github.com/naver/billboard.js/commit/ce8210c201c9a5ee7abdefabc1fc9d84a0876be9)), closes [#1753](https://github.com/naver/billboard.js/issues/1753)
* **zoom:** fix throwing TypeError during zoom  ([f2787fa](https://github.com/naver/billboard.js/commit/f2787fa9b951b322801d38aab51e3313c57e2d8f)), closes [#1760](https://github.com/naver/billboard.js/issues/1760)

## [2.1.3](https://github.com/naver/billboard.js/compare/2.1.2...2.1.3) (2020-10-23)


### Bug Fixes

* **event:** Fix handling for single x Axis data ([84eaa6b](https://github.com/naver/billboard.js/commit/84eaa6bd4a2fe3c8c8f064cf3fd6d4be475508e7)), closes [#1737](https://github.com/naver/billboard.js/issues/1737)
* **point:** fix error when data has spaced name ([6ff9aec](https://github.com/naver/billboard.js/commit/6ff9aec01d831c8fe2449da6b87121281829f209)), closes [#1739](https://github.com/naver/billboard.js/issues/1739)

## [2.1.2](https://github.com/naver/billboard.js/compare/2.1.1...2.1.2) (2020-10-12)


### Bug Fixes

* **api:** fix resizing event element ([6c12241](https://github.com/naver/billboard.js/commit/6c1224106a3087ce6b55b756ab0051b993bd3488)), closes [#1695](https://github.com/naver/billboard.js/issues/1695)
* **tooltip:** fix error throwing for tootip.show=false ([5164346](https://github.com/naver/billboard.js/commit/5164346c15abdc895ff917113367ee9c094ec7cc)), closes [#1715](https://github.com/naver/billboard.js/issues/1715)
* **zoom:** fix to work on point.focus.only ([af1dbd7](https://github.com/naver/billboard.js/commit/af1dbd7acbc687095e5712edb2fedbee0ffddce1)), closes [#1703](https://github.com/naver/billboard.js/issues/1703)

## [2.1.1](https://github.com/naver/billboard.js/compare/2.1.0...2.1.1) (2020-09-25)


### Bug Fixes

* **interaction:** Fix wrong tooltip event coordinate ([b892515](https://github.com/naver/billboard.js/commit/b8925159f115d8c99cf6e79017a8e37088b9f140)), closes [#1695](https://github.com/naver/billboard.js/issues/1695) [#1642](https://github.com/naver/billboard.js/issues/1642)

# [2.1.0](https://github.com/naver/billboard.js/compare/2.0.3...2.1.0) (2020-09-25)


### Bug Fixes

* **api:** prevent TypeError when chart already destroyed ([ce42768](https://github.com/naver/billboard.js/commit/ce427689a3c5234284382a3225fa39379862a240)), closes [#1613](https://github.com/naver/billboard.js/issues/1613)
* **axis:** fix y axis clip-path coordinates ([bdf7694](https://github.com/naver/billboard.js/commit/bdf769465aaf6c60babd5c91e22186a4c172cc78)), closes [#1572](https://github.com/naver/billboard.js/issues/1572)
* **bar:** Fix not firing data.onclick ([62e7a10](https://github.com/naver/billboard.js/commit/62e7a10a42d8eb80f5c6653533e8a49db4a7b52b)), closes [#1619](https://github.com/naver/billboard.js/issues/1619) [#1620](https://github.com/naver/billboard.js/issues/1620)
* **bar:** fix on bar tooglip grouped false ([4bd69be](https://github.com/naver/billboard.js/commit/4bd69be8a3ae06c3cb056577f5300b54f5794ebf)), closes [/github.com/naver/billboard.js/issues/1663#issuecomment-690991679](https://github.com//github.com/naver/billboard.js/issues/1663/issues/issuecomment-690991679)
* **grid:** Fix grid text position update ([056b565](https://github.com/naver/billboard.js/commit/056b565c738dd5f1ce3edf3d4bd78b4942bb5882)), closes [#1592](https://github.com/naver/billboard.js/issues/1592)
* **interaction:** bind touch event only for rect element ([12da3e4](https://github.com/naver/billboard.js/commit/12da3e46535128ddefa1d217e74863e8ad2c7687)), closes [#1650](https://github.com/naver/billboard.js/issues/1650)
* upgrade d3-ease from 1.0.6 to 1.0.7 ([#1617](https://github.com/naver/billboard.js/issues/1617)) ([4f78533](https://github.com/naver/billboard.js/commit/4f78533a900d9950f4ba8afac5f4fd269468d579))
* **interaction:** correct draggable selection functionality ([160f873](https://github.com/naver/billboard.js/commit/160f8734bc1aef4d83e9861977c454f58ef46455)), closes [#1642](https://github.com/naver/billboard.js/issues/1642)
* upgrade d3-brush from 1.1.5 to 1.1.6 ([#1605](https://github.com/naver/billboard.js/issues/1605)) ([624f044](https://github.com/naver/billboard.js/commit/624f044422c889702a8af77589dac15855a5f137))
* **interaction:** fix for data point click on mobile ([727c26f](https://github.com/naver/billboard.js/commit/727c26f52d92b185cb716ac480e934c1063d99b3)), closes [#1651](https://github.com/naver/billboard.js/issues/1651)
* **interaction:** fix retrieving event rect position ([6fc449e](https://github.com/naver/billboard.js/commit/6fc449e51a6deb92d7fd5a6f67b200b474a7b65d)), closes [#1670](https://github.com/naver/billboard.js/issues/1670)
* **legend:** Fix error for color.threshold option ([6e06629](https://github.com/naver/billboard.js/commit/6e06629bf36100404d6f4dae55a84f80e727c1f4)), closes [#1604](https://github.com/naver/billboard.js/issues/1604) [#1611](https://github.com/naver/billboard.js/issues/1611)
* **legend:** Make legend blurry after click ([319d608](https://github.com/naver/billboard.js/commit/319d6081d32c438fb261e0215774e0d7b24cc8f2)), closes [#1599](https://github.com/naver/billboard.js/issues/1599)
* **shape:** fix possible condition removal by transpiler ([781fb61](https://github.com/naver/billboard.js/commit/781fb61569f40cb466463b064235aa0681cdf58c)), closes [#1663](https://github.com/naver/billboard.js/issues/1663)
* **step:** Fix rendering nullish data ([dbe7b9b](https://github.com/naver/billboard.js/commit/dbe7b9b40f9666ba0c11261f1af91f271c794631)), closes [#1637](https://github.com/naver/billboard.js/issues/1637)
* **types:** Fix donut option types ([1917169](https://github.com/naver/billboard.js/commit/19171699ab1855a3bd19bfdd7188e9b7a257c0ef)), closes [#1615](https://github.com/naver/billboard.js/issues/1615)
* **types:** Specify context for callbacks ([f3b9f26](https://github.com/naver/billboard.js/commit/f3b9f26d0b218411f5e075c971a0b05f6a9cea0b)), closes [#1551](https://github.com/naver/billboard.js/issues/1551)


### Features

* **area:** Intent to ship area.front ([fe315dc](https://github.com/naver/billboard.js/commit/fe315dcbd6b1512712f2161a8a8f8d5b5de60374)), closes [#1543](https://github.com/naver/billboard.js/issues/1543)
* **axis:** Improve log scale to handle 0 ([ca6cf62](https://github.com/naver/billboard.js/commit/ca6cf62b52cf908a8d63e27816c23bdabe735ef2)), closes [#1578](https://github.com/naver/billboard.js/issues/1578)
* **axis:** Intent to ship axis.y2.type ([a94c25e](https://github.com/naver/billboard.js/commit/a94c25e33f3b1081b4edc3d49d3aee54d2520651)), closes [#1575](https://github.com/naver/billboard.js/issues/1575)
* **interaction:** avoid multiple <rect> generation ([97df63a](https://github.com/naver/billboard.js/commit/97df63a38cb1dff5e1b43b1792a4195c2beb9a1f)), closes [#1642](https://github.com/naver/billboard.js/issues/1642)
* **plugin:** Add JS  Plugin class file ([4a20480](https://github.com/naver/billboard.js/commit/4a204805a16b59797ba249bdf6c145a9f194d1da)), closes [#1665](https://github.com/naver/billboard.js/issues/1665)
* **theme:** Add new 'datalab' theme ([aba20d4](https://github.com/naver/billboard.js/commit/aba20d49407ce688c96e55bceeb80c3f401c291f)), closes [#241](https://github.com/naver/billboard.js/issues/241)

## [2.0.2](https://github.com/naver/billboard.js/compare/2.0.1...2.0.2) (2020-07-24)


### Bug Fixes

* **arc:** wrong right padding calculation ([f5a8602](https://github.com/naver/billboard.js/commit/f5a860217667cfa931a8fe4c7f8f41f7ff737d28)), closes [#1545](https://github.com/naver/billboard.js/issues/1545)
* **area:** Fix dynamic area loading ([9d6e1e0](https://github.com/naver/billboard.js/commit/9d6e1e085e67a9b4d05d28c726eb451c1aa691e1)), closes [#1547](https://github.com/naver/billboard.js/issues/1547)

## [2.0.1](https://github.com/naver/billboard.js/compare/2.0.0...2.0.1) (2020-07-20)


### Bug Fixes

* **types:** add missing named exports ([5dc77b5](https://github.com/naver/billboard.js/commit/5dc77b599b1ff314c87581c123157ff61d1a6950)), closes [#1520](https://github.com/naver/billboard.js/issues/1520)

# [2.0.0](https://github.com/naver/billboard.js/compare/1.12.11...2.0.0) (2020-07-16)


### Bug Fixes

* **all:** Fix test cases ([2e1ad79](https://github.com/naver/billboard.js/commit/2e1ad799345353f2a2a6ee26f1338c2e9c3cba9d))
* **arc:** fix applying data.labels.colors ([#1448](https://github.com/naver/billboard.js/issues/1448)) ([c128fad](https://github.com/naver/billboard.js/commit/c128fad2b62fafcbae54d754b77fe7d04e4cf403)), closes [#1440](https://github.com/naver/billboard.js/issues/1440)
* **axis:** fix incorrect clip node handling ([a8c6f96](https://github.com/naver/billboard.js/commit/a8c6f961f3b938256013a91304a373fa709c3e81)), closes [#1449](https://github.com/naver/billboard.js/issues/1449)
* **axis:** make axis clip-path to fit real axis size ([7419f44](https://github.com/naver/billboard.js/commit/7419f44c38037681a886e113b3e70a69b7cc1434)), closes [#1449](https://github.com/naver/billboard.js/issues/1449)
* **bar:** fix bar width scale on zoom ([59073bd](https://github.com/naver/billboard.js/commit/59073bdc143bb8fa2a2d2891859a9a67e3bdb402)), closes [#1476](https://github.com/naver/billboard.js/issues/1476)
* **data:** fix for data.labels=false ([b7a0972](https://github.com/naver/billboard.js/commit/b7a09726b5d62a3737685fdc3ae64fde597b8b61)), closes [#1444](https://github.com/naver/billboard.js/issues/1444)
* **data.selection:** fix selection.isselectable value check ([9d41a04](https://github.com/naver/billboard.js/commit/9d41a04983ff5f205d659158b4d4b5c33ef06af4))
* **gauge:** fixed wrong bottom padding calculation ([0542586](https://github.com/naver/billboard.js/commit/0542586b6ed3098c270982f086e9e503bc714983)), closes [#1441](https://github.com/naver/billboard.js/issues/1441) [#1471](https://github.com/naver/billboard.js/issues/1471)
* **legend:** Don't bind event when interaction is false ([4546c00](https://github.com/naver/billboard.js/commit/4546c00391eb2a50711a17ee5c1a2577f1c69140))
* **point:** Correct focus.only to work in mobile env ([67eea16](https://github.com/naver/billboard.js/commit/67eea16b494b8ea9c96cab01568813147dbff754))
* **point:** Correct point.focus.only ([1686594](https://github.com/naver/billboard.js/commit/1686594f19bb24185f3829740224b1285512dc49))
* **point:** update point generation ([da63e39](https://github.com/naver/billboard.js/commit/da63e39e79d50d0b150ddd40db2ee1c13a430edc))
* **subchar:** correct subchart rendering ([44ed216](https://github.com/naver/billboard.js/commit/44ed2160a722cd8794a586199d65d08d8d8350a9)), closes [#1458](https://github.com/naver/billboard.js/issues/1458)


### Code Refactoring

* **all:** v2 updates ([e23998f](https://github.com/naver/billboard.js/commit/e23998f994595c308d440e011124d590cd79b4d1)), closes [#758](https://github.com/naver/billboard.js/issues/758) [#757](https://github.com/naver/billboard.js/issues/757) [#756](https://github.com/naver/billboard.js/issues/756) [#36](https://github.com/naver/billboard.js/issues/36)
* **module:** implement ESM index ([85caf71](https://github.com/naver/billboard.js/commit/85caf71f25371fb35fffd5a763b533f8e1a7ece0))


### Features

* **axis:** Intent to ship log scale  ([6fdf3e4](https://github.com/naver/billboard.js/commit/6fdf3e47b2bbc6c4201758020b16c491d5c469cf)), closes [#1351](https://github.com/naver/billboard.js/issues/1351)
* **bar:** Intent to ship bar.label.threshold ([72a7b7f](https://github.com/naver/billboard.js/commit/72a7b7fd1220c2364ea7f6db5e0710bbdc984f59)), closes [#1427](https://github.com/naver/billboard.js/issues/1427)
* **gauge:** Intent to ship gauge.label.threshold ([#1443](https://github.com/naver/billboard.js/issues/1443)) ([9a0807e](https://github.com/naver/billboard.js/commit/9a0807e827de48709334f1c709e0e1ef2a632bb3)), closes [#1439](https://github.com/naver/billboard.js/issues/1439)
* **interaction:** split selection, subchart & zoom ([ba1e4f2](https://github.com/naver/billboard.js/commit/ba1e4f28ca4312d4cfcf112294d2c7afebd9121b))
* **point:** Intent to ship point.focus.only ([bb70347](https://github.com/naver/billboard.js/commit/bb7034727d54f4bba2507e998651bde2e1d1f116))


### BREAKING CHANGES

* **all:** v2 updates
* **module:** new index for ESM build

- split Axis releated size from size.ts --> size.axis.ts
- split common main option from Options.ts --> ./common/main.ts
- Instead export Axis class, add .getAxisInstance() to make beneficial
  from tree-shaking

# [2.0.0-next.9](https://github.com/naver/billboard.js/compare/2.0.0-next.8...2.0.0-next.9) (2020-07-08)


### Features

* **interaction:** split selection, subchart & zoom ([ba1e4f2](https://github.com/naver/billboard.js/commit/ba1e4f28ca4312d4cfcf112294d2c7afebd9121b))

# [2.0.0-next.8](https://github.com/naver/billboard.js/compare/2.0.0-next.7...2.0.0-next.8) (2020-07-02)


### Bug Fixes

* **bar:** fix bar width scale on zoom ([59073bd](https://github.com/naver/billboard.js/commit/59073bdc143bb8fa2a2d2891859a9a67e3bdb402)), closes [#1476](https://github.com/naver/billboard.js/issues/1476)


### Features

* **axis:** Intent to ship log scale  ([6fdf3e4](https://github.com/naver/billboard.js/commit/6fdf3e47b2bbc6c4201758020b16c491d5c469cf)), closes [#1351](https://github.com/naver/billboard.js/issues/1351)

# [2.0.0-next.7](https://github.com/naver/billboard.js/compare/2.0.0-next.6...2.0.0-next.7) (2020-06-26)


### Bug Fixes

* **gauge:** fixed wrong bottom padding calculation ([0542586](https://github.com/naver/billboard.js/commit/0542586b6ed3098c270982f086e9e503bc714983)), closes [#1441](https://github.com/naver/billboard.js/issues/1441) [#1471](https://github.com/naver/billboard.js/issues/1471)

# [2.0.0-next.6](https://github.com/naver/billboard.js/compare/2.0.0-next.5...2.0.0-next.6) (2020-06-23)


### Bug Fixes

* **subchar:** correct subchart rendering ([44ed216](https://github.com/naver/billboard.js/commit/44ed2160a722cd8794a586199d65d08d8d8350a9)), closes [#1458](https://github.com/naver/billboard.js/issues/1458)

# [2.0.0-next.5](https://github.com/naver/billboard.js/compare/2.0.0-next.4...2.0.0-next.5) (2020-06-19)


### Bug Fixes

* **axis:** fix incorrect clip node handling ([a8c6f96](https://github.com/naver/billboard.js/commit/a8c6f961f3b938256013a91304a373fa709c3e81)), closes [#1449](https://github.com/naver/billboard.js/issues/1449)
* **axis:** make axis clip-path to fit real axis size ([7419f44](https://github.com/naver/billboard.js/commit/7419f44c38037681a886e113b3e70a69b7cc1434)), closes [#1449](https://github.com/naver/billboard.js/issues/1449)

# [2.0.0-next.4](https://github.com/naver/billboard.js/compare/2.0.0-next.3...2.0.0-next.4) (2020-06-17)


### Bug Fixes

* **arc:** fix applying data.labels.colors ([#1448](https://github.com/naver/billboard.js/issues/1448)) ([c128fad](https://github.com/naver/billboard.js/commit/c128fad2b62fafcbae54d754b77fe7d04e4cf403)), closes [#1440](https://github.com/naver/billboard.js/issues/1440)
* **data:** fix for data.labels=false ([b7a0972](https://github.com/naver/billboard.js/commit/b7a09726b5d62a3737685fdc3ae64fde597b8b61)), closes [#1444](https://github.com/naver/billboard.js/issues/1444)
* **legend:** Don't bind event when interaction is false ([4546c00](https://github.com/naver/billboard.js/commit/4546c00391eb2a50711a17ee5c1a2577f1c69140))

# [2.0.0-next.3](https://github.com/naver/billboard.js/compare/2.0.0-next.2...2.0.0-next.3) (2020-06-15)


### Features

* **bar:** Intent to ship bar.label.threshold ([72a7b7f](https://github.com/naver/billboard.js/commit/72a7b7fd1220c2364ea7f6db5e0710bbdc984f59)), closes [#1427](https://github.com/naver/billboard.js/issues/1427)
* **gauge:** Intent to ship gauge.label.threshold ([#1443](https://github.com/naver/billboard.js/issues/1443)) ([9a0807e](https://github.com/naver/billboard.js/commit/9a0807e827de48709334f1c709e0e1ef2a632bb3)), closes [#1439](https://github.com/naver/billboard.js/issues/1439)

# [2.0.0-next.2](https://github.com/naver/billboard.js/compare/2.0.0-next.1...2.0.0-next.2) (2020-06-11)


### Bug Fixes

* **point:** update point generation ([da63e39](https://github.com/naver/billboard.js/commit/da63e39e79d50d0b150ddd40db2ee1c13a430edc))

# [2.0.0-next.1](https://github.com/naver/billboard.js/compare/1.12.0-next.5...2.0.0-next.1) (2020-06-08)


### Bug Fixes

* **all:** Fix test cases ([2e1ad79](https://github.com/naver/billboard.js/commit/2e1ad799345353f2a2a6ee26f1338c2e9c3cba9d))
* **point:** Correct focus.only to work in mobile env ([67eea16](https://github.com/naver/billboard.js/commit/67eea16b494b8ea9c96cab01568813147dbff754))
* **point:** Correct point.focus.only ([1686594](https://github.com/naver/billboard.js/commit/1686594f19bb24185f3829740224b1285512dc49))


### Code Refactoring

* **all:** v2 updates ([e23998f](https://github.com/naver/billboard.js/commit/e23998f994595c308d440e011124d590cd79b4d1)), closes [#758](https://github.com/naver/billboard.js/issues/758) [#757](https://github.com/naver/billboard.js/issues/757) [#756](https://github.com/naver/billboard.js/issues/756) [#36](https://github.com/naver/billboard.js/issues/36)
* **module:** implement ESM index ([85caf71](https://github.com/naver/billboard.js/commit/85caf71f25371fb35fffd5a763b533f8e1a7ece0))


### Features

* **point:** Intent to ship point.focus.only ([bb70347](https://github.com/naver/billboard.js/commit/bb7034727d54f4bba2507e998651bde2e1d1f116))


### BREAKING CHANGES

* **all:** v2 updates
* **module:** new index for ESM build

- split Axis releated size from size.ts --> size.axis.ts
- split common main option from Options.ts --> ./common/main.ts
- Instead export Axis class, add .getAxisInstance() to make beneficial
  from tree-shaking

# [1.12.0-next.5](https://github.com/naver/billboard.js/compare/1.12.0-next.4...1.12.0-next.5) (2020-03-11)


### Bug Fixes

* **axis:** Fix adding duplicated <title> element ([8d45075](https://github.com/naver/billboard.js/commit/8d45075eaa4529d4b4d4b44bedaa5c565a15f921)), closes [#1271](https://github.com/naver/billboard.js/issues/1271)
* **axis:** Fix axis label text position ([68b6b86](https://github.com/naver/billboard.js/commit/68b6b8688473672dc4aba466fa23844af71d999a)), closes [#1270](https://github.com/naver/billboard.js/issues/1270)
* **axis:** Fix axis tick rotate translate ([1bc3f20](https://github.com/naver/billboard.js/commit/1bc3f2020cd6d4535aafcc9b40f552f8b2c03c11)), closes [#1250](https://github.com/naver/billboard.js/issues/1250) [#1278](https://github.com/naver/billboard.js/issues/1278)
* **axis:** Fix for multi axes data bound  ([3f8afba](https://github.com/naver/billboard.js/commit/3f8afbaa86783055f8771db5b46b9432a3509a8d)), closes [/github.com/naver/billboard.js/pull/1233#issuecomment-595675546](https://github.com//github.com/naver/billboard.js/pull/1233/issues/issuecomment-595675546)
* **grid:** Fix focus grid to be maintained on resize  ([01ba388](https://github.com/naver/billboard.js/commit/01ba388477367c4c1bf7a52083331abbec34b136)), closes [#1239](https://github.com/naver/billboard.js/issues/1239)


### Features

* **axis:** Autorotate x axis tick texts on type "category" and "timeseries" ([8c51d02](https://github.com/naver/billboard.js/commit/8c51d02037f05e659082017ebca59dccbfbe2233)), closes [#1236](https://github.com/naver/billboard.js/issues/1236) [#1250](https://github.com/naver/billboard.js/issues/1250)

# [1.12.0-next.4](https://github.com/naver/billboard.js/compare/1.12.0-next.3...1.12.0-next.4) (2020-03-03)


### Bug Fixes

* **arc:** Fix overwriting gauge_max in MultiArcGauge with totalSum ([8b2c28e](https://github.com/naver/billboard.js/commit/8b2c28e900399e53545f0025c0a9d9ef24585598)), closes [#1259](https://github.com/naver/billboard.js/issues/1259) [#1260](https://github.com/naver/billboard.js/issues/1260)
* **axis:** Correct y Axis tick padding ([145b960](https://github.com/naver/billboard.js/commit/145b96026aabab81f41f4bad462b380e8b346085)), closes [#1251](https://github.com/naver/billboard.js/issues/1251)
* **callbacks:** Fix triggering in lazy rendering ([3e73fdf](https://github.com/naver/billboard.js/commit/3e73fdfd12e78ffa08e2755098c5c13753d3513d)), closes [#1254](https://github.com/naver/billboard.js/issues/1254)
* **tooltip:** Auto pos adjustion for tooltip ([c54f731](https://github.com/naver/billboard.js/commit/c54f731b87714e41ca43a7c29e9c2c46c35ec78b)), closes [#1243](https://github.com/naver/billboard.js/issues/1243) [#1239](https://github.com/naver/billboard.js/issues/1239)
* **tooltip:** Fix tooltip position on overlapping data point ([8dba213](https://github.com/naver/billboard.js/commit/8dba2134da94036437bda48a59aa5fca2dfb1d2e)), closes [#1267](https://github.com/naver/billboard.js/issues/1267)
* **tooltip,interaction:** Correct tooltip behaves for touch environment ([7090fa9](https://github.com/naver/billboard.js/commit/7090fa9e9b2a02930262551f0c609032818fd313)), closes [#1253](https://github.com/naver/billboard.js/issues/1253)


### Features

* **axis:** Intent to ship axis.x.min/max.fit ([1650955](https://github.com/naver/billboard.js/commit/165095523d6a71ab677bc2de1df3fbcf3793d63c)), closes [#7](https://github.com/naver/billboard.js/issues/7)

# [1.12.0-next.3](https://github.com/naver/billboard.js/compare/1.12.0-next.2...1.12.0-next.3) (2020-02-20)


### Bug Fixes

* **radar:** Correct text label not showing ([9109fd5](https://github.com/naver/billboard.js/commit/9109fd50b718c3a23b02e18dd3d2b163deef4465)), closes [#1241](https://github.com/naver/billboard.js/issues/1241)


### Features

* **tooltip:** Intent to ship tooltip.position.unit ([ac078a7](https://github.com/naver/billboard.js/commit/ac078a70372ea5aaa0302bf690c9149303060125)), closes [#1239](https://github.com/naver/billboard.js/issues/1239)

# [1.12.0-next.2](https://github.com/naver/billboard.js/compare/1.12.0-next.1...1.12.0-next.2) (2020-02-07)


### Features

* **axis:** Clone y/y2-axis domain if no data is bound to one of them ([96ac5c7](https://github.com/naver/billboard.js/commit/96ac5c7a2fd4632b14ab09a8d7fbe719f46417ae)), closes [#1231](https://github.com/naver/billboard.js/issues/1231) [#1233](https://github.com/naver/billboard.js/issues/1233)
* **axis:** Intent to ship y Axes stepSize ([429c6ec](https://github.com/naver/billboard.js/commit/429c6ecbe0fe7fb0fd7d6348fd66d34c685f4c22)), closes [#1098](https://github.com/naver/billboard.js/issues/1098)
* **tooltip:** Enhancement on callback options ([30a7718](https://github.com/naver/billboard.js/commit/30a7718d8a3bc5b6104452e35b34e3dbb8eb0db7)), closes [#1216](https://github.com/naver/billboard.js/issues/1216)

# [1.12.0-next.1](https://github.com/naver/billboard.js/compare/1.11.1...1.12.0-next.1) (2020-01-16)


### Bug Fixes

* **arc:** Fix handling spaced data name ([4824a47](https://github.com/naver/billboard.js/commit/4824a4742ef3242166708372c2d013e451317977)), closes [#1168](https://github.com/naver/billboard.js/issues/1168)
* **bar:** Bar's width resize according the zoom scale ([93184a2](https://github.com/naver/billboard.js/commit/93184a27ab916a1905d5c4b99a04f6f00c5f150b)), closes [#1185](https://github.com/naver/billboard.js/issues/1185)
* **core:** Fix onrendered firing time ([8b8665c](https://github.com/naver/billboard.js/commit/8b8665cbd21bb352973085873204994b390a0ee4)), closes [#1194](https://github.com/naver/billboard.js/issues/1194)
* **gauge:** fixed wrong ratio calculation in 'gauge.type = "single"' ([9020246](https://github.com/naver/billboard.js/commit/902024679dd7b713e75388a92d43b88092c0f0fa)), closes [#1205](https://github.com/naver/billboard.js/issues/1205)
* **interaction:** Fix null data point interaction ([901da84](https://github.com/naver/billboard.js/commit/901da84e644dbd5027041120ec068c99346e8b95)), closes [#1199](https://github.com/naver/billboard.js/issues/1199)
* **line:** Fix nullish data rendering with regions ([d0ca937](https://github.com/naver/billboard.js/commit/d0ca937364e9343c17fd8a0eb20d22baf6cbd7ec)), closes [#1172](https://github.com/naver/billboard.js/issues/1172)
* **tooltip:** Revert on pointer-events css prop ([c74c27a](https://github.com/naver/billboard.js/commit/c74c27a5ee2125177ce2b27a679da92112c15dd9)), closes [#1124](https://github.com/naver/billboard.js/issues/1124) [#1155](https://github.com/naver/billboard.js/issues/1155)


### Features

* **axis:** Intent to ship axis.y2.tick.rotate ([98992f3](https://github.com/naver/billboard.js/commit/98992f39fe612ec5252c2599c9b10306f8bd819c)), closes [#1157](https://github.com/naver/billboard.js/issues/1157) [#1158](https://github.com/naver/billboard.js/issues/1158)
* **gauge:** more than one arc are possible for gauges ([7a80e02](https://github.com/naver/billboard.js/commit/7a80e021f64070caa1ee9ea9b7d842472d6e8e5e)), closes [#787](https://github.com/naver/billboard.js/issues/787) [#1071](https://github.com/naver/billboard.js/issues/1071) [#1163](https://github.com/naver/billboard.js/issues/1163)
* **grid:** Intent to ship grid.focus.y ([13d65d1](https://github.com/naver/billboard.js/commit/13d65d13fb81701da27027b636bc108236577ac4)), closes [#1154](https://github.com/naver/billboard.js/issues/1154)
* **line:** Intent to ship bubble/line/scatter zerobased ([e45fb33](https://github.com/naver/billboard.js/commit/e45fb33147f7194bff6f5900d09d3b7a16e0ca0f)), closes [#1149](https://github.com/naver/billboard.js/issues/1149) [#1150](https://github.com/naver/billboard.js/issues/1150)
* **options:** Intent to ship Arc's expand.rate ([7d6f32f](https://github.com/naver/billboard.js/commit/7d6f32f499ba7e4176f1377a01fdb0c842cc1443)), closes [#1189](https://github.com/naver/billboard.js/issues/1189)
* **plugin:** Intent to ship bubblecompare plugin ([49704e0](https://github.com/naver/billboard.js/commit/49704e0147bada54d32ec4b1a3e0b42c2e6690fe)), closes [#1153](https://github.com/naver/billboard.js/issues/1153)
* **zoom:** Intent to ship zoom.reseteButton.onclick ([694cbcb](https://github.com/naver/billboard.js/commit/694cbcb75b50c04156a7706a505dd247e6106eb5)), closes [#1171](https://github.com/naver/billboard.js/issues/1171)

# [1.11.0-next.7](https://github.com/naver/billboard.js/compare/1.11.0-next.6@next...1.11.0-next.7@next) (2019-11-21)


### Bug Fixes

* **tooltip:** Remove 'pointer-events:none' inline set ([baa7bc6](https://github.com/naver/billboard.js/commit/baa7bc66ded0285c93db7d96c6d88a36f6b96b49)), closes [#1124](https://github.com/naver/billboard.js/issues/1124)


### Features

* **arc:** Intent to ship pie/donut.startingAngle ([b84be8e](https://github.com/naver/billboard.js/commit/b84be8e499712d00e0bef2ed8a6ffc55b87c7536)), closes [#1128](https://github.com/naver/billboard.js/issues/1128)
* **axis:** Intent to ship axes.domain ([355b0bd](https://github.com/naver/billboard.js/commit/355b0bd7afbb593d0aeca52890c619b424666706)), closes [#1090](https://github.com/naver/billboard.js/issues/1090)
* **data:** Intent to ship data.labels.position dataset ([dd5ba44](https://github.com/naver/billboard.js/commit/dd5ba44874f11563042b6070444e4fc851de1b01)), closes [#1126](https://github.com/naver/billboard.js/issues/1126)
* **options:** Intent to ship background ([493c2a3](https://github.com/naver/billboard.js/commit/493c2a304648a1d81bf0755ca75b871c88d190f6)), closes [#1131](https://github.com/naver/billboard.js/issues/1131)

# [1.11.0-next.6](https://github.com/naver/billboard.js/compare/1.11.0-next.5@next...1.11.0-next.6@next) (2019-11-19)


### Bug Fixes

* **zoom:** Correct Axis culling on zoom ([c319302](https://github.com/naver/billboard.js/commit/c319302a97fdce05f8811406ffd84374cbaf84fb)), closes [#1106](https://github.com/naver/billboard.js/issues/1106)

# [1.11.0-next.5](https://github.com/naver/billboard.js/compare/1.11.0-next.4@next...1.11.0-next.5@next) (2019-11-15)


### Bug Fixes

* **shape:** Fix shape position on multiple xs ([6ce784a](https://github.com/naver/billboard.js/commit/6ce784afb01d53b4758e255f50f5d2f8ebc9c0a8)), closes [#1115](https://github.com/naver/billboard.js/issues/1115)
* **zoom:** Fix to pass domain arg on onzoom ([e1daae6](https://github.com/naver/billboard.js/commit/e1daae67539bbb6bf468d1357f61275cddd5d006)), closes [#1109](https://github.com/naver/billboard.js/issues/1109)

# [1.11.0-next.4](https://github.com/naver/billboard.js/compare/1.11.0-next.3@next...1.11.0-next.4@next) (2019-11-13)


### Features

* **data:** Pass element arg for data callbacks ([bb9f952](https://github.com/naver/billboard.js/commit/bb9f95273dcd838862ad8e713a7865e0d062dbbc)), closes [#1100](https://github.com/naver/billboard.js/issues/1100)

# [1.11.0-next.3](https://github.com/naver/billboard.js/compare/1.11.0-next.2@next...1.11.0-next.3@next) (2019-09-25)


### Bug Fixes

* **axis:** Correct on tick count display ([d4c8eb1](https://github.com/naver/billboard.js/commit/d4c8eb1)), closes [#1077](https://github.com/naver/billboard.js/issues/1077)
* **gauge:** Fix to not align background startingAngle from option ([862156f](https://github.com/naver/billboard.js/commit/862156f)), closes [#1073](https://github.com/naver/billboard.js/issues/1073)

# [1.11.0-next.2](https://github.com/naver/billboard.js/compare/1.11.0-next.1@next...1.11.0-next.2@next) (2019-09-10)


### Bug Fixes

* **axis:** Correct subchart x axis culling ([8478dd9](https://github.com/naver/billboard.js/commit/8478dd9)), closes [#1068](https://github.com/naver/billboard.js/issues/1068)

# [1.11.0-next.1](https://github.com/naver/billboard.js/compare/1.10.1...1.11.0-next.1@next) (2019-09-03)


### Bug Fixes

* **all:** Fix possible IE9 style value ([950c335](https://github.com/naver/billboard.js/commit/950c335)), closes [/github.com/naver/billboard.js/commit/54631506721bc64476d5c8fd64a2a681f3b340c1#diff-851f1a6e431d0ae7dc68b646d27821a8R90-R93](https://github.com//github.com/naver/billboard.js/commit/54631506721bc64476d5c8fd64a2a681f3b340c1/issues/diff-851f1a6e431d0ae7dc68b646d27821a8R90-R93) [#1059](https://github.com/naver/billboard.js/issues/1059)
* **api:** Fix .data() to return exact data ([12bdc54](https://github.com/naver/billboard.js/commit/12bdc54)), closes [#1035](https://github.com/naver/billboard.js/issues/1035)
* **data:** Fix header option setting ([82461b3](https://github.com/naver/billboard.js/commit/82461b3)), closes [#1031](https://github.com/naver/billboard.js/issues/1031)
* **interaction:** Fix on eventRect rederaw ([dc5f67a](https://github.com/naver/billboard.js/commit/dc5f67a)), closes [#1028](https://github.com/naver/billboard.js/issues/1028) [#1019](https://github.com/naver/billboard.js/issues/1019) [#963](https://github.com/naver/billboard.js/issues/963)
* **text:** Fix data label y position when all data are 0 ([4b423a5](https://github.com/naver/billboard.js/commit/4b423a5)), closes [#1026](https://github.com/naver/billboard.js/issues/1026)
* **tooltip:** Fix tooltip work on touch zoom ([5d98187](https://github.com/naver/billboard.js/commit/5d98187)), closes [#1056](https://github.com/naver/billboard.js/issues/1056)


### Features

* **data:** Intent to ship data.labels.overlap ([90792fa](https://github.com/naver/billboard.js/commit/90792fa)), closes [#977](https://github.com/naver/billboard.js/issues/977)
* **options:** Intent to ship render option ([b6af77f](https://github.com/naver/billboard.js/commit/b6af77f)), closes [#1015](https://github.com/naver/billboard.js/issues/1015)
* **plugin:** Intent to ship TextOverlap ([728e879](https://github.com/naver/billboard.js/commit/728e879)), closes [#1048](https://github.com/naver/billboard.js/issues/1048)

## [1.10.1](https://github.com/naver/billboard.js/compare/1.10.0...1.10.1) (2019-08-09)


### Bug Fixes

* **interaction:** Fix on eventRect generation ([3dd9439](https://github.com/naver/billboard.js/commit/3dd9439)), closes [#1019](https://github.com/naver/billboard.js/issues/1019)

# [1.10.0](https://github.com/naver/billboard.js/compare/1.9.5...1.10.0) (2019-08-07)


### Bug Fixes

* **axis:** Correct label text position ([9beacfe](https://github.com/naver/billboard.js/commit/9beacfe)), closes [#1011](https://github.com/naver/billboard.js/issues/1011)
* **chart:** Correct the order to set '$' node values ([b97558c](https://github.com/naver/billboard.js/commit/b97558c)), closes [#994](https://github.com/naver/billboard.js/issues/994)
* **color:** Correct to not set stroke ([f18aa35](https://github.com/naver/billboard.js/commit/f18aa35)), closes [#754](https://github.com/naver/billboard.js/issues/754) [#872](https://github.com/naver/billboard.js/issues/872)
* **event:** Update determination condition ([736ba56](https://github.com/naver/billboard.js/commit/736ba56)), closes [#967](https://github.com/naver/billboard.js/issues/967)
* **flow:** Fix data points removal ([5463150](https://github.com/naver/billboard.js/commit/5463150)), closes [#1006](https://github.com/naver/billboard.js/issues/1006)
* **radar:** Correct display of indexed axis ([9bac296](https://github.com/naver/billboard.js/commit/9bac296)), closes [#997](https://github.com/naver/billboard.js/issues/997)
* **text:** Correct text vertical align ([6debb55](https://github.com/naver/billboard.js/commit/6debb55)), closes [#982](https://github.com/naver/billboard.js/issues/982)
* **tooltip:** Correct tooltip on dynamic loading ([c24bddb](https://github.com/naver/billboard.js/commit/c24bddb)), closes [#963](https://github.com/naver/billboard.js/issues/963)
* **tooltip:** Fix on contents template ([419144f](https://github.com/naver/billboard.js/commit/419144f)), closes [#972](https://github.com/naver/billboard.js/issues/972)


### Features

* **axis:** Intent to ship y/y2 axis culling ([44c6c4c](https://github.com/naver/billboard.js/commit/44c6c4c)), closes [#915](https://github.com/naver/billboard.js/issues/915)
* **bubble:** Intent to ship dimension ([27df7c3](https://github.com/naver/billboard.js/commit/27df7c3)), closes [#484](https://github.com/naver/billboard.js/issues/484)
* **options:** Pass instance arg to callbacks ([61cf047](https://github.com/naver/billboard.js/commit/61cf047)), closes [#989](https://github.com/naver/billboard.js/issues/989)
* **radar:** Intent to ship axis.text.position ([1720ec2](https://github.com/naver/billboard.js/commit/1720ec2)), closes [#998](https://github.com/naver/billboard.js/issues/998)

## [1.9.5](https://github.com/naver/billboard.js/compare/1.9.4...1.9.5) (2019-07-03)


### Bug Fixes

* **stats:** Remove stats ([29d6edc](https://github.com/naver/billboard.js/commit/29d6edc)), closes [#934](https://github.com/naver/billboard.js/issues/934) [#964](https://github.com/naver/billboard.js/issues/964)

## [1.9.3](https://github.com/naver/billboard.js/compare/1.9.2...1.9.3) (2019-06-28)


### Bug Fixes

* **color:** Fix on color.threshold.values handling ([841b316](https://github.com/naver/billboard.js/commit/841b316)), closes [#950](https://github.com/naver/billboard.js/issues/950)
* **radar:** Fix radar positioning ([612d93f](https://github.com/naver/billboard.js/commit/612d93f)), closes [#953](https://github.com/naver/billboard.js/issues/953)
* **radar:** Make data points stay over radar ([4db457d](https://github.com/naver/billboard.js/commit/4db457d)), closes [#952](https://github.com/naver/billboard.js/issues/952)

## [1.9.2](https://github.com/naver/billboard.js/compare/1.9.1...1.9.2) (2019-06-20)


### Bug Fixes

* **tooltip:** Correct condition of making tooltip text ([a3675eb](https://github.com/naver/billboard.js/commit/a3675eb)), closes [#940](https://github.com/naver/billboard.js/issues/940) [#941](https://github.com/naver/billboard.js/issues/941)
* **tooltip:** Correct condition of making tooltip text ([c0df6c5](https://github.com/naver/billboard.js/commit/c0df6c5)), closes [#940](https://github.com/naver/billboard.js/issues/940) [#941](https://github.com/naver/billboard.js/issues/941)

## [1.9.1](https://github.com/naver/billboard.js/compare/1.9.0...1.9.1) (2019-06-20)


### Bug Fixes

* **arc:** Fix to generate arc when data is zero ([04a4dd8](https://github.com/naver/billboard.js/commit/04a4dd8)), closes [#935](https://github.com/naver/billboard.js/issues/935)
* **line:** Fix gradient with dataname starting w/no ([fe31102](https://github.com/naver/billboard.js/commit/fe31102)), closes [#936](https://github.com/naver/billboard.js/issues/936)
