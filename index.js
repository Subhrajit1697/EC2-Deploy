const cluster = require('node:cluster');
const process = require('node:process');
const express = require('express');
const numCPUs = require('os').cpus().length;
console.log(numCPUs);
if (cluster.isPrimary) {
    console.log(`Primary ${process.pid} is running`);

    // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
        
    });
} else {
    const app = express();
    // Workers can share any TCP connection
    // In this case it is an HTTP server
    app.get('/', (req, res) => {
        res.send(`Welcome to Reverse Proxy. Your request handled by ${process.pid}`);
    })
    app.get('/:n', (req, res) => {
        let sum = 0;
        for (let i = 0; i < req.params.n; i++) {
            sum += i;
        }
        console.log('sum',sum);
        res.send(`Hello Worldddd.. Your request handled by ${process.pid} and sum is ${sum}`);
    });


    app.listen(3000, () => {
        console.log('Server is running by' + process.pid);
    });
}




