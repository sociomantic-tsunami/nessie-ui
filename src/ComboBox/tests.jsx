import React        from 'react';
import { mount }    from 'enzyme';

import { ComboBox } from '../index';

describe( 'ComboBox', () =>
{
    let wrapper;

    beforeEach( () =>
    {
        wrapper  = mount( <ComboBox /> );
    } );

    describe( 'render()', () =>
    {
        test( 'should render ComboBox', () =>
        {
            expect( wrapper ).toHaveLength( 1 );
        } );
        test( 'should render ComboBox without label by default', () =>
        {
            const label = '';
            wrapper.setProps( {
                label,
            } );
            expect( wrapper.find( 'label' ).length ).toBe( 0 );
        } );
        test( 'should render ComboBox with label if defined', () =>
        {
            const label = 'label';
            wrapper.setProps( {
                label,
            } );
            expect( wrapper.find( 'label' ).length ).toBe( 1 );
        } );
    } );
} );


describe( 'ComboBoxDriver', () =>
{
    let wrapper;
    let driver;

    beforeEach( () =>
    {
        wrapper  = mount( <ComboBox /> );
        driver   = wrapper.driver();
    } );

    describe( 'blur', () =>
    {
        test( 'should trigger onBlur() callback function once', () =>
        {
            const onBlur = jest.fn();
            wrapper.setProps( {
                onBlur,
            } );

            driver.blur();

            expect( onBlur ).toBeCalledTimes( 1 );
        } );
    } );

    describe( 'changeInput', () =>
    {
        test( 'should trigger onChangeInput() callback function once', () =>
        {
            const onChangeInput = jest.fn();
            wrapper.setProps( {
                onChangeInput,
            } );

            driver.changeInput();

            expect( onChangeInput ).toBeCalledTimes( 1 );
        } );
    } );

    describe( 'clickInput', () =>
    {
        test( 'should trigger onClickInput() callback function once', () =>
        {
            const onClickInput = jest.fn();
            wrapper.setProps( {
                onClickInput,
            } );

            driver.clickInput();

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
                            { id: 'option2', text: 'Option 2' },
                        ],
                    },
                    {
                        header  : 'Section 2',
                        options : [
                            { id: 'option4', text: 'Option 3' },
                            { id: 'option5', text: 'Option 4' },
                        ],
                    },
                ],
            } );

            driver.clickOption();

            expect( onClickOption ).toBeCalledTimes( 1 );
        } );
    } );

    describe( 'focus', () =>
    {
        test( 'should trigger onFocus() callback function once', () =>
        {
            const onFocus = jest.fn();
            wrapper.setProps( {
                onFocus,
            } );

            driver.focus();

            expect( onFocus ).toBeCalledTimes( 1 );
        } );
    } );

    describe( 'keyDown', () =>
    {
        test( 'should trigger onKeyDown() callback function once', () =>
        {
            const onKeyDown = jest.fn();
            wrapper.setProps( {
                onKeyDown,
            } );

            driver.keyPress( 'abc' );

            expect( onKeyDown ).toBeCalledTimes( 1 );
        } );
    } );

    describe( 'keyPress', () =>
    {
        test( 'should trigger onKeyPress() callback function once', () =>
        {
            const onKeyPress = jest.fn();
            wrapper.setProps( {
                onKeyPress,
            } );

            driver.keyPress( 'abc' );

            expect( onKeyPress ).toBeCalledTimes( 1 );
        } );
    } );

    describe( 'keyUp', () =>
    {
        test( 'should trigger onKeyUp() callback function once', () =>
        {
            const onKeyUp = jest.fn();
            wrapper.setProps( {
                onKeyUp,
            } );

            driver.keyPress( 'abc' );

            expect( onKeyUp ).toBeCalledTimes( 1 );
        } );
    } );

    describe( 'mouseOut', () =>
    {
        test( 'should trigger onMouseOut() callback function once', () =>
        {
            const onMouseOut = jest.fn();
            wrapper.setProps( {
                onMouseOut,
            } );

            driver.mouseOut();

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
                            { id: 'option2', text: 'Option 2' },
                        ],
                    },
                    {
                        header  : 'Section 2',
                        options : [
                            { id: 'option4', text: 'Option 3' },
                            { id: 'option5', text: 'Option 4' },
                        ],
                    },
                ],
            } );

            driver.mouseOutOption();

            expect( onMouseOutOption ).toBeCalledTimes( 1 );
        } );
    } );

    describe( 'mouseOver', () =>
    {
        test( 'should trigger onMouseOver() callback function once', () =>
        {
            const onMouseOver = jest.fn();
            wrapper.setProps( {
                onMouseOver,
            } );

            driver.mouseOver();

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
                            { id: 'option2', text: 'Option 2' },
                        ],
                    },
                    {
                        header  : 'Section 2',
                        options : [
                            { id: 'option4', text: 'Option 3' },
                            { id: 'option5', text: 'Option 4' },
                        ],
                    },
                ],
            } );

            driver.mouseOverOption();

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
                            { id: 'option2', text: 'Option 2' },
                        ],
                    },
                    {
                        header  : 'Section 2',
                        options : [
                            { id: 'option4', text: 'Option 3' },
                            { id: 'option5', text: 'Option 4' },
                        ],
                    },
                ],
            } );

            driver.scroll( 0.3 );

            expect( onScroll ).toBeCalledTimes( 1 );
        } );
    } );
} );
