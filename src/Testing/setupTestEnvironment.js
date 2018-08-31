const Enzyme  = require( 'enzyme' );
const Adapter = require( 'enzyme-adapter-react-16' );

Enzyme.configure( { adapter: new Adapter() } );

const DriverSuite = require( '../drivers' ).default;

const Testing     = require( './index.js' );

Testing.ComponentDriver.extendEnzyme( Enzyme );
DriverSuite.provideDrivers();
