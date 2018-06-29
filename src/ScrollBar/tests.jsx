/* eslint-env node, mocha */
/* global expect */
/* eslint no-console: 0*/


import React               from 'react';
import { mount, shallow }  from 'enzyme';

import ScrollBar           from './index';

describe( 'ScrollBar', () =>
{
    let wrapper;
    let instance;

    beforeEach( () =>
    {
        wrapper = shallow( <ScrollBar /> );
        instance = wrapper.instance();
    } );


    test( 'should contain exactly one <div>', () => {
        expect( wrapper.find( 'div' ) ).toHaveLength( 1 );
    } );

    test( 'should contain exactly one <input>', () =>
    {
        expect( wrapper.find( 'input' ) ).toHaveLength( 1 );
    } );

    test( '<input> has type="range"', () =>
    {
        expect( wrapper.find( 'input' ).first().prop( 'type' ) ).toBe( 'range' );
    } );

    describe( 'scrollPos', () =>
    {
        test( 'should have a value of 0 as default', () =>
        {
            expect( instance.props.scrollPos ).toBe( 0 );
        } );

        test( 'should be passed to the <input> as value prop', () =>
        {
            wrapper.setProps( { scrollPos: 20 } );
            expect( wrapper.find( 'input' ).first().prop( 'value' ) )
                .toBe( 20 );
        } )
    } )

    describe( 'onChange', () =>
    {
        test( 'should be undefined by default', () =>
        {
            expect( instance.props.onChange ).toBeUndefined();
        } );

        test( 'should be invoked when <input>’s onChange prop is invoked', () =>
        {
            const onChange = jest.fn();
            wrapper.setProps( { onChange } );

            const inputOnChange =
                wrapper.find( 'input' ).first().prop( 'onChange' );

            inputOnChange( {
                target: {}
            } );

            expect( onChange ).toHaveBeenCalledTimes( 1 );
        } );
    } )

    describe( 'scrollMin', () =>
    {
        test( 'should have a value of 0 as default', () =>
        {
            expect( instance.props.scrollMin ).toBe( 0 );
        } );

        test( 'should be passed to the <input> as min prop', () =>
        {
            wrapper.setProps( { scrollMin: 20 } );
            expect( wrapper.find( 'input' ).first().prop( 'min' ) )
                .toBe( 20 );
        } )
    } );

    describe( 'scrollMax', () =>
    {
        test( 'should be undefined by default', () =>
        {
            expect( instance.props.scrollMax ).toBeUndefined();
        } );

        test( 'should be passed to the <input> as max prop', () =>
        {
            wrapper.setProps( { scrollMax: 20 } );
            expect( wrapper.find( 'input' ).first().prop( 'max' ) )
                .toBe( 20 );
        } )
    } );
} );


describe( 'ScrollBarDriver', ()=>
{
    let wrapper;

    beforeEach( () =>
    {
        wrapper = mount( <ScrollBar /> );
    } );

    describe( 'change()', ()=>
    {
        test( 'should change the value of the <input />', ()=> {

            const onChange = jest.fn();
            wrapper.setProps( {
                onChange
            } );
            wrapper.driver().change( 100 );

            expect( onChange ).toHaveBeenCalledTimes( 1 );
        } );
    } );
    describe( 'mouseOver()', ()=>
    {
        test( 'should change the value of the <input />', ()=> {

            const onMouseOver = jest.fn();
            wrapper.setProps( {
                onMouseOver
            } );
            wrapper.driver().mouseOver();

            expect( onMouseOver ).toHaveBeenCalledTimes( 1 );
        } );
    } );

    describe( 'mouseOut()', ()=>
    {
        test( 'should change the value of the <input />', ()=> {

            const onMouseOut = jest.fn();
            wrapper.setProps( {
                onMouseOut
            } );
            wrapper.driver().mouseOut();

            expect( onMouseOut ).toHaveBeenCalledTimes( 1 );
        } );
    } );
} );
