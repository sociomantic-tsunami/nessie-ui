/* global test jest */
/* eslint no-console: 0*/
/* eslint-disable no-magic-numbers, no-multi-str, no-unused-expressions */


import React     from 'react';
import { mount } from 'enzyme';

import Tooltip   from './index';


describe( 'Tooltip', () =>
{
    test( 'should fire onMouseOver event', () =>
    {
        const onMouseOverHandler = jest.fn();
        const onMouseOutHandler = jest.fn();
        const props = {
            message     : 'Pikachu!',
            onMouseOver : onMouseOverHandler,
            onMouseOut  : onMouseOutHandler,
        };

        const wrapper = mount( <Tooltip { ...props }>
            <h2> Who am I?</h2>
        </Tooltip> );

        wrapper.simulate( 'mouseenter' );

        expect( onMouseOverHandler ).toBeCalled();
        expect( onMouseOutHandler ).not.toBeCalled();
    } );

    test( 'should fire onMouseOut event', () =>
    {
        const onMouseOverHandler = jest.fn();
        const onMouseOutHandler = jest.fn();
        const props = {
            message     : 'Pikachu!',
            onMouseOver : onMouseOverHandler,
            onMouseOut  : onMouseOutHandler,
        };

        const wrapper = mount( <Tooltip { ...props }>
            <h2> Who am I?</h2>
        </Tooltip> );

        wrapper.simulate( 'mouseleave' );

        expect( onMouseOverHandler ).not.toBeCalled();
        expect( onMouseOutHandler ).toBeCalled();
    } );
} );
