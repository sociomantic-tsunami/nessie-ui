/* eslint-env node, mocha */
/* eslint-disable no-magic-numbers, no-multi-str, no-unused-expressions */
/* global expect */

import React                from 'react';
import { shallow }          from 'enzyme';

import H2                   from '../H2';
import Icon                 from '../Icon';
import AccordionItemHeader  from './AccordionItemHeader';
import AccordionItemContent from './AccordionItemContent';

import AccordionItem        from './index';

describe( 'AccordionItem', () =>
{
    let wrapper;
    // let instance;

    beforeEach( () =>
    {
        wrapper  = shallow( <AccordionItem /> );
        // instance = wrapper.instance();
    } );

    describe( 'render()', () =>
    {
        it( 'should contain exactly one Accordion Item Header', () =>
        {
            expect( wrapper.find( AccordionItemHeader ) ).to.have.length( 1 );
        } );

        it( 'should contain an Accordion Item Content when is expanded', () =>
        {
            wrapper.setProps( { isOpen: true } );
            expect( wrapper.find( AccordionItemContent ) ).to.have.length( 1 );
        } );

        it( 'should not contain an Accordion Item Content when collapsed', () =>
        {
            wrapper.setProps( { isOpen: false } );
            expect( wrapper.find( AccordionItemContent ) ).to.have.length( 0 );
        } );
    } );
} );

describe( 'AccordionItemHeader', () =>
{
    let wrapper;
    // let instance;

    beforeEach( () =>
    {
        wrapper  = shallow( <AccordionItemHeader /> );
        // instance = wrapper.instance();
    } );

    describe( 'render()', () =>
    {
        it( 'should contain exactly one <button>', () =>
        {
            expect( wrapper.find( 'button' ) ).to.have.length( 1 );
        } );

        it( 'should have a exactly one Icon', () =>
        {
            expect( wrapper.find( Icon ) ).to.have.length( 1 );
        } );

        it( 'should contain a H2 component by default', () =>
        {
            wrapper.setProps( { headerText: 'Boom' } );
            expect( wrapper.find( H2 ) ).to.have.length( 1 );
        } );
    } );

    describe( 'props', () =>
    {
        describe( 'iconType', () =>
        {
            it( 'should contain "down" icon when is collapsed', () =>
            {
                wrapper.setProps( { isOpen: false } );

                expect( wrapper.find( Icon ).prop( 'type' ) )
                    .to.equal( 'down' );
            } );

            it( 'should contain "up" icon when is expanded', () =>
            {
                wrapper.setProps( { isOpen: true } );

                expect( wrapper.find( Icon ).prop( 'type' ) )
                    .to.equal( 'up' );
            } );
        } );
    } );
} );

describe( 'AccordionItemContent', () =>
{
    let wrapper;
    // let instance;

    beforeEach( () =>
    {
        wrapper  = shallow( <AccordionItemContent /> );
        // instance = wrapper.instance();
    } );

    describe( 'render()', () =>
    {
        it( 'should contain exactly one <div>', () =>
        {
            expect( wrapper.find( 'div' ) ).to.have.length( 1 );
        } );
    } );
} );
