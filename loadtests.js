const Enzyme       = require( 'enzyme' );

const Testing      = require( './src/Testing/index.js' );
const DriverSuite  = require( './src/drivers' ).default;

const testsContext = require.context( './src', true, /tests\.jsx?$/ );

Testing.ComponentDriver.extendEnzyme( Enzyme );
DriverSuite.provideDrivers();

testsContext.keys().forEach( testsContext );
