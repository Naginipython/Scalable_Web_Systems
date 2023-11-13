
# EX-18: Building a Dockerized Micro-Service (BETA)

**It is recommended that you use a Markdown previewer to read this file. VSCode has a built-in previewer. Just look for it using the command palette.**

This exercise is designed to provide a practical, hands-on experience in the world of containerization and microservices, crucial for modern scalable web systems. By creating a Dockerfile for a Node.js Express micro-service and integrating Winston for logging, you will gain valuable insights into containerizing applications, a key skill in deploying scalable and efficient web services. This exercise not only enhances understanding of Docker, a leading software containerization platform, but also reinforces backend development skills with Node.js and Express. Furthermore, by implementing Winston for logging, you will learn about maintaining robust application logs, essential for monitoring and debugging in production environments. Completing this exercise will equip students with a combination of theoretical knowledge and practical skills, essential for building and maintaining scalable, reliable, and efficient web systems in a professional setting.

## Objective

Create a Dockerfile to containerize a basic Node.js Express micro-service. The service will utilize Winston for logging. Learn to build and run the Docker image, ensuring that the log files are accessible on the host machine.

## Prerequisites

- Basic knowledge of Node.js, Express, and Docker.
- Docker and Node.js installed on the system.

## Learning Outcomes

Here's a list of learning outcomes that you can expect to achieve upon completing this exercise:

1. **Understanding of Docker Concepts and Containerization**: Gain foundational knowledge about Docker, including its role in creating, deploying, and running applications by using containers.

2. **Proficiency in Writing Dockerfiles**: Develop the ability to write Dockerfiles, which are scripts containing commands to assemble a Docker image.

3. **Experience with Node.js and Express Framework**: Enhance skills in setting up and developing a basic web application using Node.js and the Express framework.

4. **Implementation of Logging with Winston**: Learn to implement logging in a Node.js application using the Winston library, an important aspect for monitoring and debugging applications.

5. **Container Management and Operations**: Acquire practical skills in building, running, and managing Docker containers, including mapping volumes from the container to the host system.

6. **Insight into Microservices Architecture**: Gain a basic understanding of microservices architecture and how containerization supports the development and deployment of microservices.

7. **Debugging and Problem-Solving Skills**: Enhance problem-solving abilities by troubleshooting issues related to Docker containerization and application logging.

8. **Application Monitoring and Log Analysis**: Understand the importance of logs in monitoring the health and performance of applications, and learn how to access and analyze these logs.

9. **Best Practices in Development and Deployment**: Learn best practices in developing and deploying web applications in a containerized environment.

10. **Preparation for Real-World Applications**: Prepare for real-world software development scenarios by applying theoretical knowledge in a practical setting.

By achieving these outcomes, you will be well-equipped to handle the challenges of developing and deploying web applications in a containerized environment, a critical skill in today's technology landscape.

## Overview

The following is an overview of what you are to do in this exercise. The actual details of each task are covered in a subsequent section.

1. **Setup Node.js Project**

   - Initialize a new Node.js project: `npm init -y es6`.
   - Install Express and Winston: `npm install -S express winston`.

2. **Create Micro-Service**

   - Write a simple Express server in a file `index.js`.
   - Integrate Winston for logging HTTP requests and other activities.

3. **Create Dockerfile**

   - Start from a Node.js base image.
   - Copy the package.json and install dependencies.
   - Copy your Node.js application files into the image.
   - Expose the port on which your app will run.
   - Define the command to start the Node.js application.

4. **Build Docker Image**

   - Run `docker build -t node-express-winston .` to build your image.

5. **Run the Container with Volume Mapping**

   - Use Docker run command to start your container.
   - Map an internal folder (where Winston logs are stored) to a host folder for log file access:

    ```bash
     docker run -p 3000:3000 -v /path/on/host:/path/in/container node-express-winston
    ```

6. **Testing and Validation**

   - Access your micro-service through a browser or a tool like Postman at `localhost:3000`.
   - Ensure that the logs are being generated and are accessible on the host machine.

## Deliverables

- A `Dockerfile` that correctly sets up the Node.js Express environment.
- Source code of the Express micro-service with Winston integration.
- A log file demonstrating the logs generated by the micro-service and accessibility on the host.

## Time Allocation

- Setting up the project and writing the micro-service: 20 minutes.
- Writing the Dockerfile and building the image: 15 minutes.
- Running the container and testing: 15 minutes.

We encourage you to document any challenges you faced and how you resolved them. This exercise not only teaches you about Docker and Node.js but also about debugging and problem-solving in a development environment.

## 1. Node.js Project Setup

First, create a new directory for your project and initialize a Node.js project:

```bash
mkdir node-express-winston
cd node-express-winston
npm init -y es6
```

## 2. Install Dependencies

Install Express and Winston:

```bash
npm install -S express winston
```

## 3. Create Micro-Service

Create an `index.js` file with the following content:

```javascript
import express from 'express';
import winston from 'winston';

const app = express();
const port = 3000;

// Setup Winston logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'logs/combined.log' })
  ],
});

// Logging middleware
app.use((req, res, next) => {
  logger.info(`Received ${req.method} request for ${req.url}`);
  next();
});

// Basic route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
```

You should test your `hello` micro-service after you write it to make sure that it is working before heading into Docker in the next section.

## 4. Create Dockerfile

Create a `Dockerfile` in the root of your project with the following content:

```Dockerfile
FROM node

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

EXPOSE 3000
CMD [ "node", "index.js" ]
```

## 5. Build Docker Image

Build the Docker image:

```bash
docker build -t node-express-winston .
```

## 6. Run the Container with Volume Mapping

Run the container, mapping the internal folder (where Winston logs are stored) to a host folder:

```bash
docker run -p 3000:3000 -v $(pwd)/logs:/usr/src/app node-express-winston
```

This command maps the `logs` folder in your current directory to the container's working directory. Ensure the `logs` folder exists or create it before running the command.

## 7. Testing and Validation

- Access `http://localhost:3000` from a browser or using a tool like Postman.
- Check the `logs/combined.log` file in your project directory for the logged messages.

## Comments

Please read the questions in `COMMENTS.md` and answer the questions in that file. Thank you for your time and effort on this assignment!

## Deliverables

- `Dockerfile`
- `app.js`
- `package.json`
- `COMMENTS.md`
- Log file sample generated by your application in Docker in your `logs` folders
