#!/usr/bin/env -S docker image build . --tag weatherbot --file

FROM oven/bun:alpine AS build

WORKDIR /app

ENV BUN_INSTALL_CACHE_DIR=/.bun-cache

COPY .husky/prepare.min.mjs ./.husky/
COPY package.json bun.lock ./

RUN --mount=type=cache,target=/.bun-cache \
  bun ci --production

# -=-

FROM oven/bun:alpine

# hadolint ignore=DL3018
RUN apk add --no-cache \
  tzdata

WORKDIR /app

LABEL org.opencontainers.image.authors="Chris Post <admin@postfmly.com>" \
  org.opencontainers.image.description="WeatherBot for Discord" \
  org.opencontainers.image.licenses="GPL-3.0-only" \
  org.opencontainers.image.title="WeatherBot" \
  org.opencontainers.image.url="https://github.com/chump29/weatherbot"

ENV TZ=Etc/GMT

COPY --from=build /app/node_modules ./node_modules
COPY . .

HEALTHCHECK --interval=60s CMD source healthcheck.sh

EXPOSE 8010

ENTRYPOINT ["bun", "run", "prod"]
