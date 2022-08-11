# FROM node:12-alpine3.14 as builder

# ARG YARN_VERSION=1.22.4

# WORKDIR /builder
# COPY . /builder/

# RUN npm install yarn@${YARN_VERSION}
# RUN yarn && yarn build

FROM node:12-alpine3.14
WORKDIR /app
# COPY --from=builder /builder/server /app
# COPY --from=builder /builder/dist /app/dist
COPY dist /app/dist
COPY server/app.js /app

CMD ["node","app.js"]
