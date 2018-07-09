/* eslint-env node, mocha */
/* global expect */
/* eslint no-console: 0*/
/* eslint-disable no-magic-numbers  */


// Uncomment the following lines to use the react test utilities
import React                      from 'react';
// const TestUtils = React.addons.TestUtils;
import { mount }                  from 'enzyme';


import ProgressBar                from './index';

describe( 'ProgressBar', () =>
{
    let Wrapper;

    beforeEach( () =>
{
        Wrapper = mount( <ProgressBar /> );
    } );

    it( 'should have its component name as default className', () =>
{
        expect( Wrapper.find( '.progressBar__default' ) ).to.have.length( 1 );
    } );
    it( 'should contain a ProgressBar', () =>
{
        expect( Wrapper.find( ProgressBar ) ).to.have.length( 1 );
    } );
} );
