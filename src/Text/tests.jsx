/* global test */
/* eslint-disable no-magic-numbers */

import React     from 'react';
import { mount } from 'enzyme';

import Text      from './index';


describe( 'TextDriver', () =>
{
    let wrapper;

    beforeEach( () =>
    {
        wrapper = mount( <Text /> );
    } );

    describe( 'getContent', () =>
    {
        test( 'should return the content set by text prop', () =>
        {
            const text = 'the quick brown fox jumps over the lazy dog';
            wrapper.setProps( { text } );
            expect( wrapper.driver().getContent() ).toBe( text );
        } );

        test( 'should return the content set by children prop', () =>
        {
            const text = 'the quick brown fox jumps over the lazy dog';
            const children = <div>{ text }</div>;

            wrapper.setProps( { children } );
            expect( wrapper.driver().getContent().find( 'div' ).text() )
                .toBe( text );
        } );

        test(
            'should return the content set by children prop when both text and \
children props are set',
            () =>
            {
                const textProp  = 'All their equipment and instruments are \
alive.';
                const textChild = 'the quick brown fox jumps over the lazy dog';
                const children  = <div>{ textChild }</div>;

                wrapper.setProps( { text: textProp, children } );
                expect( wrapper.driver().getContent().find( 'div' ).text() )
                    .toBe( textChild );
            }
        );
    } );
} );
