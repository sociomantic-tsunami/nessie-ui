/*
 * Copyright (c) 2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

const Enzyme  = require( 'enzyme' );
const Adapter = require( 'enzyme-adapter-react-16' );

Enzyme.configure( { adapter: new Adapter() } );

const DriverSuite = require( '../drivers' ).default;

const Testing     = require( './index.js' );

Testing.ComponentDriver.extendEnzyme( Enzyme );
DriverSuite.provideDrivers();
