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
