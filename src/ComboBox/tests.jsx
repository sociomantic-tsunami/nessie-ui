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
            const onBlur = sinon.spy();
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
            const onChangeInput = sinon.spy();
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
            const onClickInput = sinon.spy();
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
            const onClickOption = sinon.spy();
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
            const onFocus = sinon.spy();
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
            const onKeyDown = sinon.spy();
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
            const onKeyPress = sinon.spy();
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
            const onKeyUp = sinon.spy();
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
            const onMouseOut = sinon.spy();
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
            const onMouseOutOption = sinon.spy();
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
            const onMouseOver = sinon.spy();
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
            const onMouseOverOption = sinon.spy();
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
            const onScroll = sinon.spy();
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
