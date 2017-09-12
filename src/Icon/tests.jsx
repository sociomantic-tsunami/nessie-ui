/* eslint-env node, mocha */
/* global expect */
/* eslint no-console: 0*/
/* eslint-disable no-magic-numbers, no-multi-str, no-unused-expressions */


import React        from 'react';
import { mount }    from 'enzyme';

import Icon         from './index';


describe( 'Icon', () =>
{
    let Wrapper;

    beforeEach( () =>
    {
        Wrapper = mount( <Icon /> );
    } );

    it( 'should render <Icon/>', () =>
    {
        expect( Wrapper.find( Icon ) ).to.have.length( 1 );
    } );

    it( 'should have its component name as default className', () =>
    {
        expect( Wrapper.hasClass( 'icon__default' ) ).to.equal( true );
    } );

    it( 'should have size S by default', () =>
    {
        expect( Wrapper.hasClass( 'icon__size__S' ) ).to.equal( true );
    } );

    it( 'should have light theme by default', () =>
    {
        expect( Wrapper.hasClass( 'icon__theme__light' ) ).to.equal( true );
    } );

    it( 'should display account icon when type is account', () =>
    {
        const props = {
            type : 'account'
        };
        Wrapper = mount( <Icon { ...props } /> );
        expect( Wrapper.hasClass( 'icon__type__account' ) ).to.equal( true );
        expect( Wrapper.hasClass( 'icon__variant__fill' ) ).to.equal( false );
        expect( Wrapper.hasClass( 'icon__variant__stroke' ) ).to.equal( false );
    } );

    it( 'should display alert-fill icon when type is alert and variant is \
undeclared', () =>
    {
        const props = {
            type : 'alert'
        };
        Wrapper = mount( <Icon { ...props } /> );
        expect( Wrapper.hasClass( 'icon__type__alert' ) ).to.equal( true );
        expect( Wrapper.hasClass( 'icon__variant__fill' ) ).to.equal( true );
    } );

    it( 'should display alert-stroke icon when type is alert and variant is \
stroke', () =>
    {
        const props = {
            type    : 'alert',
            variant : 'stroke'
        };
        Wrapper = mount( <Icon { ...props } /> );
        expect( Wrapper.hasClass( 'icon__type__alert' ) ).to.equal( true );
        expect( Wrapper.hasClass( 'icon__variant__stroke' ) ).to.equal( true );
    } );

    it( 'should fire onMouseOver event', () =>
    {
        const onMouseOverHandler = sinon.spy();
        const onMouseOutHandler = sinon.spy();
        const props = {
            type        : 'alert',
            onMouseOver : onMouseOverHandler,
            onMouseOut  : onMouseOutHandler
        };

        Wrapper = mount( <Icon { ...props } /> );

        Wrapper.driver().mouseOver();

        expect( onMouseOverHandler.calledOnce ).to.be.true;
        expect( onMouseOutHandler.notCalled ).to.be.true;
    } );

    it( 'should fire onMouseOut event', () =>
    {
        const onMouseOverHandler = sinon.spy();
        const onMouseOutHandler = sinon.spy();
        const props = {
            type        : 'alert',
            onMouseOver : onMouseOverHandler,
            onMouseOut  : onMouseOutHandler
        };

        Wrapper = mount( <Icon { ...props } /> );

        Wrapper.driver().mouseOut();

        expect( onMouseOverHandler.notCalled ).to.be.true;
        expect( onMouseOutHandler.calledOnce ).to.be.true;
    } );
} );
