<img src="https://naver.github.io/billboard.js/img/logo/billboard.js.svg" width="350" alt="billboard.js"><br>

# v2.0 dev branch

Branch for next major release 2.0.
> DO NOT use for production.

## Installation

### Directly from the github repository
```sh
# Run install command from shell
$ npm install git+https://github.com/naver/billboard.js.git#v2 --save
```

## Main Goals
- Move codebase to TypeScript
- Restructure of file system & class architecture
- Make smaller build & run faster
- Do not break backward compatibility

## Breaking Changes

### Updates on private state variables
Reorganized `state` variables. (Note: Even is accessible, do not use nor access private values)
```js
const chart = bb.generate({});

chart.internal.width;
// --> chart.internal.state.width;
```

