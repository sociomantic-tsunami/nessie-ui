/* global test */
/* eslint no-console: 0*/
/* eslint-disable no-magic-numbers */

import React            from 'react';
import { mount }        from 'enzyme';

import StatusIndicator  from './index';

describe( 'StatusIndicator', () =>
{
    let wrapper;

    beforeEach( () =>
    {
        wrapper = mount( <StatusIndicator /> );
    } );

    test( 'should have its component name and hash as default className', () =>
    {
        expect( wrapper.find( `.${wrapper.prop( 'cssMap' ).default}` ) )
            .toHaveLength( 1 );
    } );
} );
