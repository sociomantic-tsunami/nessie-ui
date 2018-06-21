import React        from 'react';
import { mount }    from 'enzyme';

import { ComboBox } from '../index';

describe( 'ComboBox', () =>
{
    let wrapper;

    beforeEach(() =>
    {
        wrapper  = mount( <ComboBox /> );
    });

    describe( 'render()', () =>
    {
        test('should render ComboBox', () =>
        {
            expect( wrapper ).toHaveLength(1);
        });
        test('should render ComboBox without label by default', () =>
        {
            const label = '';
            wrapper.setProps( {
                label
            } );
            expect( wrapper.find( 'label' ).length ).toBe(0);
        });
        test('should render ComboBox with label if defined', () =>
        {
            const label = 'label';
            wrapper.setProps( {
                label
            } );
            expect( wrapper.find( 'label' ).length ).toBe(1);
        });
    } );
} );


describe( 'ComboBoxDriver', () =>
{
    let wrapper;
    let driver;

    beforeEach(() =>
    {
        wrapper  = mount( <ComboBox /> );
        driver   = wrapper.driver();
    });

    describe( 'blur', () =>
    {
        test('should trigger onBlur() callback function', () =>
        {
            const onBlur = jest.fn();
            wrapper.setProps( {
                onBlur
            } );

            driver.blur();

            expect( onBlur.calledOnce ).toBe(true);
        });
    } );

    describe( 'changeInput', () =>
    {
        test('should trigger onChangeInput() callback function', () =>
        {
            const onChangeInput = jest.fn();
            wrapper.setProps( {
                onChangeInput
            } );

            driver.changeInput();

            expect( onChangeInput.calledOnce ).toBe(true);
        });
    } );

    describe( 'clickInput', () =>
    {
        test('should trigger onClickInput() callback function', () =>
        {
            const onClickInput = jest.fn();
            wrapper.setProps( {
                onClickInput
            } );

            driver.clickInput();

            expect( onClickInput.calledOnce ).toBe(true);
        });
    } );

    describe( 'clickOption', () =>
    {
        test('should trigger onClickOption() callback function', () =>
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

            driver.clickOption();

            expect( onClickOption.calledOnce ).toBe(true);
        });
    } );

    describe( 'focus', () =>
    {
        test('should trigger onFocus() callback function', () =>
        {
            const onFocus = jest.fn();
            wrapper.setProps( {
                onFocus
            } );

            driver.focus();

            expect( onFocus.calledOnce ).toBe(true);
        });
    } );

    describe( 'keyDown', () =>
    {
        test('should trigger onKeyDown() callback function', () =>
        {
            const onKeyDown = jest.fn();
            wrapper.setProps( {
                onKeyDown
            } );

            driver.keyPress( 'abc' );

            expect( onKeyDown.calledOnce ).toBe(true);
        });
    } );

    describe( 'keyPress', () =>
    {
        test('should trigger onKeyPress() callback function', () =>
        {
            const onKeyPress = jest.fn();
            wrapper.setProps( {
                onKeyPress
            } );

            driver.keyPress( 'abc' );

            expect( onKeyPress.calledOnce ).toBe(true);
        });
    } );

    describe( 'keyUp', () =>
    {
        test('should trigger onKeyUp() callback function', () =>
        {
            const onKeyUp = jest.fn();
            wrapper.setProps( {
                onKeyUp
            } );

            driver.keyPress( 'abc' );

            expect( onKeyUp.calledOnce ).toBe(true);
        });
    } );

    describe( 'mouseOut', () =>
    {
        test('should trigger onMouseOut() callback function', () =>
        {
            const onMouseOut = jest.fn();
            wrapper.setProps( {
                onMouseOut
            } );

            driver.mouseOut();

            expect( onMouseOut.calledOnce ).toBe(true);
        });
    } );

    describe( 'mouseOutOption', () =>
    {
        test('should trigger onMouseOutOption() callback function', () =>
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

            driver.mouseOutOption();

            expect( onMouseOutOption.calledOnce ).toBe(true);
        });
    } );

    describe( 'mouseOver', () =>
    {
        test('should trigger onMouseOver() callback function', () =>
        {
            const onMouseOver = jest.fn();
            wrapper.setProps( {
                onMouseOver
            } );

            driver.mouseOver();

            expect( onMouseOver.calledOnce ).toBe(true);
        });
    } );

    describe( 'mouseOverOption', () =>
    {
        test('should trigger onMouseOverOption() callback function', () =>
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

            driver.mouseOverOption();

            expect( onMouseOverOption.calledOnce ).toBe(true);
        });
    } );

    describe( 'scroll', () =>
    {
        test('should trigger onScroll() callback function', () =>
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

            driver.scroll( 0.3 );

            expect( onScroll.calledOnce ).toBe(true);
        });
    } );
} );
