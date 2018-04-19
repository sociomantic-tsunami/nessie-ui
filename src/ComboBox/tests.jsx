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
} );
