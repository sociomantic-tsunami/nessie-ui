/* eslint-env node, mocha */
/* global expect */
/* eslint no-console: 0*/
/* eslint-disable no-magic-numbers */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-return-assign */

import React                from 'react';
import { mount, shallow }   from 'enzyme';

import Switch               from './index';

describe( 'Switch', () =>
{
    let wrapper;
    let instance;

    beforeEach( () =>
    {
        wrapper  = shallow( <Switch /> );
        instance = wrapper.instance();
    } );

    it( 'should pass isDisabled to <input> as “disabled”', () =>
    {
        wrapper.setProps( { isDisabled: true } );
        const input = wrapper.find( `.${instance.props.cssMap.input}` );

        expect( input.prop( 'disabled' ) ).to.be.true;
    } );
} );

describe( 'SwitchDriver', () =>
{
    let wrapper;

    beforeEach( () =>
    {
        wrapper = mount( <Switch /> );
    } );

    describe( 'toggle()', () =>
    {
        it( 'should call onChange once', () =>
        {
            const onChange = sinon.spy();
            wrapper.setProps( { onChange } );

            wrapper.driver().toggle();

            expect( onChange.calledOnce ).to.be.true;
        } );

        it( 'should toggle target.checked', () =>
        {
            let targetChecked;
            const onChange = sinon.stub().callsFake( e =>
                targetChecked = e.target.checked
            );
            wrapper.setProps( { isChecked: true, onChange } );

            wrapper.driver().toggle();

            expect( targetChecked ).to.be.false;
        } );
    } );

    describe( 'mouseOut', () =>
    {
        it( 'should trigger onMouseOut callback function', () =>
        {
            const onMouseOut = sinon.spy();

            wrapper.setProps( { onMouseOut } );

            wrapper.driver().mouseOut();

            expect( onMouseOut.calledOnce ).to.be.true;
        } );
    } );

    describe( 'mouseOver', () =>
    {
        it( 'should trigger onMouseOver callback function', () =>
        {
            const onMouseOver = sinon.spy();

            wrapper.setProps( { onMouseOver } );

            wrapper.driver().mouseOver();

            expect( onMouseOver.calledOnce ).to.be.true;
        } );
    } );

    describe( 'blur', () =>
    {
        it( 'should trigger onBlur callback function', () =>
        {
            const onBlur = sinon.spy();

            wrapper.setProps( { onBlur } );

            wrapper.driver().blur();

            expect( onBlur.calledOnce ).to.be.true;
        } );
    } );

    describe( 'focus', () =>
    {
        it( 'should trigger onFocus callback function', () =>
        {
            const onFocus = sinon.spy();

            wrapper.setProps( { onFocus } );

            wrapper.driver().focus();

            expect( onFocus.calledOnce ).to.be.true;
        } );
    } );
} );
