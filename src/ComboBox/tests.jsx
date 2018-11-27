/*
 * Copyright (c) 2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

/* global test jest */

import React        from 'react';
import { mount }    from 'enzyme';

import { ComboBox } from '../index';

describe( 'ComboBoxDriver', () =>
{
    let wrapper;

    beforeEach( () =>
    {
        wrapper = mount( <ComboBox /> );
    } );

    describe( 'blur', () =>
    {
        test( 'should trigger onBlur() callback function once', () =>
        {
            const onBlur = jest.fn();
            wrapper.setProps( {
                onBlur
            } );

            wrapper.driver().blur();

            expect( onBlur ).toBeCalledTimes( 1 );
        } );
    } );

    describe( 'changeInput', () =>
    {
        test( 'should trigger onChangeInput() callback function once', () =>
        {
            const onChangeInput = jest.fn();
            wrapper.setProps( {
                onChangeInput
            } );

            wrapper.driver().changeInput();

            expect( onChangeInput ).toBeCalledTimes( 1 );
        } );
    } );

    describe( 'clickInput', () =>
    {
        test( 'should trigger onClickInput() callback function once', () =>
        {
            const onClickInput = jest.fn();
            wrapper.setProps( {
                onClickInput
            } );

            wrapper.driver().clickInput();

            expect( onClickInput ).toBeCalledTimes( 1 );
        } );
    } );

    describe( 'clickOption', () =>
    {
        test( 'should trigger onClickOption() callback function once', () =>
        {
            const onClickOption = jest.fn();
            wrapper.setProps( {
                onClickOption,
                options : [
                    {
                        header  : 'Section 1',
                        options : [
                            { id: 'option1', text: 'Option 1' },
                            { id: 'option2', text: 'Option 2' }
                        ]
                    },
                    {
                        header  : 'Section 2',
                        options : [
                            { id: 'option4', text: 'Option 3' },
                            { id: 'option5', text: 'Option 4' }
                        ]
                    }
                ]
            } );

            wrapper.driver().clickOption();

            expect( onClickOption ).toBeCalledTimes( 1 );
        } );
    } );

    describe( 'focus', () =>
    {
        test( 'should trigger onFocus() callback function once', () =>
        {
            const onFocus = jest.fn();
            wrapper.setProps( {
                onFocus
            } );

            wrapper.driver().focus();

            expect( onFocus ).toBeCalledTimes( 1 );
        } );
    } );

    describe( 'keyDown', () =>
    {
        test( 'should trigger onKeyDown() callback function once', () =>
        {
            const onKeyDown = jest.fn();
            wrapper.setProps( {
                onKeyDown
            } );

            wrapper.driver().keyPress( 'abc' );

            expect( onKeyDown ).toBeCalledTimes( 1 );
        } );
    } );

    describe( 'keyPress', () =>
    {
        test( 'should trigger onKeyPress() callback function once', () =>
        {
            const onKeyPress = jest.fn();
            wrapper.setProps( {
                onKeyPress
            } );

            wrapper.driver().keyPress( 'abc' );

            expect( onKeyPress ).toBeCalledTimes( 1 );
        } );
    } );

    describe( 'keyUp', () =>
    {
        test( 'should trigger onKeyUp() callback function once', () =>
        {
            const onKeyUp = jest.fn();
            wrapper.setProps( {
                onKeyUp
            } );

            wrapper.driver().keyPress( 'abc' );

            expect( onKeyUp ).toBeCalledTimes( 1 );
        } );
    } );

    describe( 'mouseOut', () =>
    {
        test( 'should trigger onMouseOut() callback function once', () =>
        {
            const onMouseOut = jest.fn();
            wrapper.setProps( {
                onMouseOut
            } );

            wrapper.driver().mouseOut();

            expect( onMouseOut ).toBeCalledTimes( 1 );
        } );
    } );

    describe( 'mouseOutOption', () =>
    {
        test( 'should trigger onMouseOutOption() callback function once', () =>
        {
            const onMouseOutOption = jest.fn();
            wrapper.setProps( {
                onMouseOutOption,
                options : [
                    {
                        header  : 'Section 1',
                        options : [
                            { id: 'option1', text: 'Option 1' },
                            { id: 'option2', text: 'Option 2' }
                        ]
                    },
                    {
                        header  : 'Section 2',
                        options : [
                            { id: 'option4', text: 'Option 3' },
                            { id: 'option5', text: 'Option 4' }
                        ]
                    }
                ]
            } );

            wrapper.driver().mouseOutOption();

            expect( onMouseOutOption ).toBeCalledTimes( 1 );
        } );
    } );

    describe( 'mouseOver', () =>
    {
        test( 'should trigger onMouseOver() callback function once', () =>
        {
            const onMouseOver = jest.fn();
            wrapper.setProps( {
                onMouseOver
            } );

            wrapper.driver().mouseOver();

            expect( onMouseOver ).toBeCalledTimes( 1 );
        } );
    } );

    describe( 'mouseOverOption', () =>
    {
        test( 'should trigger onMouseOverOption() callback function once', () =>
        {
            const onMouseOverOption = jest.fn();
            wrapper.setProps( {
                onMouseOverOption,
                options : [
                    {
                        header  : 'Section 1',
                        options : [
                            { id: 'option1', text: 'Option 1' },
                            { id: 'option2', text: 'Option 2' }
                        ]
                    },
                    {
                        header  : 'Section 2',
                        options : [
                            { id: 'option4', text: 'Option 3' },
                            { id: 'option5', text: 'Option 4' }
                        ]
                    }
                ]
            } );

            wrapper.driver().mouseOverOption();

            expect( onMouseOverOption ).toBeCalledTimes( 1 );
        } );
    } );

    describe( 'scroll', () =>
    {
        test( 'should trigger onScroll() callback function once', () =>
        {
            const onScroll = jest.fn();
            wrapper.setProps( {
                onScroll,
                options : [
                    {
                        header  : 'Section 1',
                        options : [
                            { id: 'option1', text: 'Option 1' },
                            { id: 'option2', text: 'Option 2' }
                        ]
                    },
                    {
                        header  : 'Section 2',
                        options : [
                            { id: 'option4', text: 'Option 3' },
                            { id: 'option5', text: 'Option 4' }
                        ]
                    }
                ]
            } );

            wrapper.driver().scroll( 0.3 );

            expect( onScroll ).toBeCalledTimes( 1 );
        } );
    } );
} );
