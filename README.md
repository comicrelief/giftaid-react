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

### Playwright-Local Cucumber Tests

Local end-to-end tests use:
- Cucumber
- Playwright
- Chromium and Mobile Safari
- A locally running React app on `http://localhost:3000`

### Start the local server

Before running the tests locally, start the React app:

```bash
yarn start
```
This starts the application on: http://localhost:3000

### Running Local Tests

Run all local tests:

```bash
yarn test:local
```

Run Chromium tests:

```bash
yarn test:local:chromium
```

Run Mobile Safari tests:

```bash
yarn test:local:mobile
```

### Run Tests in Headed Mode

Run Chromium in headed mode:

```bash
yarn test:local:chromium:headed
```

Run Mobile Safari in headed mode:

```bash
yarn test:local:mobile:headed
```

### Run Specific Tests by Tag

Example:

```bash
yarn test:local --tags "@valid-giftaid-submission"
```

Run address validation tests:

```bash
yarn test:local --tags "@address-validation"
```

### Local Test Structure

```text
playwright-local/
├── tests/features
├── tests/step-definitions
├── tests/support
└── tests/utils
```

- Feature files contain readable Gherkin scenarios using the `.feature` extension
- Step definitions contain the Playwright automation implementation
- Hooks create a fresh browser context and page for every scenario
- Shared selectors are stored in `utils/locators.js`
- Shared reusable helper methods are stored in `utils/commands.js`

### Staging BrowserStack Tests

Staging tests run against BrowserStack and require the following environment variables:

```bash
export BASE_URL='https://giftaid-staging.comicrelief.com/'
export BROWSERSTACK_USERNAME='<INSERT_USERNAME>'
export BROWSERSTACK_ACCESS_KEY='<INSERT_ACCESS_KEY>'
```

BrowserStack credentials can be found in:

```text
serverless-giftaid/concourse/private.yml
```

### Running Staging Tests

Run staging tests:

```bash
yarn test:sanity
```
