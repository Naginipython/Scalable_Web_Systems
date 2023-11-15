
# EX-19: Building a Dockerized Dev Environment (BETA)

**It is recommended that you use a Markdown previewer to read this file. VSCode has a built-in previewer. Just look for it using the command palette.**

This is a short exercise on how to use Docker for development. In particular, we want to be able to run a service inside of a container and have it hot reload using `nodemon` as we make edits of that service on our host machine.

## Prerequisites

- Basic knowledge of Node.js, Express, and Docker.
- Docker and Node.js installed on the system.

## Learning Outcomes

After this exercise, you will be able to:

- To create an image that reloads your application inside of a running docker container as you make changes.

## TODO #1: Install Dependencies

The first todo is to install the exercise tools. This will allow you to submit your work to Gradescope with minimal effort:

```bash
npm run setup
```

This runs a setup script to install dependencies in the `.tools` folder. You do not need to touch this folder, but it contains a tool to create a `submission.zip` file of your work. Try it out:

```bash
npm run submit
```

This will generate the `submission.zip` file. You will upload this to Gradescope.

## TODO #2: Create a Simple Micro-Service

Create an `index.js` file inside of this folder with the following content:

```javascript
import express from 'express';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello Docker!');
});

app.listen(port, () => {
  console.log(`EX-19 app listening at http://localhost:${port}`);
});
```

Note, we are going to hold off for the moment and not run this service locally. Our goal is to run it inside of the container and be able to modify it on our local host to pick up the changes inside of the container.

## TODO #3: Create Dockerfile

Create a new file called `Dockerfile.dev` in the project folder with the following content:

```Dockerfile
# Use the official Node.js image as the base image
FROM node:latest

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available) to the container
COPY package*.json ./

# Install dependencies
RUN npm install
# If you're using nodemon for development, install it globally in the container
RUN npm install -g nodemon

# Copy the rest of your application's code
COPY . .

# Expose the port on which your app will run
EXPOSE 3000

# Define the command to run your app using nodemon
CMD ["nodemon", "index.js"]
```

## TODO #4: Build Docker Image

Build the Docker image:

```bash
docker build -t ex19 .
```

## TODO #5: Run the Container with Volume Mapping

This is where the action happens. You are going to create a running container from the image we just built. We are going to map two volumes. The first volume will map our current directory to the service's directory inside of the container. We are then going to map the `node_modules` folder to "nothing" to force the container to keep the `node_modules` directory in the image. If we do not do this, it will attempt to use a `node_modules` directory on your host computer which will either (1) exist and possibly be incorrect because of your host platforms configuration, or (2) it simply will not be there as we didn't run `npm install` on your computer.

Run one of the following commands for your platform:

**MacOS/Linux:**

```bash
docker run -p 3000:3000 -v $(pwd):/usr/src/app -v /usr/src/app/node_modules ex19
```

**Windows Command Line (CMD):**

```bash
docker run -p 3000:3000 -v %cd%:/usr/src/app -v /usr/src/app/node_modules ex19
```

**Windows PowerShell:**

```bash
docker run -p 3000:3000 -v ${PWD}:/usr/src/app -v /usr/src/app/node_modules ex19
```

After you run this command, you should see something like the following output:

```bash
[nodemon] 3.0.1
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,cjs,json
[nodemon] starting `node index.js`
EX-19 app listening at http://localhost:3000
```

## TODO #6: Testing and Validation

- Access `http://localhost:3000` from a browser or using a tool like Postman.
- You should see the results.

## TODO #7: Making Changes

Open your `index.js` file and make a change to what is sent from the '/' endpoint. After you save the file, `nodemon` inside the running container should detect the change and reload the service. 😎.

## TODO #8: Comments

Please read the questions in `COMMENTS.md` and answer the questions in that file. Thank you for your time and effort on this assignment!

## TODO #9: Submission

Run the following command:

```bash
npm run submit
```

Submit `submission.zip` to Gradescope.

## Notes

1. To stop your running container, you should be able to type in C-c (control-c) in the terminal with the running container. If you are unable to stop the container, open another container and run `docker ps` to get the ID of the container and then `docker rm ID`, where the ID is the ID of the container.
