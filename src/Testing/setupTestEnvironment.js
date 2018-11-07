const enzyme = require( 'enzyme' );

const DriverSuite = require( '../drivers' ).default;

const Testing     = require( './index.js' );

Testing.ComponentDriver.extendEnzyme( enzyme );
DriverSuite.provideDrivers();
