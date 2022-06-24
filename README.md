# Giftaid React [![CircleCI](https://circleci.com/gh/comicrelief/giftaid-react.svg?style=svg&circle-token=77285c466e4c1f4cbb4a2fcfe10af99e98b0ec0c)](https://circleci.com/gh/comicrelief/giftaid-react)
React Frontend for giftaid submissions.

## Installation

### node v.14
This front end application is somewhat legacy. With this in mind you will need to be careful about what version of node you are running, as an older one will probably be needed to run this application. An easy solution is to use Node Version Manager to revert your node install to an older version. 

To install NVM on Mac:

```bash
brew install nvm
```
Then you can revert your local system back to node v.14:
```bash
sudo n 14
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
