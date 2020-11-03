const MONGO_URI = "<add-mongodb-uri>"
const JWT_SECRET ="<add-jwt-secret>"

module.exports = {
  apps: [
    {
      name: "cv-app",
      script: "./server/server.js",
      watch: false,
      args: ["--color"],
      instances: 1,
      exec_mode: "cluster",
      env: {
        MONGO_URI,
        JWT_SECRET,
        NODE_ENV: "production"
      }
    }
  ]
};
