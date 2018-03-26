/* eslint-env node, mocha */
/* eslint no-console: 0 */
/* eslint-disable no-magic-numbers, no-multi-str, no-unused-expressions */

import React          from 'react';
import { mount }      from 'enzyme';

import { InputField } from '../index';


describe.only( 'InputField', () =>
{
    let wrapper;
    let instance;

    beforeEach( () =>
    {
        wrapper  = mount( <InputField /> );
        instance = wrapper.instance();
    } );

    describe( 'render()', () =>
    {
        it( 'should contain exactly one InputField', () =>
        {
            expect( wrapper ).to.have.length( 1 );
        } );
    } );

    describe( 'props', () =>
    {
        let props;

        beforeEach( () =>
        {
            props = instance.props;
        } );

        describe( 'defaultValue', () =>
        {
            it( 'should be undefined by default', () =>
            {
                expect( props.defaultValue ).to.be.undefined;
            } );

            it( 'should be passed to the InputField', () =>
            {
                wrapper.setProps( { defaultValue: 'yes!' } );

                expect( wrapper.find( InputField ).prop( 'defaultValue' ) ).to
                    .equal( 'yes!' );
            } );
        } );

        describe( 'element', () =>
        {
            it( 'should be "input" by default', () =>
            {
                expect( props.element ).to.equal( 'input' );
            } );

            it( 'should be passed to the InputField', () =>
            {
                wrapper.setProps( { element: 'textarea' } );

                expect( wrapper.prop( 'element' ) ).to
                    .equal( 'textarea' );
            } );
        } );

        describe( 'forceHover', () =>
        {
            it( 'should be false by default', () =>
            {
                expect( props.forceHover ).to.be.false;
            } );

            it( 'should be passed to the InputField', () =>
            {
                wrapper.setProps( { forceHover: true } );

                expect( wrapper.find( InputField ).prop( 'forceHover' ) ).to.be
                    .true;
            } );
        } );

        describe( 'hasError', () =>
        {
            it( 'should be false by default', () =>
            {
                expect( props.hasError ).to.be.false;
            } );

            it( 'should be passed to the InputField', () =>
            {
                wrapper.setProps( { hasError: true } );

                expect( wrapper.find( InputField ).prop( 'hasError' ) ).to.be
                    .true;
            } );
        } );

        describe( 'id', () =>
        {
            it( 'should be defined', () =>
            {
                expect( props.id ).to.be.defined;
            } );

            it( 'should be passed to the InputField', () =>
            {
                wrapper.setProps( { id: 'yes!' } );

                expect( wrapper.find( InputField ).prop( 'id' ) ).to
                    .equal( 'yes!' );
            } );
        } );

        describe( 'isDisabled', () =>
        {
            it( 'should be false by default', () =>
            {
                expect( props.isDisabled ).to.be.false;
            } );

            it( 'should be passed to the InputField', () =>
            {
                wrapper.setProps( { isDisabled: true } );

                expect( wrapper.find( InputField ).prop( 'isDisabled' ) ).to.be
                    .true;
            } );
        } );

        describe( 'isReadOnly', () =>
        {
            it( 'should be false by default', () =>
            {
                expect( props.isReadOnly ).to.be.false;
            } );

            it( 'should be passed to the InputField', () =>
            {
                wrapper.setProps( { isReadOnly: true } );

                expect( wrapper.prop( 'isReadOnly' ) ).to.be
                    .true;
            } );
        } );

        describe( 'name', () =>
        {
            it( 'should be undefined by default', () =>
            {
                expect( props.name ).to.be.undefined;
            } );

            it( 'should be passed to the InputField', () =>
            {
                wrapper.setProps( { name: 'yes!' } );

                expect( wrapper.find( InputField ).prop( 'name' ) ).to
                    .equal( 'yes!' );
            } );
        } );

        describe( 'onBlur', () =>
        {
            it( 'should be undefined by default', () =>
            {
                expect( props.onBlur ).to.be.undefined;
            } );
        } );

        describe( 'onChange', () =>
        {
            it( 'should be undefined by default', () =>
            {
                expect( props.onChange ).to.be.undefined;
            } );

            it( 'should be passed to the InputField', () =>
            {
                const onChange = () => undefined;

                wrapper.setProps( { onChange } );

                expect( wrapper.find( InputField ).prop( 'onChange' ) ).to
                    .equal( onChange );
            } );
        } );

        describe( 'onFocus', () =>
        {
            it( 'should be undefined by default', () =>
            {
                expect( props.onFocus ).to.be.undefined;
            } );
        } );

        describe( 'onKeyPress', () =>
        {
            it( 'should be undefined by default', () =>
            {
                expect( props.onKeyPress ).to.be.undefined;
            } );

            it( 'should be passed to the InputField', () =>
            {
                const onKeyPress = () => undefined;

                wrapper.setProps( { onKeyPress } );

                expect( wrapper.find( InputField ).prop( 'onKeyPress' ) ).to
                    .equal( onKeyPress );
            } );
        } );

        describe( 'onMouseOut', () =>
        {
            it( 'should be undefined by default', () =>
            {
                expect( props.onMouseOut ).to.be.undefined;
            } );

            it( 'should be passed to the InputField', () =>
            {
                const onMouseOut = () => undefined;

                wrapper.setProps( { onMouseOut } );

                expect( wrapper.find( InputField ).prop( 'onMouseOut' ) ).to
                    .equal( onMouseOut );
            } );
        } );

        describe( 'onMouseOver', () =>
        {
            it( 'should be undefined by default', () =>
            {
                expect( props.onMouseOver ).to.be.undefined;
            } );

            it( 'should be passed to the InputField', () =>
            {
                const onMouseOver = () => undefined;

                wrapper.setProps( { onMouseOver } );

                expect( wrapper.find( InputField ).prop( 'onMouseOver' ) ).to
                    .equal( onMouseOver );
            } );
        } );

        describe( 'placeholder', () =>
        {
            it( 'should be undefined by default', () =>
            {
                expect( props.placeholder ).to.be.undefined;
            } );

            it( 'should be passed to the InputField', () =>
            {
                wrapper.setProps( { placeholder: 'yes!' } );

                expect( wrapper.find( InputField ).prop( 'placeholder' ) ).to
                    .equal( 'yes!' );
            } );
        } );

        describe( 'textAlign', () =>
        {
            it( 'should be "left" by default', () =>
            {
                expect( props.textAlign ).to.equal( 'left' );
            } );

            it( 'should be passed to the InputField', () =>
            {
                wrapper.setProps( { textAlign: 'right' } );

                expect( wrapper.find( InputField ).prop( 'textAlign' ) ).to
                    .equal( 'right' );
            } );
        } );

        describe( 'type', () =>
        {
            it( 'should be "text" by default', () =>
            {
                expect( props.type ).to.equal( 'text' );
            } );

            it( 'should be passed to the InputField', () =>
            {
                wrapper.setProps( { type: 'number' } );

                expect( wrapper.find( InputField ).prop( 'type' ) ).to
                    .equal( 'number' );
            } );
        } );

        describe( 'value', () =>
        {
            it( 'should be undefined by default', () =>
            {
                expect( props.value ).to.be.undefined;
            } );

            it( 'should be passed to the InputField', () =>
            {
                wrapper.setProps( { value: 'yes!' } );

                expect( wrapper.find( InputField ).prop( 'value' ) ).to
                    .equal( 'yes!' );
            } );
        } );
    } );
} );
