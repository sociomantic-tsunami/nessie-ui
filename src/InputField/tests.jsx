/* global test */

import React      from 'react';
import { mount }  from 'enzyme';

import InputField from './index';

const { cssMap } = InputField.defaultProps;

describe( 'InputField', () =>
{
    let wrapper;

    beforeEach( () =>
    {
        wrapper = mount( <InputField /> );
    } );

    describe( 'render()', () =>
    {
        test( 'should contain exactly one element', () =>
        {
            expect( wrapper ).toHaveLength( 1 );
        } );
    } );

    describe( 'props', () =>
    {
        describe( 'element', () =>
        {
            test( 'should be "input" by default', () =>
            {
                expect( InputField.defaultProps.element ).toBe( 'input' );
            } );

            test( 'should be passed to the input element', () =>
            {
                wrapper.setProps( { element: 'textarea' } );


                expect( wrapper.find( `.${cssMap.default}` ).type() )
                    .toBe( 'textarea' );
            } );
        } );

        describe( 'forceHover', () =>
        {
            test( 'should be false by default', () =>
            {
                expect( InputField.defaultProps.forceHover ).toBeFalsy();
            } );
        } );

        describe( 'hasError', () =>
        {
            test( 'should be false by default', () =>
            {
                expect( InputField.defaultProps.hasError ).toBeFalsy();
            } );
        } );

        describe( 'id', () =>
        {
            test( 'should be passed to the input element', () =>
            {
                wrapper.setProps( { id: 'yes!' } );

                expect( wrapper.find( `.${cssMap.default}` ).prop( 'id' ) )
                    .toBe( 'yes!' );
            } );
        } );

        describe( 'isDisabled', () =>
        {
            test( 'should be false by default', () =>
            {
                expect( InputField.defaultProps.isDisabled ).toBe( false );
            } );

            test( 'should be passed to the input element as disabled', () =>
            {
                wrapper.setProps( { isDisabled: true } );

                expect( wrapper.find( `.${cssMap.default}` )
                    .prop( 'disabled' ) ).toBe( true );
            } );
        } );

        describe( 'isReadOnly', () =>
        {
            test( 'should be false by default', () =>
            {
                expect( InputField.defaultProps.isReadOnly ).toBe( false );
            } );

            test( 'should be passed to the input element as readOnly', () =>
            {
                wrapper.setProps( { isReadOnly: true } );

                expect( wrapper.find( `.${cssMap.default}` )
                    .prop( 'readOnly' ) ).toBe( true );
            } );
        } );

        describe( 'name', () =>
        {
            test( 'should be undefined by default', () =>
            {
                expect( InputField.defaultProps.name ).toBeUndefined();
            } );

            test( 'should be passed to the input element', () =>
            {
                wrapper.setProps( { name: 'yes!' } );

                expect( wrapper.find( `.${cssMap.default}` )
                    .prop( 'name' ) ).toBe( 'yes!' );
            } );
        } );

        describe( 'onBlur', () =>
        {
            test( 'should be undefined by default', () =>
            {
                expect( InputField.defaultProps.onBlur ).toBeUndefined();
            } );
            test( 'should be passed to the input element', () =>
            {
                const onBlur = () => undefined;

                wrapper.setProps( { onBlur } );

                expect( wrapper.find( `.${cssMap.default}` )
                    .prop( 'onBlur' ) ).toBe( onBlur );
            } );
        } );

        describe( 'onChange', () =>
        {
            test( 'should be undefined by default', () =>
            {
                expect( InputField.defaultProps.onChange ).toBeUndefined();
            } );

            test( 'should be passed to the input element', () =>
            {
                const onChange = () => undefined;

                wrapper.setProps( { onChange } );

                expect( wrapper.find( `.${cssMap.default}` )
                    .prop( 'onChange' ) ).toBe( onChange );
            } );
        } );

        describe( 'onFocus', () =>
        {
            test( 'should be undefined by default', () =>
            {
                expect( InputField.defaultProps.onFocus ).toBeUndefined();
            } );
            test( 'should be passed to the input element', () =>
            {
                const onFocus = () => undefined;

                wrapper.setProps( { onFocus } );

                expect( wrapper.find( `.${cssMap.default}` )
                    .prop( 'onFocus' ) ).toBe( onFocus );
            } );
        } );

        describe( 'onKeyPress', () =>
        {
            test( 'should be undefined by default', () =>
            {
                expect( InputField.defaultProps.onKeyPress ).toBeUndefined();
            } );

            test( 'should be passed to the input element', () =>
            {
                const onKeyPress = () => undefined;

                wrapper.setProps( { onKeyPress } );

                expect( wrapper.find( `.${cssMap.default}` )
                    .prop( 'onKeyPress' ) ).toBe( onKeyPress );
            } );
        } );

        describe( 'onMouseOut', () =>
        {
            test( 'should be undefined by default', () =>
            {
                expect( InputField.defaultProps.onMouseOut ).toBeUndefined();
            } );

            test( 'should be passed to the input element as onMouseLeave', () =>
            {
                const onMouseOut = () => undefined;

                wrapper.setProps( { onMouseOut } );

                expect( wrapper.find( `.${cssMap.default}` )
                    .prop( 'onMouseLeave' ) ).toBe( onMouseOut );
            } );
        } );

        describe( 'onMouseOver', () =>
        {
            test( 'should be undefined by default', () =>
            {
                expect( InputField.defaultProps.onMouseOver ).toBeUndefined();
            } );

            test( 'should be passed to the input element as onMouseEnter', () =>
            {
                const onMouseOver = () => undefined;

                wrapper.setProps( { onMouseOver } );

                expect( wrapper.find( `.${cssMap.default}` )
                    .prop( 'onMouseEnter' ) ).toBe( onMouseOver );
            } );
        } );

        describe( 'placeholder', () =>
        {
            test( 'should be undefined by default', () =>
            {
                expect( InputField.defaultProps.placeholder ).toBeUndefined();
            } );

            test( 'should be passed to the input element', () =>
            {
                wrapper.setProps( { placeholder: 'yes!' } );

                expect( wrapper.find( `.${cssMap.default}` )
                    .prop( 'placeholder' ) ).toBe( 'yes!' );
            } );
        } );

        describe( 'textAlign', () =>
        {
            test( 'should be "left" by default', () =>
            {
                expect( InputField.defaultProps.textAlign ).toBe( 'left' );
            } );
        } );

        describe( 'type', () =>
        {
            test( 'should be "text" by default', () =>
            {
                expect( InputField.defaultProps.type ).toBe( 'text' );
            } );

            test( 'should be passed to the input element', () =>
            {
                wrapper.setProps( { type: 'number' } );

                expect( wrapper.find( `.${cssMap.default}` ).prop( 'type' ) )
                    .toBe( 'number' );
            } );
        } );

        describe( 'value', () =>
        {
            test( 'should be empty string by default', () =>
            {
                expect( InputField.defaultProps.value ).toBe( '' );
            } );

            test( 'should be passed to the input element', () =>
            {
                wrapper.setProps( { value: 'yes!' } );

                expect( wrapper.find( `.${cssMap.default}` ).prop( 'value' ) )
                    .toBe( 'yes!' );
            } );
        } );
    } );
} );
