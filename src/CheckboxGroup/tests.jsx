/* eslint-env node, mocha */
/* eslint-disable no-magic-numbers, no-multi-str, no-unused-expressions */
/* global expect */

import React            from 'react';
import { shallow }      from 'enzyme';

import CheckboxGroup    from './index';

describe.only( 'CheckboxDriver', () =>
{
    let wrapper;

    beforeEach( () =>
    {
        wrapper  = shallow( <CheckboxGroup /> );
    } );

    describe( 'selectByIndex()', () =>
    {
        it( 'should select Checkbox by index', () =>
        {
            wrapper.find( 'items' )
                .setProps( { selectedValues: [ 'apples', 'kaki' ] } );
            wrapper.driver().selectByIndex();

            expect( wrapper.prop( 'selectedValues' ) ).to.have.length( 2 );
        } );
    } );
} );
