const enzyme = require( 'enzyme' );
const jest   = require( 'jest' );

const DriverSuite = require( '../drivers' );

const Testing     = require( './index.js' );

Testing.ComponentDriver.extendEnzyme( enzyme );
DriverSuite.createDriverSuite;
DriverSuite.provideDrivers;
