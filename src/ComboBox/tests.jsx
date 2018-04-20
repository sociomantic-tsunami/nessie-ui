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
        it( 'should render ComboBox', () =>
        {
            expect( wrapper ).to.have.length( 1 );
        } );
    } );
} );


describe.only( 'ComboBoxDriver', () =>
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
        it( 'should trigger onBlur() callback function', () =>
        {
            const onBlur = sinon.spy();
            wrapper.setProps( {
                onBlur
            } );

            driver.blur();

            expect( onBlur.calledOnce ).to.be.true;
        } );
    } );

    describe( 'clickOption', () =>
    {
        it( 'should trigger onClickInput() callback function', () =>
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

            expect( onClickOption.calledOnce ).to.be.true;
        } );
    } );

    describe( 'focus', () =>
    {
        it( 'should trigger onFocus() callback function', () =>
        {
            const onFocus = sinon.spy();
            wrapper.setProps( {
                onFocus
            } );

            driver.focus();

            expect( onFocus.calledOnce ).to.be.true;
        } );
    } );

    describe( 'mouseOut', () =>
    {
        it( 'should trigger onMouseOut() callback function', () =>
        {
            const onMouseOut = sinon.spy();
            wrapper.setProps( {
                onMouseOut
            } );

            driver.mouseOut();

            expect( onMouseOut.calledOnce ).to.be.true;
        } );
    } );

    describe( 'mouseOutOption', () =>
    {
        it( 'should trigger onMouseOutOption() callback function', () =>
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

            expect( onMouseOutOption.calledOnce ).to.be.true;
        } );
    } );

    describe( 'mouseOver', () =>
    {
        it( 'should trigger onMouseOver() callback function', () =>
        {
            const onMouseOver = sinon.spy();
            wrapper.setProps( {
                onMouseOver
            } );

            driver.mouseOver();

            expect( onMouseOver.calledOnce ).to.be.true;
        } );
    } );

    describe( 'mouseOverOption', () =>
    {
        it( 'should trigger onMouseOverOption() callback function', () =>
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

            expect( onMouseOverOption.calledOnce ).to.be.true;
        } );
    } );
} );
