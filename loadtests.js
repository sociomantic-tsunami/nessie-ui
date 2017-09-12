require( 'core-js/fn/object/assign' );

// Add support for all files in the test directory
const testsContext = require.context(
    './src', true, /(tests\.jsx$)|(Test\.js$)|(Helper\.js$)/
);
testsContext.keys().forEach( testsContext );

const enzyme = require( 'enzyme' );

const testing = require( './src/Testing/index.js' );
const containerDrivers = require( './src/drivers' ).default;

testing.ComponentDriver.extendEnzyme( enzyme );
containerDrivers.provideDrivers();
