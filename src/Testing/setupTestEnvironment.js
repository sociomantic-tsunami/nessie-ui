/*
 * Copyright (c) 2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

const enzyme = require( 'enzyme' );

const DriverSuite = require( '../drivers' ).default;

const Testing     = require( './index.js' );

Testing.ComponentDriver.extendEnzyme( enzyme );
DriverSuite.provideDrivers();
