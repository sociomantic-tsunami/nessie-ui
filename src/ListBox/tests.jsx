/* eslint-env node, mocha */
/* global expect */
/* eslint no-console: 0*/
/* eslint-disable no-magic-numbers, no-multi-str*/

import React                 from 'react';
import { shallow, mount }    from 'enzyme';

import ListBox               from './index';


describe( 'ListBox', () =>
{
    let wrapper;

    beforeEach( () =>
    {
        wrapper  = shallow( <ListBox /> );
    } );

    describe( 'render()', () =>
    {
        it( 'should accept a single Tab as children', () =>
        {
            wrapper.setProps( { children: <ListBox /> } );
            expect( wrapper.find( ListBox ) ).to.have.length( 1 );
        } );

        it( 'should accept an array of Tabs as children', () =>
        {
            wrapper.setProps( { children: [ <ListBox />, <ListBox /> ] } );
            expect( wrapper.find( ListBox ) ).to.have.length( 2 );
        } );
    } );
} );


describe.only( 'ListBoxDriver', () =>
{
    let wrapper;
    let driver;

    beforeEach( () =>
    {
        wrapper  = mount( <ListBox /> );
        driver   = wrapper.driver();
    } );

    describe( 'clickOption', () =>
    {
        it( 'should trigger onClickOption when clicked on \
ListBoxOption at given index', () =>
            {
                const onClickOption = sinon.spy();

                wrapper.setProps( {
                    onClickOption,
                    options : [ {
                        'text' : 'Option'
                    },
                    {
                        'text'        : 'Option with description',
                        'value'       : 'value2',
                        'description' : 'Option description'
                    },
                    {
                        'text'     : 'Disabled option',
                        'value'    : 'value3',
                        'disabled' : true
                    },
                    {
                        header  : 'Subsection 1',
                        options : [
                            {
                                'text' : 'Subsection option 1'
                            },
                            {
                                'text' : 'Subsection option 2'
                            },
                            {
                                'text'        : 'Subsection description',
                                'description' : 'Option description',
                                'value'       : 'value12'
                            }
                        ]
                    } ]
                } );

                driver.clickOption( 1 );

                expect( onClickOption.calledOnce ).to.be.true;
            } );
    } );


    describe( 'mouseOverOption', () =>
    {
        it( 'should trigger onMouseOverOption when hovered on \
ListBoxOption at given index', () =>
            {
                const onMouseOverOption = sinon.spy();

                wrapper.setProps( {
                    onMouseOverOption,
                    options : [ {
                        'text' : 'Option'
                    },
                    {
                        'text'        : 'Option with description',
                        'value'       : 'value2',
                        'description' : 'Option description'
                    },
                    {
                        'text'     : 'Disabled option',
                        'value'    : 'value3',
                        'disabled' : true
                    },
                    {
                        header  : 'Subsection 1',
                        options : [
                            {
                                'text' : 'Subsection option 1'
                            },
                            {
                                'text' : 'Subsection option 2'
                            },
                            {
                                'text'        : 'Subsection description',
                                'description' : 'Option description',
                                'value'       : 'value12'
                            }
                        ]
                    } ]
                } );

                driver.mouseOverOption( 1 );

                expect( onMouseOverOption.calledOnce ).to.be.true;
            } );
    } );


    describe( 'mouseOutOption', () =>
    {
        it( 'should trigger onMouseOutOption when hovered on \
ListBoxOption at given index', () =>
            {
                const onMouseOutOption = sinon.spy();

                wrapper.setProps( {
                    onMouseOutOption,
                    options : [ {
                        'text' : 'Option'
                    },
                    {
                        'text'        : 'Option with description',
                        'value'       : 'value2',
                        'description' : 'Option description'
                    },
                    {
                        'text'     : 'Disabled option',
                        'value'    : 'value3',
                        'disabled' : true
                    },
                    {
                        header  : 'Subsection 1',
                        options : [
                            {
                                'text' : 'Subsection option 1'
                            },
                            {
                                'text' : 'Subsection option 2'
                            },
                            {
                                'text'        : 'Subsection description',
                                'description' : 'Option description',
                                'value'       : 'value12'
                            }
                        ]
                    } ]
                } );

                driver.mouseOutOption( 0 );

                expect( onMouseOutOption.calledOnce ).to.be.true;
            } );
    } );
} );
