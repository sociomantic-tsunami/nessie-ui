/* eslint-env node, mocha */
/* global expect */
/* eslint no-console: 0*/
/* eslint-disable no-magic-numbers, no-multi-str, no-unused-expressions */


import React        from 'react';
import { mount }    from 'enzyme';

import H4           from './index';

describe( 'H4', () =>
{
    let wrapper;

    beforeEach( () =>
    {
        wrapper = mount( <H4 /> );
    } );

    test( 'should have its component name and hash as default className', () =>
    {
        expect( wrapper.find( `.${wrapper.prop( 'cssMap' ).default}` ) )
            .toHaveLength( 1 );
    } );
} );
