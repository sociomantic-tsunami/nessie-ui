/* eslint-env node, mocha */
/* eslint-disable no-magic-numbers, no-multi-str, no-unused-expressions */
/* eslint no-console: 0*/
/* global expect */


import React        from 'react';
import { mount }    from 'enzyme';

import Animate      from './index';

describe( 'Animate', () =>
{
    let Wrapper;

    beforeEach(() =>
    {
        Wrapper = mount( <Animate /> );
    });

    test('should contain a Animate component', () =>
    {
        expect( Wrapper.find( Animate ) ).toHaveLength(1);
    });

    test('should have animate__default as default className', () =>
    {
        expect( Wrapper.find( '.animate__default' ) ).toHaveLength(1);
    });

    test('should have class animate__fadeIn__fadeOut if fadeIn and fadeOut \
        props are selected', () =>
    {
        const props = {
            enterAnimation : 'fadeIn',
            outAnimation   : 'fadeOut'
        };

        Wrapper = mount( <Animate { ...props } /> );

        expect( Wrapper.find( '.animate__fadeIn__fadeOut' ) ).toHaveLength(1);
    });
} );
