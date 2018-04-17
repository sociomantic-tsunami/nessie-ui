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
        it( 'should be undefined by "default"', () =>
        {
            expect( instance.props.id ).to.be.undefined;
        } );
    } );
    describe( 'role', () =>
    {
        it( 'should be "primary" by "default"', () =>
        {
            expect( instance.props.role ).to.equal( 'primary' );
        } );
        it( 'should be "secondary" as well when it passed to', () =>
        {
            wrapper.setProps( { role: 'secondary' } );
            expect( wrapper.prop( 'role' ) ).to.equal( 'secondary' );
        } );
    } );
    describe( 'id', () =>
    {
        it( 'should be undefined by "default"', () =>
        {
            expect( instance.props.id ).to.be.undefined;
        } );
    } );
    describe( 'icon', () =>
    {
        describe( 'iconType', () =>
        {
            it( 'should contain an Icon when iconType is not "none"', () =>
            {
                wrapper.setProps( { iconType: 'add' } );
                expect( wrapper.find( Icon ) ).to.be.have.length( 1 );
            } );
        } );
        describe( 'iconPosition', () =>
        {
            it( 'should be "left" by default', () =>
            {
                expect( instance.props.iconPosition ).to.equal( 'left' );
            } );
        } );


        describe( 'iconSize', () =>
        {
            it( 'should be "M" by default', () =>
            {
                expect( instance.props.iconSize ).to.equal( 'M' );
            } );

            it( 'should be passed to the Icon as "size"', () =>
            {
                wrapper.setProps( { iconType: 'add', iconSize: 'S' } );
                expect( wrapper.find( Icon ).prop( 'size' ) ).to.equal( 'S' );
            } );
        } );
    } );
    describe( 'isDisabled', () =>
    {
        it( 'should be false by default', () =>
        {
            expect( instance.props.isDisabled ).to.be.false;
        } );
        it( 'should be passed to the button as "disabled" when true', () =>
        {
            wrapper.setProps( { isDisabled: true } );
            expect( wrapper.prop( 'disabled' ) ).to.be.true;
        } );
    } );

    describe( 'isReadOnly', () =>
    {
        it( 'should be false by default', () =>
        {
            expect( instance.props.isReadOnly ).to.be.false;
        } );
        it( 'should be passed to the button as "readOnly" when true', () =>
        {
            wrapper.setProps( { isReadOnly: true } );
            expect( wrapper.prop( 'readOnly' ) ).to.be.true;
        } );
    } );


    describe( 'onClick', () =>
    {
        it( 'should be undefined by default', () =>
        {
            expect( instance.props.onClick ).to.be.undefined;
        } );

        it( 'should be passed to the button element', () =>
        {
            const onClick = () =>
            {};
            wrapper.setProps( { onClick } );
            expect( wrapper.prop( 'onClick' ) ).to.be.equal( onClick );
        } );
    } );

    describe( 'onFocus', () =>
    {
        it( 'should be undefined by default', () =>
        {
            expect( instance.props.onFocus ).to.be.undefined;
        } );
        it( 'should be passed to the button element', () =>
        {
            const onFocus = () =>
            {};
            wrapper.setProps( { onFocus } );
            expect( wrapper.prop( 'onFocus' ) ).to.be.equal( onFocus );
        } );
    } );

    describe( 'onMouseOver', () =>
    {
        it( 'should be undefined by default', () =>
        {
            expect( instance.props.onMouseOver ).to.be.undefined;
        } );
        it( 'should be passed to the button element', () =>
        {
            const onMouseOver = () =>
            {};
            wrapper.setProps( { onMouseOver } );
            expect( wrapper.prop( 'onMouseOver' ) ).to.be.equal( onMouseOver );
        } );
    } );

    describe( 'onMouseOut', () =>
    {
        it( 'should be undefined by default', () =>
        {
            expect( instance.props.onMouseOut ).to.be.undefined;
        } );
        it( 'should be passed to the button element', () =>
        {
            const onMouseOut = () =>
            {};
            wrapper.setProps( { onMouseOut } );
            expect( wrapper.prop( 'onMouseOut' ) ).to.be.equal( onMouseOut );
        } );
    } );
} );

describe( 'ToggleButtonDriver', () =>
{
    let wrapper;
    beforeEach( () =>
    {
        wrapper = mount( <ToggleButton /> );
    } );
    describe( 'onClick', () =>
    {
        it( 'should call onClick once', () =>
        {
            const onClick = sinon.spy();
            wrapper.setProps( { onClick } );

            wrapper.driver().toggle();

            expect( onClick.calledOnce ).to.be.true;
        } );

        it( 'should toggle the value of checked', () =>
        {
            const onClick = sinon.spy();
            wrapper.setProps( { onClick, checked: true } );

            wrapper.driver().toggle();

            expect( wrapper.props().isChecked ).to.be.false;
        } );
    } );
} );
