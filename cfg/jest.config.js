const aliases = require( './aliases.config' ).jest;

module.exports = {
    // The jest <rootDir> is presumed to be wherever the config
    // file is, so here we put it back to the root folder.
    rootDir : '../',

    testMatch :
    [
        '<rootDir>/src/Form/tests.js?(x)'
    ],

    // We should specify that jest should load all dependencies
    // from the ROOT node_modules folder. If not, and you have
    // a dependency symlinked, there can potentially be two
    // versions of a module loaded (such as react).
    moduleDirectories :
    [
        '<rootDir>/src',
        '<rootDir>/node_modules'
    ],

    // Tell jest explicitly where to search for source files
    // and test files. Otherwise jest will parse any folders
    // including local npm caches etc.
    roots :
    [
        '<rootDir>/src'
    ],

    setupFiles :
    [
        '<rootDir>/src/Testing/setupTestEnvironment.js'
    ],

    setupTestFrameworkScriptFile :
        '<rootDir>/src/Testing/setupTestFramework.js',

    moduleNameMapper : Object.assign(
        {},
        // Map module aliases to directories
        aliases,
        // Mock assets
        {
            '\\.(html|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)$' :
                '<rootDir>/src/Testing/mocks/fileMock.js',
            '\\.(css|less|scss)$' : 'identity-obj-proxy'
        }
    ),

    // 'bail'  : true,
    verbose : true,
};
