## Gifatid React [![CircleCI](https://circleci.com/gh/comicrelief/giftaid-react.svg?style=svg&circle-token=77285c466e4c1f4cbb4a2fcfe10af99e98b0ec0c)](https://circleci.com/gh/comicrelief/giftaid-react)
React Frontend for giftaid submissions.

## Installation

```bash
yarn install
cp .env.dist .env
```

And adapt `.env` to use a back-end of choice

## Local Development

For local development please run

```bash
serverless offline start
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
