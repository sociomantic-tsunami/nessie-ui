/* eslint-env node, mocha */
/* global expect */
/* eslint no-console: 0*/
/* eslint-disable no-magic-numbers, no-multi-str, no-unused-expressions */


import React               from 'react';
import { shallow, mount }  from 'enzyme';

import Icon                from '../Icon';

import ToggleButton        from './index';


describe( 'ToggleButton', () =>
{
    let instance;
    let wrapper;

    beforeEach( () =>
    {
        wrapper = shallow( <ToggleButton /> );
        instance = wrapper.instance();
    } );
    describe( 'label', () =>
    {
        test( 'should be undefined by default', () =>
        {
            expect( instance.props.label ).toBeUndefined();
        } );
    } );
    describe( 'role', () =>
    {
        test( 'should be "primary" by default', () =>
        {
            expect( instance.props.role ).toEqual( 'primary' );
        } );
    } );
    describe( 'id', () =>
    {
        test( 'should be defined', () =>
        {
            expect( instance.props.id ).toBeUndefined();
        } );
    } );
    describe( 'Icon', () =>
    {
        describe( 'iconType', () =>
        {
            test( 'should contain an Icon when iconType is not "none"', () =>
            {
                wrapper.setProps( { iconType: 'add' } );
                expect( wrapper.find( Icon ) ).toHaveLength( 1 );
            } );
        } );
        describe( 'iconPosition', () =>
        {
            test( 'should be "left" by default', () =>
            {
                expect( instance.props.iconPosition ).toEqual( 'left' );
            } );
        } );
        describe( 'iconSize', () =>
        {
            test( 'should always be "M"', () =>
            {
                wrapper.setProps( { iconType: 'add' } );
                expect( wrapper.find( Icon ).first().prop( 'size' ) ).toEqual( 'S' );
            } );
        } );
    } );
    describe( 'isDisabled', () =>
    {
        test( 'should be false by default', () =>
        {
            expect( instance.props.isDisabled ).toBeFalsy();
        } );
        test( 'should be passed to the button as "disabled" when true', () =>
        {
            wrapper.setProps( { isDisabled: true } );
            expect( wrapper.prop( 'disabled' ) ).toBeTruthy();
        } );
    } );

    describe( 'isReadOnly', () =>
    {
        test( 'should be false by default', () =>
        {
            expect( instance.props.isReadOnly ).toBeFalsy();
        } );
        test( 'should be passed to the button as "readOnly" when true', () =>
        {
            wrapper.setProps( { isReadOnly: true } );
            expect( wrapper.prop( 'readOnly' ) ).toBeTruthy();
        } );
    } );

    describe( 'type', () =>
    {
        test( 'should be "button" by default', () =>
        {
            expect( wrapper.find( 'button' ).prop( 'type' ) ).toEqual( 'button' );
        } );
    } );

    describe( 'onClick', () =>
    {
        test( 'should be undefined by default', () =>
        {
            expect( instance.props.onClick ).toBeUndefined();
        } );

        test( 'should be passed to the button element', () =>
        {
            const onClick = () =>
            {};
            wrapper.setProps( { onClick } );
            expect( wrapper.prop( 'onClick' ) ).toEqual( onClick );
        } );
    } );

    describe( 'onFocus', () =>
    {
        test( 'should be undefined by default', () =>
        {
            expect( instance.props.onFocus ).toBeUndefined();
        } );
        test( 'should be passed to the button element', () =>
        {
            const onFocus = () =>
            {};
            wrapper.setProps( { onFocus } );
            expect( wrapper.prop( 'onFocus' ) ).toEqual( onFocus );
        } );
    } );

    describe( 'onMouseOver', () =>
    {
        test( 'should be undefined by default', () =>
        {
            expect( instance.props.onMouseOver ).toBeUndefined();
        } );
        test( 'should be passed to the button element as onMouseEnter', () =>
        {
            const onMouseOver = () =>
            {};
            wrapper.setProps( { onMouseOver } );
            expect( wrapper.prop( 'onMouseEnter' ) ).toEqual( onMouseOver );
        } );
    } );

    describe( 'onMouseOut', () =>
    {
        test( 'should be undefined by default', () =>
        {
            expect( instance.props.onMouseOut ).toBeUndefined();
        } );
        test( 'should be passed to the button element as onMouseLeave', () =>
        {
            const onMouseOut = () =>
            {};
            wrapper.setProps( { onMouseOut } );
            expect( wrapper.prop( 'onMouseLeave' ) ).toEqual( onMouseOut );
        } );
    } );
} );
