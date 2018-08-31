/* global test */

import React              from 'react';
import { mount, shallow } from 'enzyme';

import { H1, H4 }         from '../index';

import Section            from './index';


describe( 'Section', () =>
{
    let wrapper;

    beforeEach( () =>
    {
        wrapper = shallow( <Section /> );
    } );

    test( 'should be a stateless functional component', () =>
    {
        expect( wrapper.instance() ).toBe( null );
    } );

    test( 'should have a header component corresponding to level prop', () =>
    {
        wrapper.setProps( { title: 'Boom', level: 4 } );
        expect( wrapper.find( H4 ) ).toHaveLength( 1 );
    } );

    describe( 'props', () =>
    {
        describe( 'title', () =>
        {
            test( 'should be undefined by default', () =>
            {
                expect( Section.defaultProps.title ).toBeUndefined();
            } );

            test( 'should be passed to the header component as children', () =>
            {
                wrapper.setProps( { title: 'Boom', level: 1 } );
                expect( wrapper.find( H1 ).prop( 'children' ) ).toBe( 'Boom' );
            } );
        } );
    } );
} );


describe( 'SectionDriver', () =>
{
    let wrapper;

    beforeEach( () =>
    {
        wrapper = mount( <Section /> );
    } );

    describe( 'getContent()', () =>
    {
        test( 'should return the content', () =>
        {
            const children = (
                <Section title = "Pikachu">
                    <h2>Lightning Strike</h2>
                </Section>
            );

            wrapper.setProps( {  children } );
            const content = wrapper.driver().getContent();
            expect( content.find( 'h2' ).text() ).toBe( 'Lightning Strike' );
        } );
    } );
} );
