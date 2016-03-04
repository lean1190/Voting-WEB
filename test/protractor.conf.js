exports.config = {
    framework: 'jasmine',

    // The address of a running selenium server.
    seleniumAddress: 'http://localhost:4444/wd/hub',

    // Path to test files
    specs: ['integration/**/*.js'],

    // Capabilities to be passed to the webdriver instance.
    capabilities: {
        'browserName': 'chrome'
    },

    // Options to be passed to Jasmine-node.
    jasmineNodeOpts: {
        showColors: true, // Use colors in the command line report.
    }
}

// For multiple browsers testing
/*
multiCapabilities: [
    { browserName: 'firefox' },
    { browserName: 'chrome'  }
]
*/
