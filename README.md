[![Build Status](https://travis-ci.org/labra/viade_0.svg?branch=master)](https://travis-ci.org/labra/viade_0) 
[![codecov](https://codecov.io/gh/Arquisoft/viade_0/branch/master/graph/badge.svg)](https://codecov.io/gh/Arquisoft/viade_0)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/6d87ad7b8b89409aa9dc2d7a7492affc)](https://www.codacy.com/gh/Arquisoft/viade_0?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=Arquisoft/viade_0&amp;utm_campaign=Badge_Grade)

# VIADE_0

This project shows how to create a new react webapp and configure it using travis in order to enable continuous integration.

## Setting up the enviroment
We are going to prepare the enviroment using docker. This way we will ensure that the setup will work without depending on our local setup. Lets create a Ubuntu 18.04LTS container as our development enviroment:
```
docker run -it -v "$PWD/Projects/viade_0":/webapps -p 3000:3000 --name viade_0 ubuntu:18.04
```
Note: "$PWD/Projects/viade_0" will be the route of the folder (in your machine) where you want to store the project. You should create this folder.
Change the route accordingly.

This Ubuntu 18.04 image does not have Node installed. We could have chosen here a docker image with node but we are using this one in order to illustrate how to **install node** in Ubuntu:
```bash
apt-get update
apt-get install curl
curl -sL https://deb.nodesource.com/setup_12.x | bash -
apt-get install nodejs
```
With node installed we have **npm** and **npx** available that will be used in the next steps.

Let's install also the git client. We will use this as travis needs that our code is hosted in the control version system:
```
apt-get install git
```
Also install nano or your other text editor of your preference:
```
apt-get install nano
```

## Creating the react app

The easiest way to create a react app is to use the project [create react app](https://github.com/facebook/create-react-app), that not only creates a react application but configures it propertly. Among other things we will get:
  * Simple react web application working
  * Unit tests configured and ready to work
  * Git repository initialized locally

In order to use this project, the only required step is to execute (in the directory that we want the project to be generated, in our case **/webapps**):
```javascript
cd /webapps
npx create-react-app viade_0
```
This code will work considering that we have properly installed node.
The name *viade_0* is the name of our application. The generator will generate a directory with the app inside. 
If we want to start our app in a local server, we just need to type:

```javascript
cd viade_0
npm start
```
We can see our application in http://localhost:3000 . It is important to understand that this method is only good for develpment purposes because the react (JSX) code from react is translated on the fly (thus, it is slow). 

If we want to 'compile' the code and create html, javascript and css files only, we can execute `npm run build`.

After checking that everything is working propertly, we need to create a new git repository to host our application and push the application to it. In my case I will create the repository **viade_0**.


## Configure travis
Create a [Travis](https://travis-ci.org/) account. 
It is important to note that travis is free for our GitHub public respositories. Configure Travis to monitor the git repository where you host your app (in my case **viade_0**). Everytime that Travis detects a new commit it will test the application and if the tests are correct, the application will be deployed automatically. For this to work, we need to give Travis permissions to work in our GitHub account:
  * Configure a GitHub access token. This is done in the "global settings page>Developer Settings>Personal access tokens".  
  * Create an enviroment variable in travis called github_token with the value obtained in the previous step.

Now, we got to the most important part, the **.travis.yml** file. This file should be in the project root:
```
language: node_js
node_js:
  - 12.14.0
cache:
  directories:
  - node_modules
script:
  - npm test
  - npm run build
deploy:
  provider: pages
  skip_cleanup: true
  github_token: $github_token
  local_dir: build
  on:
    branch: master
```
We also need to configure the file `package.json`. In this file we will add a new line indicating where our application will be deployed:
```json
"homepage": "https://arquisoft.github.io/viade_0/",
```

As a final step, we need to make sure that we are using the gh-pages branch as our repository page (this is configured in the settings part of our repository).

## Final tests
Make a modification in the App.js page. After doing so, you should make sure that the tests are still passing (maybe we need to modify the tests as well). 
For checking the tests is recommended to have a terminal with `npm test` open. 
This way, when **Jest** detects a change in your code, it will rerun the affected tests automatically. After checking that everything is ok, make a commit and a push. 
Travis should detect the commit in github, create a new virtual enviroment where it will download the code, execute the tests there (npm test) and then, if the tests are passed (in this case, it will execute all the tests, not only the changed files), execute npm build to build a release and deploy it to github pages.

## Codecov
Codecov is a tool that allows us to see which part of the code is covered by the tests and which part is not. This tool is very easy to integrate with Travis. We only have to follow the following steps:
1. Create an account in [Codecov](https://codecov.io). Log in using your Git account so Codecov can find your repositories. Codecov is free for public repositories.
2. Look for your Git repository in your Codecov dashboard
3. Configure your app so it generates a code coverage report and uploads it to the Codecov dashboard. We need to make two modifications for this:

File *package.json*. Add `--coverage` so Jest generates a code coverage report.
```
"test": "react-scripts test --coverage",
```
File *.travis.yml*. In the script section, add the following:
```
  - npm install -g codecov
  - npm test && codecov
```

If now we make a new commit, a code coverage report will be created that will be analized by the Codecov tool and uploaded to the Codecov.io website. We can check this report in our Codecov dashboard.

Codecov can be configured. For instance we may want to ignore some files that do not need to be tested. We are going to use this for not analyzing the `index.js` file.

File *codecov.yml* (place this file in the project root)
```json
ignore:
  - "src/index.js"
```
For more configuration options you can check: [About the Codecov yaml](https://docs.codecov.io/docs/codecov-yaml).

## Arc42 documentation

Under the directory src/docs we have the documentation in AsciiDoc format (template downloaded from [here](https://arc42.org/download)). We are going to install first the required packages for generate the documentation in html from this asciidoc files:
```bash
apt-get install ruby openjdk-8-jre
gem install asciidoctor asciidoctor-diagram
```
Note: openjdk-8-jre and asciidoctor-diagram are only required if we want to use **PlantUML** to build UML diagrams.

After we have the required tools, we can generate the help files (execute this in the project root):
```bash
asciidoctor --trace -D build/docs -a imagesdir=./images -r asciidoctor-diagram src/docs/index.adoc
cp -R src/docs/images build/docs
```
So now our site with the documentation is in build/docs. The idea is to deploy it along the main website. Obviously this is optional. In this example we are going to integrate it with npm and travis. Lets add a new task in our package.json file.

```json
"scripts": {

    "docs": "asciidoctor -D build/docs -a imagesdir=./images -r asciidoctor-diagram src/docs/index.adoc && cp -R src/docs/images build/docs",

 }
```
Now, the last step is to tell travis to generate the doc htmls and upload them along with our web application. Lets modify the .travis.yml file:
```
language: node_js
node_js:
  - 12.14.0
cache:
  directories:
  - node_modules
before_install:
  - sudo apt-get update
  - sudo apt-get -y install ruby openjdk-8-jre
  - sudo gem install asciidoctor asciidoctor-diagram
script:
  - npm install -g codecov
  - npm test && codecov
  - npm run build
  - npm run docs
deploy:
  provider: pages
  skip_cleanup: true
  github_token: $github_token
  local_dir: build
  on:
    branch: master
```

In this file we need to pay attention to the `before_install` section where we are installing the dependencies for running asciidoctor (with PlantUML support) and then, after running `npm run build`, execute `npm run docs` that will generate the docs inside the build directory. We do not have to change anything else as we are deploying the build directory in the next section. If everything worked properly we should be able to see the documentation under:

[https://arquisoft.github.io/viade_0/docs/index.html](https://arquisoft.github.io/viade_0/docs/index.html)

## More about testing

The default setup for testing a react app is a testing framework called [Jest](https://jestjs.io/). Jest allow us to run only the relevant tests for the changed code. That means that if we change a file, it will run only the tests related with this file. 

Obviously we have the option of running all tests if we want. Jest is launched executing `npm test` as we have seen before. 
The test library used by default is [React testing library](https://github.com/testing-library/react-testing-library). This library is designed to easily test React components using the DOM elements.
