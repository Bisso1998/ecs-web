FROM 370531249777.dkr.ecr.ap-south-1.amazonaws.com/node:8.3.0

# Install app dependencies
COPY package.json .
RUN npm install

# Bundle app source

COPY build build
COPY config config
COPY src src
COPY static static
COPY util util
COPY .babelrc .babelrc
COPY .eslintignore .eslintignore
COPY .eslintrc.js .eslintrc.js
COPY .postcssrc.js .postcssrc.js
COPY index.html index.html

COPY server.js .
COPY dist dist

EXPOSE 80
