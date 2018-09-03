/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

/* global test */
/* eslint no-console: 0*/

import React              from 'react';
import { mount, shallow } from 'enzyme';

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

    test( 'should be an instance of StatelessComponent', () =>
    {
        expect( instance.constructor.name ).toBe( 'StatelessComponent' );
    } );

    test( 'should have a header component corresponding to level prop', () =>
    {
        wrapper.setProps( {
            title : 'Boom',
            level : 4,
        } );

        expect( wrapper.find( H4 ) ).toHaveLength( 1 );
    } );

    describe( 'props', () =>
    {
        describe( 'title', () =>
        {
            test( 'should be undefined by default', () =>
            {
                expect( instance.props.title ).toBeUndefined();
            } );

            test( 'should be passed to the header component as children', () =>
            {
                wrapper.setProps( {
                    title : 'Boom',
                    level : 1,
                } );

                expect( wrapper.find( H1 ).prop( 'children' ) ).toBe( 'Boom' );
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
        test( 'should return the content', () =>
        {
            const children = (
                <Section title = "Pikachu">
                    <h2>Lightning Strike</h2>
                </Section>
            );

            wrapper.setProps( {  children } );
            const content = driver.getContent();
            expect( content.find( 'h2' ).text() ).toBe( 'Lightning Strike' );
        } );
    } );
} );
