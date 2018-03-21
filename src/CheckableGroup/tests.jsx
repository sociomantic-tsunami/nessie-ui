/* eslint-env node, mocha */
/* eslint-disable no-magic-numbers, no-multi-str, no-unused-expressions */
/* global expect */

import React            from 'react';
import { mount }        from 'enzyme';

import CheckableGroup   from './index';

describe.only( 'CheckboxDriver', () =>
{
    let wrapper;

    beforeEach( () =>
    {
        wrapper  = mount( <CheckableGroup /> );
    } );

    describe( 'selectByIndex()', () =>
    {
        it( 'should select Checkbox by index', () =>
        {
            wrapper.driver().selectByIndex( 1 );

            expect( wrapper.children ).to.have.length( 1 );
        } );
    } );
} );
