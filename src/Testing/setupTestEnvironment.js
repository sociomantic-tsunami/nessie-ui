// As Jest hoists import statements, we need to use
// require otherwise we will not be able to set the
// globals which ursula needs.
// See: http://facebook.github.io/jest/docs/troubleshooting.html#i-m-using-babel-and-my-unmocked-imports-aren-t-working
const _ = require( 'lodash' );
const React = require( 'react' );
const enzyme = require( 'enzyme' );

// Expose globals which ursula needs
global._ = _;
global.React = React;


ContainerDriverSuite.extendEnzyme( enzyme );
ContainerDriverSuite.default.provideDrivers();

const testing = require( '@testing' ).default;

testing.configureSpyAgent( () => jest.fn() );
testing.polyfills.configureCodeEditorPolyfill();
