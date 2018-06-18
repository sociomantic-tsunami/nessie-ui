/* eslint-env node, mocha */
/* global expect */
/* eslint no-console: 0*/
/* eslint-disable no-magic-numbers */


// Uncomment the following lines to use the react test utilities
import React                      from 'react';
// const TestUtils = React.addons.TestUtils;
import { mount }                  from 'enzyme';


import Text                       from './index';

describe( 'Text', () =>
{
    let Wrapper;

    beforeEach(() =>
    {
        Wrapper = mount( <Text /> );
    });

    test('should have its component name and hash as default className', () =>
    {
        expect( Wrapper.find( '.text__default' ) ).toHaveLength(1);
    });
} );


describe( 'TextDriver', () =>
{
    let wrapper;
    let driver;

    beforeEach(() =>
    {
        wrapper = mount( <Text /> );
        driver  = wrapper.driver();
    });

    describe( 'getContent', () =>
    {
        test('should return the content set by text prop', () =>
        {
            const text = 'the quick brown fox jumps over the lazy dog';
            wrapper.setProps( { text } );
            expect( driver.getContent() ).toBe(text);
        });

        test('should return the content set by children prop', () =>
        {
            const text = 'the quick brown fox jumps over the lazy dog';
            const children = <div>{ text }</div>;

            wrapper.setProps( { children } );
            expect( driver.getContent().find( 'div' ).text() ).toBe(text);
        });

        test(
            'should return the content set by children prop when both text and children props are set',
            () =>
            {
                const textProp  = 'All their equipment and instruments are alive.';
                const textChild = 'the quick brown fox jumps over the lazy dog';
                const children  = <div>{ textChild }</div>;

                wrapper.setProps( { text: textProp, children } );
                expect( driver.getContent().find( 'div' ).text() ).toBe(textChild);
            }
        );
    } );
} );
