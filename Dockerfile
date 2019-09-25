FROM node:10.15.3-alpine

WORKDIR /var/www

# Install app deps. Workaround to cache yarn install
ADD package.json package.json
ADD yarn.lock yarn.lock
RUN yarn install

# Copy source codes
ADD . /var/www

# ENVS
ARG base_url=''
ENV REACT_BASE_URL=$base_url

ARG contentful_space_id=''
ENV SERVER_CONTENTUL_SPACE_ID=$contentful_space_id

ARG contentful_delivery_token=''
ENV SERVER_CONTENTUL_DELIVERY_TOKEN=$contentful_delivery_token

ARG contentful_preview_token=''
ENV SERVER_CONTENTUL_PREVIEW_TOKEN=$contentful_preview_token

ARG redis_host=''
ENV REDIS_HOST=$redis_host

ARG redis_port=6379
ENV REDIS_PORT=$redis_port

ARG redis_password
ENV REDIS_PASSWORD=$redis_password

# Build
RUN yarn build

# Clear yarn cache to reduce image size
RUN yarn cache clean

CMD ["yarn", "start"]
