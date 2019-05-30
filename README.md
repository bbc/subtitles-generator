# Subtitles composer - draft 

A node module to generate subtitles by segmenting a list of time-coded text.

Exports to 
- [x] TTML for Premiere as `.xml`
- [x] TTML 
- [x] iTT - for Apple 
- [x] srt
- [x] vtt 
- [x] csv 

It can also provide pre-segmented lines if the input is plain text.

## Setup
<!-- _stack - optional_
_How to build and run the code/app_ -->

git clone, cd into folder, `npm install`


## Usage

```js
const subtitlesComposer = require('./src/index.js');
// const sampleWords = // some word json 
const subtitlesJson = subtitlesComposer({words: sampleWords, type: 'json'})
const ttmlPremiere = subtitlesComposer({words: sampleWords, type: 'premiere'})
const ittData = subtitlesComposer({words: sampleWords, type: 'itt'})
const ttmlData = subtitlesComposer({words: sampleWords, type: 'ttml'})
const srtData = subtitlesComposer({words: sampleWords, type: 'srt'})
const vttData = subtitlesComposer({words: sampleWords, type: 'vtt'})
```
see [`example-usage.js`](./example-usage.js) for more comprehensive example.

### `words` Input 
- either an array list of words objects    
example
```js
const sampleWords =[ 
      {
        "id": 0,
        "start": 13.02,
        "end": 13.17,
        "text": "There"
      },
      {
        "id": 1,
        "start": 13.17,
        "end": 13.38,
        "text": "is"
      },
      {
        "id": 2,
        "start": 13.38,
        "end": 13.44,
        "text": "a"
      },
      {
        "id": 3,
        "start": 13.44,
        "end": 13.86,
        "text": "day."
      },
...
```
- or a string of text     
Example
```js
const sampleWords = "There is a day. ..."
```

If input `words` is plain text then only and not a list of words with timecodes, then can only use `pre-segment-txt` option.

## Output: 
- segmented plain text

example

```
There is a day.
```

## System Architecture
<!-- _High level overview of system architecture_ -->

In pseudo code, at a high level 
```
// expecting array list of words OR plain text string

  // if array list of words, convert text into string

  // presegment the text 
     using pre segmentation algorithm to break into line of x char - default 35

// generate subtitles 
   use subtitles generators for various format to convert presegemented json into subtitles

// return trsult
```

Segmentation algorithm refactored from [`pietrop/subtitlesComposer`](https://github.com/pietrop/subtitlesComposer) originally by [@polizoto](https://github.com/polizoto). 
And subtitles generation in various originally format by [`@laurian`](https://github.com/laurian) and [`@maboa`](https://github.com/maboa)as part of BBC Subtitlelizer project.

## Development env
 <!-- _How to run the development environment_
_Coding style convention ref optional, eg which linter to use_
_Linting, github pre-push hook - optional_ -->

- npm > `6.1.0`
- [Node 10 - dubnium](https://scotch.io/tutorials/whats-new-in-node-10-dubnium)
- [Eslint](https://eslint.org/)

Node version is set in node version manager [`.nvmrc`](https://github.com/creationix/nvm#nvmrc)

## Build
<!-- _How to run build_ -->

_NA_

## Tests
<!-- _How to carry out tests_ -->

```
npm test
```

To run tests during development

```
npm run test:watch
```

## Linting
To run linter

```
npm run lint
```

To run and fix
```
npm run lint:fix
```

## Deployment
<!-- _How to deploy the code/app into test/staging/production_ -->

_NA_