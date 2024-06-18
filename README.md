# Giftaid React
React Frontend for giftaid submissions.

## Installation

### node
This front end application is somewhat legacy. With this in mind you will need to be careful about what version of node you are running, as an older one will probably be needed to run this application. An easy solution is to use Node Version Manager to revert your node install to an older version. 

To install NVM on Mac:

```bash
brew install nvm
```
Then you can use the local .nmvrc config file to install and use the specified version:
```bash
nvm use
```

### Log in to npm
You will also need to be a member of the Comic Relief organisation on NPM in order to install this project, as it has the
private NPM package `@comicrelief/data-models` as a dev dependency:

```bash
npm login
```

### Install the application
```bash
yarn install
```

### sort out the .env file
Currently you can just use the sample .env.dist

```bash
cp .env.dist .env
```

## Local Development

For local development please run:

```bash
yarn start
```
## Deployment & Environments

Pull requests are tested with circle ci, this will run code style and unit tests against the PR. Deployments are enacted
using concourse, the pipeline can be seen [here](https://ci.services.comicrelief.com/teams/main/pipelines/service-giftaid?groups=SPA).

## Domains

The domains for giftaid are as follows

### Production

- [giftaid.comicrelief.com](https://giftaid.comicrelief.com)
- [giftaid.sportrelief.com](https://giftaid.sportrelief.com)
- [giftaid.rednoseday.com](https://giftaid.rednoseday.com)


### Staging

- [giftaid-staging.comicrelief.com](https://giftaid-staging.comicrelief.com)
- [giftaid-staging.sportrelief.com](https://giftaid-staging.sportrelief.com)
- [giftaid-staging.rednoseday.com](https://giftaid-staging.rednoseday.com)

## Testing

### Playwright-Local Tests

To run PR Playwright Tests locally (after running `yarn playwright install` if you haven't previously), you need to first export `REACT_APP_ENDPOINT_URL=https://giftaid-sandbox.sls.comicrelief.com/` in your terminal for the form to get submitted and then run the script `test:playwright-local:local` found in package.json; this script starts the http://localhost:3000 server in the background, config for this is found in `playwright-local/playwright-local.config.js` file and runs the tests in headless mode. 

To view a test in a _headed_ mode locally, use the according command; `test:playwright-local--h`.

To run a single test, add `only` annotation

eg: test.only('Valid giftaid submission', async ({ page }) => {
    });
    
### Staging Playwright Tests

In order to run Playwright end-to-end tests locally you need to change directory to playwright folder `cd playwright` and export the following environment variables to your terminal:`BASE_URL, BROWSERSTACK_ACCESS_KEY, BROWSERSTACK_USERNAME`
Browserstack credentials can be found in https://github.com/comicrelief/serverless-giftaid/blob/master/concourse/private.yml
```bash
export BASE_URL='https://giftaid-staging.comicrelief.com/'
export BROWSERSTACK_USERNAME='<INSERT_USERNAME>'
export BROWSERSTACK_ACCESS_KEY='<INSERT_ACCESS_KEY>'
```
### Running tests 

To run spa-feature-test or nightly-test-sanity, check the commands in playwright/package.json eg: `yarn test:sanity` 

To run a single test, add `only` annotation

eg: test.only('submit form with valid inputs', async ({ page }) => {
    });
        
Check serverless-giftaid in order to get the right values and then you can run the test executing:

```bash
yarn test:sanity
```
