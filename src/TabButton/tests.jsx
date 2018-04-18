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

describe( 'TabButton Driver', () =>
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

            driver.click();

            expect( onClick.calledOnce ).to.be.true;
        } );

        it( 'should return error if disabled', () =>
        {
            const onClick = sinon.spy();
            wrapper.setProps( {
                onClick,
                isDisabled : true
            } );

            expect( () => driver.click() )
                .to.throw( 'Button cannot be clicked because it is disabled' );
        } );
    } );
} );
