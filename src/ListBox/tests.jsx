/* global test jest */
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
        test( 'should accept a single ListBox as children', () =>
        {
            wrapper.setProps( { children: <ListBox /> } );
            expect( wrapper.find( ListBox ) ).toHaveLength( 1 );
        } );

        test( 'should accept an array of ListBoxes as children', () =>
        {
            wrapper.setProps( { children: [ <ListBox />, <ListBox /> ] } );
            expect( wrapper.find( ListBox ) ).toHaveLength( 2 );
        } );
    } );
} );


describe( 'ListBoxDriver', () =>
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
        test( 'should trigger onClickOption once when clicked on \
ListBoxOption at given index', () =>
        {
            const onClickOption = jest.fn();

            wrapper.setProps( {
                onClickOption,
                options : [ {
                    'text' : 'Option',
                },
                {
                    'text'        : 'Option with description',
                    'value'       : 'value2',
                    'description' : 'Option description',
                },
                {
                    'text'       : 'Disabled option',
                    'value'      : 'value3',
                    'isDisabled' : true,
                },
                {
                    header  : 'Subsection 1',
                    options : [
                        {
                            'text' : 'Subsection option 1',
                        },
                        {
                            'text' : 'Subsection option 2',
                        },
                        {
                            'text'        : 'Subsection description',
                            'description' : 'Option description',
                            'value'       : 'value12',
                        },
                    ],
                } ],
            } );

            driver.clickOption( 1 );

            expect( onClickOption ).toBeCalledTimes( 1 );
        } );
    } );


    describe( 'mouseOverOption', () =>
    {
        test( 'should trigger onMouseOverOption once when hovered on \
ListBoxOption at given index', () =>
        {
            const onMouseOverOption = jest.fn();

            wrapper.setProps( {
                onMouseOverOption,
                options : [ {
                    'text' : 'Option',
                },
                {
                    'text'        : 'Option with description',
                    'value'       : 'value2',
                    'description' : 'Option description',
                },
                {
                    'text'       : 'Disabled option',
                    'value'      : 'value3',
                    'isDisabled' : true,
                },
                {
                    header  : 'Subsection 1',
                    options : [
                        {
                            'text' : 'Subsection option 1',
                        },
                        {
                            'text' : 'Subsection option 2',
                        },
                        {
                            'text'        : 'Subsection description',
                            'description' : 'Option description',
                            'value'       : 'value12',
                        },
                    ],
                } ],
            } );

            driver.mouseOverOption( 1 );

            expect( onMouseOverOption ).toBeCalledTimes( 1 );
        } );
    } );


    describe( 'mouseOutOption', () =>
    {
        test( 'should trigger onMouseOutOption once when hovered on \
ListBoxOption at given index', () =>
        {
            const onMouseOutOption = jest.fn();

            wrapper.setProps( {
                onMouseOutOption,
                options : [ {
                    'text' : 'Option',
                },
                {
                    'text'        : 'Option with description',
                    'value'       : 'value2',
                    'description' : 'Option description',
                },
                {
                    'text'       : 'Disabled option',
                    'value'      : 'value3',
                    'isDisabled' : true,
                },
                {
                    header  : 'Subsection 1',
                    options : [
                        {
                            'text' : 'Subsection option 1',
                        },
                        {
                            'text' : 'Subsection option 2',
                        },
                        {
                            'text'        : 'Subsection description',
                            'description' : 'Option description',
                            'value'       : 'value12',
                        },
                    ],
                } ],
            } );

            driver.mouseOutOption( 0 );

            expect( onMouseOutOption ).toBeCalledTimes( 1 );
        } );
    } );


    describe( 'keyPress', () =>
    {
        test( 'should trigger onKeyPress once', () =>
        {
            const onKeyPress = jest.fn();

            wrapper.setProps( {
                onKeyPress,
                options : [ {
                    'text' : 'Option',
                },
                {
                    'text'        : 'Option with description',
                    'value'       : 'value2',
                    'description' : 'Option description',
                },
                {
                    'text'       : 'Disabled option',
                    'value'      : 'value3',
                    'isDisabled' : true,
                } ],
            } );

            driver.keyPress();

            expect( onKeyPress ).toBeCalledTimes( 1 );
        } );
    } );
} );
