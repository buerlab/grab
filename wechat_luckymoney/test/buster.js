var config = module.exports;

config["My tests"] = {
    rootPath: "../",
    environment: "browser", // or "node"
    tests: [
        "test/*-test.js"
    ],
    sources:[
		"sea-modules/coin_type.js"
    ]
};

// Add more configuration groups as needed