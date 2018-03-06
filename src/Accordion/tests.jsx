/* eslint-env node, mocha */
/* eslint-disable no-magic-numbers, no-multi-str, no-unused-expressions */
/* global expect */

import React                            from 'react';
import { shallow }                      from 'enzyme';

import { H2, AccordionItem, TextInput } from '../index';

import Accordion                        from './index';


describe( 'Accordion', () =>
{
    let wrapper;
    // let instance;

    beforeEach( () =>
    {
        wrapper  = shallow( <Accordion /> );
        // instance = wrapper.instance();
    } );

    describe( 'render()', () =>
    {
        it( 'should contain an H2 when header prop is passed', () =>
        {
            wrapper.setProps( { header: 'Header' } );
            expect( wrapper.find( H2 ) ).to.have.length( 1 );
        } );

        it( 'should have AccordionItem when passed as children ', () =>
        {
            wrapper.setProps( { children : [
                <AccordionItem headerText = "Form1" />,
                <AccordionItem isOpen headerText = "Form2">
                    <TextInput label = "Your name" />
                </AccordionItem> ] } );
            expect( wrapper.find( AccordionItem ) ).to.have.length( 2 );
        } );
    } );

    // describe( 'props()', () =>
    // {
    //     it( 'should pass isDisabled to all the childrens', () =>
    //     {
    //         wrapper.setProps( { children : [
    //             <AccordionItem headerText = "Form1" />,
    //             <AccordionItem isOpen headerText = "Form2">
    //                 <TextInput label = "Your name" />
    //             </AccordionItem> ],
    //         isDisable : true } );
    //         expect( wrapper.find( AccordionItem )[ 0 ].prop( 'isDisabled' ) )
    //             .to.be.true;
		// 				expect( wrapper.find( AccordionItem )[ 0 ].prop( 'isDisabled' ) )
		//             .to.be.true;
    //     } );
    // } );
} );
