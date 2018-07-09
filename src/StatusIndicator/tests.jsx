/* eslint-env node, mocha */
/* global expect */
/* eslint no-console: 0*/
/* eslint-disable no-magic-numbers */


// Uncomment the following lines to use the react test utilities
import React                      from 'react';
// const TestUtils = React.addons.TestUtils;
import { mount }                  from 'enzyme';


import StatusIndicator            from './index';

describe( 'StatusIndicator', () =>
{
    let Wrapper;

    beforeEach( () =>
{
        Wrapper = mount( <StatusIndicator /> );
    } );

    it( 'should have its component name and hash as default className', () =>
{
        expect( Wrapper.find( '.statusIndicator__default' ) )
            .to.have.length( 1 );
    } );
} );
