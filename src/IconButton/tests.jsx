/* eslint-env node, mocha */
/* global expect */


import React              from 'react';
import { shallow, mount } from 'enzyme';

import Css                from '../hoc/Css';
import { Icon }           from '../index';

import IconButton         from './index';


describe( 'IconButton', () =>
{
    let wrapper;
    let instance;

    beforeEach( () =>
    {
        wrapper  = shallow( <IconButton /> );
        instance = wrapper.instance();
    } );

    describe( 'constructor( props )', () =>
    {
        it( 'should have name IconButton', () =>
        {
            expect( instance.constructor.name ).to.equal( 'IconButton' );
        } );
    } );

    describe( 'render()', () =>
    {
        it( 'should implement the Css higher-order component', () =>
        {
            expect( wrapper.find( Css ) ).to.have.length( 1 );
        } );

        it( 'should contain exactly one Icon', () =>
        {
            expect( wrapper.find( Icon ) ).to.have.length( 1 );
        } );
    } );

    describe( 'props', () =>
    {
        describe( 'iconTheme', () =>
        {
            it( 'should be "control" by default', () =>
            {
                expect( instance.props.iconTheme ).to.equal( 'control' );
            } );

            it( 'should be passed to the Icon as theme', () =>
            {
                wrapper.setProps( { iconTheme: 'light' } );
                expect( wrapper.find( Icon ).prop( 'theme' ) )
                    .to.equal( 'light' );
            } );
        } );

        describe( 'iconSize', () =>
        {
            it( 'should be "S" by default', () =>
            {
                expect( instance.props.iconSize ).to.equal( 'S' );
            } );

            it( 'should be passed to the Icon as size', () =>
            {
                wrapper.setProps( { iconSize: 'L' } );
                expect( wrapper.find( Icon ).prop( 'size' ) )
                    .to.equal( 'L' );
            } );
        } );

        describe( 'iconType', () =>
        {
            it( 'should be undefiend by default', () =>
            {
                expect( instance.props.iconType ).to.be.undefined;
            } );

            it( 'should be passed to the Icon as type', () =>
            {
                wrapper.setProps( { iconType: 'add' } );
                expect( wrapper.find( Icon ).prop( 'type' ) )
                    .to.equal( 'add' );
            } );
        } );
    } );
} );

describe( 'IconButtonDriver', () =>
{
    let wrapper;
    let driver;

    beforeEach( () =>
    {
        wrapper = mount( <IconButton /> );
        driver  = wrapper.driver();
    } );

    describe( 'click()', () =>
    {
        it( 'should fire the onClick callback prop', () =>
        {
            const clickSpy = sinon.spy();
            wrapper.setProps( { onClick: clickSpy } );

            driver.click();
            expect( clickSpy.calledOnce ).to.be.true;
        } );
    } );

    describe( 'focus()', () =>
    {
        it( 'should fire the onFocus callback prop', () =>
        {
            const focusSpy = sinon.spy();
            wrapper.setProps( { onFocus: focusSpy } );

            driver.focus();
            expect( focusSpy.calledOnce ).to.be.true;
        } );
    } );

    describe( 'blur()', () =>
    {
        it( 'should fire the onBlur callback prop', () =>
        {
            const blurSpy = sinon.spy();
            wrapper.setProps( { onBlur: blurSpy } );

            driver.blur();
            expect( blurSpy.calledOnce ).to.be.true;
        } );
    } );
} );
