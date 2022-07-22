# solucx/sdk

SoluCX Indicators 

## Installation

To install this packege use `npm install @solucx/indicators`

> This is a private repository. You should be logged in into a allowed npm account or keep [this authorized .npmrc credentials file](https://bitbucket.org/solucxteam/workspace/snippets/B9ryKr/npmrc) at project or usr root folder.

### Test

To run the test suite use `npm run test`

### Publish

To publish a new version of the SDK follow this steps:

1. `npm version (major|minor|patch)`
    - major -> breaking changes
    - minor -> non-breaking changes
    - patch -> bugfixes
2. `npm publish`
    - you have to logged in npm (`npm login`)
    - you should have access to the npm package (`https://www.npmjs.com/package/@solucx/sdk`)
3. `git push --tags`
