/* eslint-env node, mocha */
/* global expect */
/* eslint no-console: 0*/
/* eslint-disable no-magic-numbers, no-multi-str, no-unused-expressions */

import React              from 'react';
import { mount, shallow } from 'enzyme';

import Icon               from './index';


describe( 'Icon', () =>
{
    let wrapper;
    let instance;

    beforeEach( () =>
    {
        wrapper  = shallow( <Icon /> );
        instance = wrapper.instance();
    } );

    it( 'should have size S by default', () =>
    {
        expect( instance.props.size ).to.equal( 'S' );
    } );

    it( 'should have light theme by default', () =>
    {
        expect( instance.props.theme ).to.equal( 'light' );
    } );
} );


describe( 'IconDriver', () =>
{
    let wrapper;

    beforeEach( () =>
    {
        wrapper = mount( <Icon /> );
    } );

    it( 'should fire onMouseOver event', () =>
    {
        const onMouseOver = sinon.spy();
        const onMouseOut = sinon.spy();
        wrapper.setProps( { type: 'alert', onMouseOver, onMouseOut } );

        wrapper.driver().mouseOver();

        expect( onMouseOver.calledOnce ).to.be.true;
        expect( onMouseOut.notCalled ).to.be.true;
    } );

    it( 'should fire onMouseOver event', () =>
    {
        const onMouseOver = sinon.spy();
        const onMouseOut = sinon.spy();
        wrapper.setProps( { type: 'alert', onMouseOver, onMouseOut } );

        wrapper.driver().mouseOut();

        expect( onMouseOut.calledOnce ).to.be.true;
        expect( onMouseOver.notCalled ).to.be.true;
    } );
} );
