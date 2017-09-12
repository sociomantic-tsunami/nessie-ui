/* eslint-env node, mocha */
/* global expect */
/* eslint no-console: 0*/
/* eslint-disable no-magic-numbers, no-multi-str*/


import React              from 'react';
import { mount, shallow } from 'enzyme';

import Css                from '../hoc/Css';
import { H2, H3 }         from '../index';

import Module             from './index';


describe( 'Module', () =>
{
    let wrapper;
    let instance;

    beforeEach( () =>
    {
        wrapper  = shallow( <Module /> );
        instance = wrapper.instance();
    } );

    describe( 'constructor( props )', () =>
    {
        it( 'should have name Button', () =>
        {
            expect( instance.constructor.name ).to.equal( 'Module' );
        } );
    } );

    describe( 'render()', () =>
    {
        it( 'should implement the Css injector component', () =>
        {
            expect( wrapper.find( Css ) ).to.have.length( 1 );
        } );

        it( 'should not contain a <header> by default', () =>
        {
            expect( wrapper.find( 'header' ) ).to.have.length( 0 );
        } );

        it( 'should contain a <header> if title prop is set', () =>
        {
            wrapper.setProps( { title: 'Boom' } );
            expect( wrapper.find( 'header' ) ).to.have.length( 1 );
        } );

        it( 'should contain a <header> if customHeader prop is set', () =>
        {
            wrapper.setProps( { customHeader: 'Boom' } );
            expect( wrapper.find( 'header' ) ).to.have.length( 1 );
        } );

        it( 'should contain a H2 component by default when has title', () =>
        {
            wrapper.setProps( { title: 'Boom' } );
            expect( wrapper.find( H2 ) ).to.have.length( 1 );
        } );

        it( 'should have a header corresponding to headerLevel prop', () =>
        {
            wrapper.setProps( {
                title       : 'Boom',
                headerLevel : 3
            } );

            expect( wrapper.find( H3 ) ).to.have.length( 1 );
        } );
    } );

    describe( 'props', () =>
    {
        it( 'should be undefined by default', () =>
        {
            expect( instance.props.title ).to.be.undefined;
        } );

        describe( 'title', () =>
        {
            it( 'should be passed to the header component as children', () =>
            {
                wrapper.setProps( { title: 'Boom' } );

                expect( wrapper.find( H2 ).prop( 'children' ) )
                    .to.equal( 'Boom' );
            } );
        } );
    } );
} );


describe( 'ModuleDriver', () =>
{
    let wrapper;
    let driver;

    beforeEach( () =>
    {
        wrapper = mount( <Module /> );
        driver  = wrapper.driver();
    } );

    describe( 'toggle()', () =>
    {
        it( 'should fire the onClickToggle prop', () =>
        {
            const toggleSpy = sinon.spy();
            wrapper.setProps( {
                title         : 'Boom',
                isCollapsible : true,
                onClickToggle : toggleSpy
            } );

            driver.toggle();

            expect( toggleSpy.calledOnce ).to.be.true;
        } );
    } );

    describe( 'clickDelete()', () =>
    {
        it( 'should fire the onClickDelete prop', () =>
        {
            const clickDeleteSpy = sinon.spy();
            wrapper.setProps( {
                title         : 'Boom',
                isDeletable   : true,
                onClickDelete : clickDeleteSpy
            } );

            driver.clickDelete();

            expect( clickDeleteSpy.calledOnce ).to.be.true;
        } );
    } );

    describe( 'getCustomHeader()', () =>
    {
        it( 'should return the customHeader content', () =>
        {
            wrapper.setProps( {
                title        : 'Boom',
                customHeader : <h1 className = "pokemon">Pikachu</h1>
            } );

            const header = driver.getCustomHeader();
            expect( header.find( '.pokemon' ) ).to.have.length( 1 );
        } );
    } );
} );
