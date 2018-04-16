import React            from 'react';
import { mount }        from 'enzyme';

import { TabButton }    from '../index';

describe( 'TabButton', () =>
{
    let wrapper;

    beforeEach( () =>
    {
        wrapper  = mount( <TabButton /> );
    } );

    describe( 'render()', () =>
    {
        it( 'should render exactly one TabButton', () =>
        {
            expect( wrapper ).to.have.length( 1 );
        } );
    } );
} );

describe.only( 'TabButton Driver', () =>
{
    let wrapper;
    let driver;

    beforeEach( () =>
    {
        wrapper  = mount( <TabButton /> );
        driver   = wrapper.driver();
    } );

    describe( 'click()', () =>
    {
        it( 'should trigger onClick', () =>
        {
            const onClick = sinon.spy();
            wrapper.setProps( {
                onClick
            } );

            wrapper.driver().click();

            expect( onClick.calledOnce ).to.be.true;
        } );

        it( 'should return error if disabled', () =>
        {
            const onClick = sinon.spy();
            wrapper.setProps( {
                onClick,
                isDisabled : true
            } );

            expect( () => wrapper.driver().click() )
                .to.throw( 'Button cannot be clicked because it is disabled' );
        } );
    } );

    describe( 'setDisabled()', () =>
    {
        it( 'should change isDisabled to true', () =>
        {
            driver.setDisabled();

            expect( wrapper.props().isDisabled ).to.be.true;
        } )
    } );

    describe( 'setActive()', () =>
    {
        it( 'should change isActive to true', () =>
        {
            driver.setActive();

            expect( wrapper.props().isActive ).to.be.true;
        } );
    } );
} );
