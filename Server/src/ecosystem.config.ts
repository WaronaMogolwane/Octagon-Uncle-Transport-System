module.exports = {
    apps: [
        {
            name: "OctagonUncleServer",
            script: "./server.js", // Path to your compiled server file
            instances: 1,
            env: {
                NODE_ENV: "production",
            },
        },
        {
            name: "MainWorker",
            script: "./Worker/MainWorker.js", // Path to your compiled worker file
            instances: 1,
            env: {
                NODE_ENV: "production",
            },
        },
    ],
};
