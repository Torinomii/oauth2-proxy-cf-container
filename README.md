## About

This repository provides a test implementation of oauth2-proxy running on Cloudflare Containers.
It is intended for development and evaluation purposes, demonstrating how to deploy an authentication proxy within a container-based serverless environment on Cloudflare.

## How Use

1. First, fork the repository
2. Edit oauth2-proxy.cfg.example to oath2-proxy.cfg
    - ⚠️Warning: Avoid placing your SECRET in the .cfg file — doing so may expose sensitive information
    - [oauth2-proxy Configuration Docs](https://oauth2-proxy.github.io/oauth2-proxy/configuration/overview/) 
3. Importing a GitHub Repository into Cloudflare Workers
4. Define the environment secrets for your Worker used at runtime

| Environment Variables      |  Value   |
| :---: | :---: |
| OAUTH2_PROXY_COOKIE_SECRET |          |
| OAUTH2_PROXY_CLIENT_ID     |          |
| OAUTH2_PROXY_CLIENT_SECRET |          |

## Option：
