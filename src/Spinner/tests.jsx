/* eslint-env node, mocha */
/* global expect */
/* eslint no-console: 0*/
/* eslint-disable no-magic-numbers */

// Uncomment the following lines to use the react test utilities
import React                      from 'react';
// const TestUtils = React.addons.TestUtils;
import { mount }                  from 'enzyme';


import Spinner                    from './index';

describe( 'Spinner', () =>
{
    let Wrapper;

    beforeEach( () =>
{
        Wrapper = mount( <Spinner /> );
    } );

    it( 'should have its component name as default className', () =>
{
        expect( Wrapper.find( '.spinner__default' ) ).to.have.length( 1 );
    } );
    it( 'should contain a Spinner', () =>
{
        expect( Wrapper.find( Spinner ) ).to.have.length( 1 );
    } );
} );
