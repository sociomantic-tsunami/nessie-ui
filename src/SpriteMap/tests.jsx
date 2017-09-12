/* eslint-env node, mocha */
/* eslint-disable no-magic-numbers, no-multi-str, no-unused-expressions */
/* global expect */

import React       from 'react';
import { shallow } from 'enzyme';

import SpriteMap   from './index';


describe( 'SpriteMap', () =>
{
    let wrapper;

    beforeEach( () =>
    {
        wrapper = shallow( <SpriteMap /> );
    } );

    describe( 'render()', () =>
    {
        it( 'should dangerously set inner HTML', () =>
        {
            expect( wrapper.prop( 'dangerouslySetInnerHTML' ) ).to.exist;
        } );
    } );
} );
