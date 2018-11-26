/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

/* global test */
/* eslint no-console: 0*/
/* eslint-disable no-magic-numbers */

import React        from 'react';
import { mount }    from 'enzyme';

import Text         from './index';

describe( 'Text', () =>
{
    let wrapper;

    beforeEach( () =>
    {
        wrapper = mount( <Text /> );
    } );

    test( 'should have its component name and hash as default className', () =>
    {
        expect( wrapper.find( `.${wrapper.prop( 'cssMap' ).default}` ) )
            .toHaveLength( 1 );
    } );
} );


describe( 'TextDriver', () =>
{
    let wrapper;
    let driver;

    beforeEach( () =>
    {
        wrapper = mount( <Text /> );
        driver  = wrapper.driver();
    } );

    describe( 'click', () =>
    {
        test( 'should trigger onClick callback prop once', () =>
        {
            const onClick = jest.fn();
            wrapper.setProps( { onClick } );

            driver.click();
            expect( onClick ).toBeCalledTimes( 1 );
        } );
    } );

    describe( 'getContent', () =>
    {
        test( 'should return the content set by text prop', () =>
        {
            const text = 'the quick brown fox jumps over the lazy dog';
            wrapper.setProps( { text } );
            expect( driver.getContent() ).toBe( text );
        } );

        test( 'should return the content set by children prop', () =>
        {
            const text = 'the quick brown fox jumps over the lazy dog';
            const children = <div>{ text }</div>;

            wrapper.setProps( { children } );
            expect( driver.getContent().find( 'div' ).text() ).toBe( text );
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
                expect( driver.getContent().find( 'div' ).text() )
                    .toBe( textChild );
            }
        );
    } );
} );
