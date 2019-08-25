# CV-Application-2107

## Requirements
 * Node v8.16.1(lts/carbon) - *will not work for later versions* 

## Getting Started
- Install gulp and bower globaly
```
npm install -g bower
npm install -g gulp
```

- Installing dependacies in client
```
cd client
npm install
bower install
```

- Installing dependacies in client
```
cd ../server
npm install
bower install
```

- Configure the server 
  - Create configuration file `\server\app\config\conf.js`
  - add parameters to `conf.js` file
    ```
    module.exports = {
        secret:"your-secret",
        database:"mongodb://username:password@URL:PORT/database"
    };
    ```




- start the server (in the `\server` directory)
```
gulp server:start
```
Site will be served at `http://localhost:3000/`. check the app using a browser of your choice.
