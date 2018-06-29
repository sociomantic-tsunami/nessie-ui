/* global test */
/* eslint no-console: 0*/
/* eslint-disable no-magic-numbers */

import React        from 'react';
import { mount }    from 'enzyme';


import MessageBox   from './index';

describe( 'MessageBox', () =>
{
    let wrapper;

    beforeEach( () =>
    {
        wrapper = mount( <MessageBox /> );
    } );

    test( 'should have its component name and hash as default className', () =>
    {
        expect( wrapper.find( `.${wrapper.prop( 'cssMap' ).default}` ).first() )
            .toHaveLength( 1 );
    } );
} );
