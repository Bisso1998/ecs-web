FROM 370531249777.dkr.ecr.ap-south-1.amazonaws.com/node:8.3.0

# Install app dependencies
COPY package.json package.json
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

RUN LANGUAGE=bn npm run build
RUN LANGUAGE=gu npm run build
RUN LANGUAGE=hi npm run build
RUN LANGUAGE=kn npm run build
RUN LANGUAGE=ml npm run build
RUN LANGUAGE=mr npm run build
RUN LANGUAGE=ta npm run build
RUN LANGUAGE=te npm run build

COPY old_build old_build
COPY server.js .

EXPOSE 80
