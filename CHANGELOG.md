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
