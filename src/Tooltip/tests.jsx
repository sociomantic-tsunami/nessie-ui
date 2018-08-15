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

        const Wrapper = mount( <Tooltip { ...props }>
            <h2> Who am I?</h2>
        </Tooltip> );

        Wrapper.driver().mouseOver();

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

        wrapper.driver().mouseOut();

        expect( onMouseOverHandler ).not.toBeCalled();
        expect( onMouseOutHandler ).toBeCalled();
    } );

    describe( 'Driver self-test', () =>
    {
        test( 'getContent', () =>
        {
            const props = {
                message : 'Pikachu!',
            };

            const wrapper = mount( <Tooltip { ...props } >
                <h1>Who am i?</h1>
            </Tooltip> );

            const content = wrapper.driver().getContent();
            expect( content.find( 'h1' ) ).toHaveLength( 1 );
        } );

        test( 'getMessage', () =>
        {
            const props = {
                message : <h2>Pikachu!</h2>,
            };

            const wrapper = mount( <Tooltip { ...props } /> );

            const message = wrapper.driver().getMessage();
            expect( message.find( 'h2' ) ).toHaveLength( 1 );
        } );
    } );
} );
