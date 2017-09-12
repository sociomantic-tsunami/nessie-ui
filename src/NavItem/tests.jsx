/* eslint-env node, mocha */
/* global expect */
/* eslint no-console: 0*/
/* eslint-disable no-magic-numbers, no-multi-str, no-unused-expressions */

import React     from 'react';
import { mount } from 'enzyme';

import NavItem   from './index';

describe( 'NavItem', () =>
{
    const onClickSpy = sinon.spy();
    const onMouseOverSpy = sinon.spy();
    const onMouseOutSpy = sinon.spy();

    let Wrapper;

    beforeEach( () =>
    {
        onClickSpy.reset();
        onMouseOverSpy.reset();
        onMouseOutSpy.reset();

        Wrapper = mount( <NavItem
            label       = "testLabel"
            onClick     = { onClickSpy }
            onMouseOver = { onMouseOverSpy }
            onMouseOut  = { onMouseOutSpy }
        /> );
    } );

    it( 'should have its component name and hash as default className', () =>
    {
        expect( Wrapper.find( '.navItem__default' ) ).to.have.length( 1 );
    } );

    it( 'should trigger callback on click', () =>
    {
        Wrapper.driver().click();

        expect( onClickSpy.calledOnce ).to.be.true;
    } );

    it( 'should trigger callback on mouse over', () =>
    {
        Wrapper.driver().mouseOver();

        expect( onMouseOverSpy.calledOnce ).to.be.true;
    } );

    it( 'should trigger callback on mouse out', () =>
    {
        Wrapper.driver().mouseOut();

        expect( onMouseOutSpy.calledOnce ).to.be.true;
    } );

    it( 'driver method `getLabel` should return the component label', () =>
    {
        Wrapper = mount( <NavItem
            label = { <span>testLabel</span> }
        /> );

        const label = Wrapper.driver().getLabel();

        expect( label.html() ).to.be.equal( '<span>testLabel</span>' );
    } );
} );
