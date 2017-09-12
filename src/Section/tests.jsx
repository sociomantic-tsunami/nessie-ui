/* eslint-env node, mocha */
/* global expect */
/* eslint no-console: 0*/

import React              from 'react';
import { mount, shallow } from 'enzyme';

import Css                from '../hoc/Css';
import { H1, H4 }         from '../index';

import Section            from './index';

describe( 'Section', () =>
{
    let wrapper;
    let instance;

    beforeEach( () =>
    {
        wrapper  = shallow( <Section /> );
        instance = wrapper.instance();
    } );

    describe( 'constructor( props )', () =>
    {
        it( 'should have name Button', () =>
        {
            expect( instance.constructor.name ).to.equal( 'Section' );
        } );
    } );

    describe( 'render()', () =>
    {
        it( 'should implement the Css injector component', () =>
        {
            expect( wrapper.find( Css ) ).to.have.length( 1 );
        } );

        it( 'should have a header component corresponding to level prop', () =>
        {
            wrapper.setProps( {
                title : 'Boom',
                level : 4
            } );

            expect( wrapper.find( H4 ) ).to.have.length( 1 );
        } );
    } );

    describe( 'props', () =>
    {
        describe( 'title', () =>
        {
            it( 'should be undefined by default', () =>
            {
                expect( instance.props.title ).to.be.undefined;
            } );

            it( 'should be passed to the header component as children', () =>
            {
                wrapper.setProps( {
                    title : 'Boom',
                    level : 1
                } );

                expect( wrapper.find( H1 ).prop( 'children' ) )
                    .to.equal( 'Boom' );
            } );
        } );
    } );
} );


describe( 'SectionDriver', () =>
{
    let wrapper;
    let driver;

    beforeEach( () =>
    {
        wrapper = mount( <Section /> );
        driver  = wrapper.driver();
    } );

    describe( 'getContent()', () =>
    {
        it( 'should return the content', () =>
        {
            const children = (
                <Section title = "Pikachu">
                    <h2>Lightning Strike</h2>
                </Section>
            );

            wrapper.setProps( {  children } );
            const content = driver.getContent();
            expect( content.find( 'h2' ).text() )
                .to.equal( 'Lightning Strike' );
        } );
    } );
} );
