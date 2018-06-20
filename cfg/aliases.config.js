module.exports = {
    // These are the module name aliases for both webpack and
    // Jest. These configurations should be kept in sync.
    jest :
    {
        '^@testing(.*)$' : '<rootDir>/src/Testing$1'
    }
};
