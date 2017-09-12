/* eslint-env node, mocha */
/* global expect Event */
/* eslint no-console: 0 */
/* eslint-disable no-magic-numbers, no-multi-str, no-unused-expressions */

import React                               from 'react';
import { ReactWrapper, mount, shallow }    from 'enzyme';

import { IconButton, InputField, Tooltip } from '../index';
import Css                                 from '../hoc/Css';
import NessieComponent                     from '../proto/Component';
import InputContainer                      from '../proto/InputContainer';

import TextInputWithIcon                   from './index';


describe( 'TextInputWithIcon', () =>
{
    let wrapper;
    let instance;

    beforeEach( () =>
    {
        wrapper  = shallow( <TextInputWithIcon /> );
        instance = wrapper.instance();
    } );

    describe( 'constructor( props )', () =>
    {
        it( 'should extend NessieComponent', () =>
        {
            const prototype = Object.getPrototypeOf( instance.constructor );

            expect( prototype === NessieComponent ).to.be.true;
        } );
    } );

    describe( 'handleFocus( e )', () =>
    {
        it( 'should call onFocus with e', () =>
        {
            const onFocus = sinon.spy();
            const e = new Event( { } );

            wrapper.setProps( { onFocus } );
            instance.handleFocus( e );

            expect( onFocus.calledWith( e ) ).to.be.true;
        } );

        it( 'should call onFocus exactly once', () =>
        {
            const onFocus = sinon.spy();

            wrapper.setProps( { onFocus } );
            instance.handleFocus( new Event( {} ) );

            expect( onFocus.calledOnce ).to.be.true;
        } );

        it( 'should not call onFocus when e.relatedTarget is the <input>', () =>
        {
            const onFocus = sinon.spy();
            const input   = <input />;

            const e = new Event( {} );
            Object.defineProperty( e, 'relatedTarget', { value: input } );

            wrapper.setProps( { onFocus } );
            instance.input = input;

            instance.handleFocus( e );

            expect( onFocus.called ).to.be.false;
        } );

        it( 'should not call onFocus when e.relatedTarget is the <button>',
        () =>
        {
            const onFocus = sinon.spy();
            const button  = <button />;

            const e = new Event( {} );
            Object.defineProperty( e, 'relatedTarget', { value: button } );

            wrapper.setProps( { onFocus } );
            instance.button = button;

            instance.handleFocus( e );

            expect( onFocus.called ).to.be.false;
        } );

        it( 'should call e.stopPropagation exactly once when e.relatedTarget \
is the <input>', () =>
        {
            const input = <input />;

            const e = new Event( {} );
            Object.defineProperty( e, 'relatedTarget', { value: input } );
            const stopPropagation = sinon.spy( e, 'stopPropagation' );

            instance.input = input;

            instance.handleFocus( e );

            expect( stopPropagation.calledOnce ).to.be.true;
        } );

        it( 'should call e.stopPropagation exactly once when e.relatedTarget \
is the <button>', () =>
        {
            const button = <button />;

            const e = new Event( {} );
            Object.defineProperty( e, 'relatedTarget', { value: button } );
            const stopPropagation = sinon.spy( e, 'stopPropagation' );

            instance.button = button;

            instance.handleFocus( e );

            expect( stopPropagation.calledOnce ).to.be.true;
        } );

        it( 'should not call e.stopPropagation when e.relatedTarget is not the \
<input> or the <button>', () =>
        {
            const e = new Event( {} );
            const stopPropagation = sinon.spy( e, 'stopPropagation' );

            instance.handleFocus( e );

            expect( stopPropagation.called ).to.be.false;
        } );
    } );

    describe( 'handleBlur( e )', () =>
    {
        it( 'should call onBlur with e', () =>
        {
            const onBlur = sinon.spy();
            const e = new Event( { } );

            wrapper.setProps( { onBlur } );

            instance.handleBlur( e );

            expect( onBlur.calledWith( e ) ).to.be.true;
        } );

        it( 'should call onBlur exactly once', () =>
        {
            const onBlur = sinon.spy();

            wrapper.setProps( { onBlur } );

            instance.handleBlur( new Event( {} ) );

            expect( onBlur.calledOnce ).to.be.true;
        } );

        it( 'should not call onBlur when e.relatedTarget is the <input>', () =>
        {
            const onBlur = sinon.spy();
            const input   = <input />;

            const e = new Event( {} );
            Object.defineProperty( e, 'relatedTarget', { value: input } );

            wrapper.setProps( { onBlur } );
            instance.input = input;

            instance.handleBlur( e );

            expect( onBlur.called ).to.be.false;
        } );

        it( 'should not call onBlur when e.relatedTarget is the <button>', () =>
        {
            const onBlur = sinon.spy();
            const button  = <button />;

            const e = new Event( {} );
            Object.defineProperty( e, 'relatedTarget', { value: button } );

            wrapper.setProps( { onBlur } );
            instance.button = button;

            instance.handleBlur( e );

            expect( onBlur.called ).to.be.false;
        } );

        it( 'should call e.stopPropagation exactly once when e.relatedTarget \
is the <input>', () =>
        {
            const input = <input />;

            const e = new Event( {} );
            Object.defineProperty( e, 'relatedTarget', { value: input } );
            const stopPropagation = sinon.spy( e, 'stopPropagation' );

            instance.input = input;

            instance.handleBlur( e );

            expect( stopPropagation.calledOnce ).to.be.true;
        } );

        it( 'should call e.stopPropagation exactly once when e.relatedTarget \
is the <button>', () =>
        {
            const button = <button />;

            const e = new Event( {} );
            Object.defineProperty( e, 'relatedTarget', { value: button } );
            const stopPropagation = sinon.spy( e, 'stopPropagation' );

            instance.button = button;

            instance.handleBlur( e );

            expect( stopPropagation.calledOnce ).to.be.true;
        } );

        it( 'should not call e.stopPropagation when e.relatedTarget is not the \
<input> or the <button>', () =>
        {
            const e = new Event( {} );
            const stopPropagation = sinon.spy( e, 'stopPropagation' );

            instance.handleBlur( e );

            expect( stopPropagation.called ).to.be.false;
        } );
    } );

    describe( 'handleFocusIcon( e )', () =>
    {
        it( 'should call setState with { iconIsFocused: true } }', () =>
        {
            const setState = sinon.spy( instance, 'setState' );
            instance.handleFocusIcon( new Event( {} ) );

            expect( setState.calledWith( sinon.match(
                { iconIsFocused: true } ) ) ).to.be.true;

            setState.restore();
        } );

        it( 'should call setState exactly once', () =>
        {
            const setState = sinon.spy( instance, 'setState' );
            instance.handleFocusIcon( new Event( {} ) );

            expect( setState.calledOnce ).to.be.true;

            setState.restore();
        } );

        it( 'should call onFocusIcon with e', () =>
        {
            const e = new Event( {} );
            const onFocusIcon = sinon.spy();

            wrapper.setProps( { onFocusIcon } );

            instance.handleFocusIcon( e );

            expect( onFocusIcon.calledWith( e ) ).to.be.true;
        } );

        it( 'should call onFocusIcon exactly once', () =>
        {
            const onFocusIcon = sinon.spy();

            wrapper.setProps( { onFocusIcon } );

            instance.handleFocusIcon( new Event( {} ) );

            expect( onFocusIcon.calledOnce ).to.be.true;
        } );

        it( 'should call this.handleFocus with e', () =>
        {
            const e = new Event( {} );
            const setState = sinon.spy( instance, 'handleFocus' );

            instance.handleFocusIcon( e );

            expect( setState.calledWith( e ) ).to.be.true;

            setState.restore();
        } );

        it( 'should call this.handleFocus exactly once', () =>
        {
            const setState = sinon.spy( instance, 'handleFocus' );
            instance.handleFocusIcon( new Event( {} ) );

            expect( setState.calledOnce ).to.be.true;

            setState.restore();
        } );
    } );

    describe( 'handleBlurIcon( e )', () =>
    {
        it( 'should call setState with { iconIsFocused: false } }', () =>
        {
            const setState = sinon.spy( instance, 'setState' );
            instance.handleBlurIcon( new Event( {} ) );

            expect( setState.calledWith( sinon.match(
                { iconIsFocused: false } ) ) ).to.be.true;

            setState.restore();
        } );

        it( 'should call setState exactly once', () =>
        {
            const setState = sinon.spy( instance, 'setState' );
            instance.handleBlurIcon( new Event( {} ) );

            expect( setState.calledOnce ).to.be.true;

            setState.restore();
        } );

        it( 'should call onBlurIcon with e', () =>
        {
            const e = new Event( {} );
            const onBlurIcon = sinon.spy();

            wrapper.setProps( { onBlurIcon } );

            instance.handleBlurIcon( e );

            expect( onBlurIcon.calledWith( e ) ).to.be.true;
        } );

        it( 'should call onBlurIcon exactly once', () =>
        {
            const onBlurIcon = sinon.spy();

            wrapper.setProps( { onBlurIcon } );

            instance.handleBlurIcon( new Event( {} ) );

            expect( onBlurIcon.calledOnce ).to.be.true;
        } );

        it( 'should call this.handleBlur with e', () =>
        {
            const e = new Event( {} );
            const setState = sinon.spy( instance, 'handleBlur' );

            instance.handleBlurIcon( e );

            expect( setState.calledWith( e ) ).to.be.true;

            setState.restore();
        } );

        it( 'should call this.handleBlur exactly once', () =>
        {
            const setState = sinon.spy( instance, 'handleBlur' );
            instance.handleBlurIcon( new Event( {} ) );

            expect( setState.calledOnce ).to.be.true;

            setState.restore();
        } );
    } );

    describe( 'handleMouseOverIcon( e )', () =>
    {
        it( 'should call setState with { iconIsHovered: true } }', () =>
        {
            const setState = sinon.spy( instance, 'setState' );
            instance.handleMouseOverIcon( new Event( {} ) );

            expect( setState.calledWith( sinon.match(
                { iconIsHovered: true } ) ) ).to.be.true;

            setState.restore();
        } );

        it( 'should call setState exactly once', () =>
        {
            const setState = sinon.spy( instance, 'setState' );
            instance.handleMouseOverIcon( new Event( {} ) );

            expect( setState.calledOnce ).to.be.true;

            setState.restore();
        } );

        it( 'should call onMouseOverIcon with e', () =>
        {
            const onMouseOverIcon = sinon.spy();
            const e = new Event( {} );

            wrapper.setProps( { onMouseOverIcon } );

            instance.handleMouseOverIcon( e );

            expect( onMouseOverIcon.calledWith( e ) ).to.be.true;
        } );

        it( 'should call onMouseOverIcon exactly once', () =>
        {
            const onMouseOverIcon = sinon.spy();

            wrapper.setProps( { onMouseOverIcon } );

            instance.handleMouseOverIcon( new Event( {} ) );

            expect( onMouseOverIcon.calledOnce ).to.be.true;
        } );

        it( 'should call onMouseOver with e', () =>
        {
            const onMouseOver = sinon.spy();
            const e = new Event( {} );

            wrapper.setProps( { onMouseOver } );

            instance.handleMouseOverIcon( e );

            expect( onMouseOver.calledWith( e ) ).to.be.true;
        } );

        it( 'should call onMouseOver exactly once', () =>
        {
            const onMouseOver = sinon.spy();

            wrapper.setProps( { onMouseOver } );

            instance.handleMouseOverIcon( new Event( {} ) );

            expect( onMouseOver.calledOnce ).to.be.true;
        } );
    } );

    describe( 'handleMouseOutIcon( e )', () =>
    {
        it( 'should call setState with { iconIsHovered: false } }', () =>
        {
            const setState = sinon.spy( instance, 'setState' );
            instance.handleMouseOutIcon( new Event( {} ) );

            expect( setState.calledWith( sinon.match(
                { iconIsHovered: false } ) ) ).to.be.true;

            setState.restore();
        } );

        it( 'should call setState exactly once', () =>
        {
            const setState = sinon.spy( instance, 'setState' );
            instance.handleMouseOutIcon( new Event( {} ) );

            expect( setState.calledOnce ).to.be.true;

            setState.restore();
        } );

        it( 'should call onMouseOutIcon with e', () =>
        {
            const onMouseOutIcon = sinon.spy();
            const e = new Event( {} );

            wrapper.setProps( { onMouseOutIcon } );

            instance.handleMouseOutIcon( e );

            expect( onMouseOutIcon.calledWith( e ) ).to.be.true;
        } );

        it( 'should call onMouseOutIcon exactly once', () =>
        {
            const onMouseOutIcon = sinon.spy();
            wrapper.setProps( { onMouseOutIcon } );

            instance.handleMouseOutIcon( new Event( {} ) );

            expect( onMouseOutIcon.calledOnce ).to.be.true;
        } );

        it( 'should call onMouseOut with e', () =>
        {
            const onMouseOut = sinon.spy();
            const e = new Event( {} );

            wrapper.setProps( { onMouseOut } );

            instance.handleMouseOutIcon( e );

            expect( onMouseOut.calledWith( e ) ).to.be.true;
        } );

        it( 'should call onMouseOut exactly once', () =>
        {
            const onMouseOut = sinon.spy();
            wrapper.setProps( { onMouseOut } );

            instance.handleMouseOutIcon( new Event( {} ) );

            expect( onMouseOut.calledOnce ).to.be.true;
        } );
    } );

    describe( 'render()', () =>
    {
        beforeEach( () =>
        {
            wrapper.setProps( { iconType: 'add' } );
        } );

        it( 'should implement the Css injector component', () =>
        {
            expect( wrapper.find( Css ) ).to.have.length( 1 );
        } );

        it( 'should contain exactly one InputContainer', () =>
        {
            expect( wrapper.find( InputContainer ) ).to.have.length( 1 );
        } );

        it( 'should contain exactly one InputField', () =>
        {
            expect( wrapper.find( InputField ) ).to.have.length( 1 );
        } );

        it( 'should contain exactly one IconButton', () =>
        {
            expect( wrapper.find( IconButton ) ).to.have.length( 1 );
        } );

        it( 'should contain exactly one Tooltip', () =>
        {
            expect( wrapper.find( Tooltip ) ).to.have.length( 1 );
        } );
    } );

    describe( 'props', () =>
    {
        let props;

        beforeEach( () =>
        {
            props = instance.props;
        } );

        describe( 'label', () =>
        {
            it( 'should be undefined by default', () =>
            {
                expect( props.label ).to.be.undefined;
            } );

            it( 'should be passed to the InputContainer', () =>
            {
                wrapper.setProps( { label: 'yes!' } );

                expect( wrapper.find( InputContainer ).prop( 'label' ) ).to
                    .equal( 'yes!' );
            } );
        } );

        describe( 'labelPosition', () =>
        {
            it( 'should be "top" by default', () =>
            {
                expect( props.labelPosition ).to.equal( 'top' );
            } );

            it( 'should be passed to the InputContainer', () =>
            {
                wrapper.setProps( { labelPosition: 'left' } );

                expect( wrapper.find( InputContainer )
                    .prop( 'labelPosition' ) ).to.equal( 'left' );
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

        describe( 'iconType', () =>
        {
            it( 'should be "none" by default', () =>
            {
                expect( props.iconType ).to.equal( 'none' );
            } );

            it( 'should remove the IconButton when value is "none"', () =>
            {
                expect( wrapper.find( IconButton ) ).to.have.length( 0 );
            } );

            it( 'should remove the Tooltip when value is "none"', () =>
            {
                expect( wrapper.find( Tooltip ) ).to.have.length( 0 );
            } );

            it( 'should be passed to the IconButton', () =>
            {
                wrapper.setProps( { iconType: 'add' } );

                expect( wrapper.find( IconButton ).prop( 'iconType' ) ).to
                    .equal( 'add' );
            } );
        } );

        describe( 'iconPosition', () =>
        {
            beforeEach( () =>
            {
                wrapper.setProps( { iconType: 'add' } );
            } );

            it( 'should be "right" by default', () =>
            {
                expect( props.iconPosition ).to.equal( 'right' );
            } );

            it( 'should pass textAlign "left" to Inputfield when value is \
"right"', () =>
            {
                wrapper.setProps( { iconPosition: 'right' } );

                expect( wrapper.find( InputField ).prop( 'textAlign' ) ).to
                    .equal( 'left' );
            } );

            it( 'should pass textAlign "right" to Inputfield when value is \
"left"', () =>
            {
                wrapper.setProps( { iconPosition: 'left' } );

                expect( wrapper.find( InputField ).prop( 'textAlign' ) ).to
                    .equal( 'right' );
            } );

            it( 'should be passed to cssProps as position', () =>
            {
                wrapper.setProps( { iconPosition: 'left' } );

                expect( wrapper.find( Css ).first().prop( 'cssProps' )
                    .position ).to.equal( 'left' );
            } );
        } );

        describe( 'textAlign', () =>
        {
            it( 'should be "auto" by default', () =>
            {
                expect( props.textAlign ).to.equal( 'auto' );
            } );

            it( 'should be passed to the InputField', () =>
            {
                wrapper.setProps( { textAlign: 'right' } );

                expect( wrapper.find( InputField ).prop( 'textAlign' ) ).to
                    .equal( 'right' );
            } );
        } );

        describe( 'iconTooltipPosition', () =>
        {
            beforeEach( () =>
            {
                wrapper.setProps( { iconType: 'add' } );
            } );

            it( 'should be "top" by default', () =>
            {
                expect( props.iconTooltipPosition ).to.equal( 'top' );
            } );

            it( 'should be passed to the Tooltip as position', () =>
            {
                wrapper.setProps( { iconTooltipPosition: 'bottom' } );

                expect( wrapper.find( Tooltip ).prop( 'position' ) ).to
                    .equal( 'bottom' );
            } );
        } );

        describe( 'iconTooltipIsVisible', () =>
        {
            beforeEach( () =>
            {
                wrapper.setProps( { iconType: 'add' } );
            } );

            it( 'should be false by default', () =>
            {
                expect( props.iconTooltipIsVisible ).to.be.false;
            } );

            it( 'should be passed to the Tooltip as isVisible', () =>
            {
                wrapper.setProps( { iconTooltipIsVisible: true } );

                expect( wrapper.find( Tooltip ).prop( 'isVisible' ) ).to.be
                    .true;
            } );
        } );

        describe( 'iconTooltipMessage', () =>
        {
            beforeEach( () =>
            {
                wrapper.setProps( { iconType: 'add' } );
            } );

            it( 'should be undefined by default', () =>
            {
                expect( props.iconTooltipMessage ).to.be.undefined;
            } );

            it( 'should be passed to the Tooltip', () =>
            {
                wrapper.setProps( { iconTooltipMessage: 'yes!' } );

                expect( wrapper.find( Tooltip ).prop( 'message' ) ).to
                    .equal( 'yes!' );
            } );
        } );

        describe( 'isDisabled', () =>
        {
            it( 'should be false by default', () =>
            {
                expect( props.isDisabled ).to.be.false;
            } );

            it( 'should be passed to cssProps as disabled', () =>
            {
                wrapper.setProps( { isDisabled: true } );

                expect( wrapper.find( Css ).first().prop( 'cssProps' )
                    .disabled ).to.be.true;
            } );

            it( 'should be passed to the InputContainer', () =>
            {
                wrapper.setProps( { isDisabled: true } );

                expect( wrapper.find( InputContainer ).prop( 'isDisabled' ) )
                    .to.be.true;
            } );

            it( 'should be passed to the InputField', () =>
            {
                wrapper.setProps( { isDisabled: true } );

                expect( wrapper.find( InputField ).prop( 'isDisabled' ) ).to.be
                    .true;
            } );

            it( 'should be passed to the Tooltip', () =>
            {
                wrapper.setProps( {
                    iconType   : 'add',
                    isDisabled : true
                } );

                expect( wrapper.find( Tooltip ).prop( 'isDisabled' ) ).to.be
                    .true;
            } );

            it( 'should be passed to the IconButton', () =>
            {
                wrapper.setProps( {
                    iconType   : 'add',
                    isDisabled : true
                } );

                expect( wrapper.find( IconButton ).prop( 'isDisabled' ) ).to.be
                    .true;
            } );
        } );

        describe( 'iconButtonIsDisabled', () =>
        {
            beforeEach( () =>
            {
                wrapper.setProps( { iconType: 'add' } );
            } );

            it( 'should be false by default', () =>
            {
                expect( props.iconButtonIsDisabled ).to.be.false;
            } );

            it( 'should be passed to the IconButton as isDisabled', () =>
            {
                wrapper.setProps( { iconButtonIsDisabled: true } );

                expect( wrapper.find( IconButton ).prop( 'isDisabled' ) ).to.be
                    .true;
            } );
        } );

        describe( 'isReadOnly', () =>
        {
            it( 'should be false by default', () =>
            {
                expect( props.isReadOnly ).to.be.false;
            } );

            it( 'should be passed to the InputContainer', () =>
            {
                wrapper.setProps( { isReadOnly: true } );

                expect( wrapper.find( InputContainer ).prop( 'isReadOnly' ) )
                    .to.be.true;
            } );

            it( 'should be passed to the InputField', () =>
            {
                wrapper.setProps( { isReadOnly: true } );

                expect( wrapper.find( InputField ).prop( 'isReadOnly' ) ).to.be
                    .true;
            } );

            it( 'should be passed to the Tooltip', () =>
            {
                wrapper.setProps( {
                    iconType   : 'add',
                    isReadOnly : true
                } );

                expect( wrapper.find( Tooltip ).prop( 'isReadOnly' ) ).to.be
                    .true;
            } );

            it( 'should be passed to the IconButton', () =>
            {
                wrapper.setProps( {
                    iconType   : 'add',
                    isReadOnly : true
                } );

                expect( wrapper.find( IconButton ).prop( 'isReadOnly' ) ).to.be
                    .true;
            } );
        } );

        describe( 'hasError', () =>
        {
            it( 'should be false by default', () =>
            {
                expect( props.hasError ).to.be.false;
            } );

            it( 'should be passed to cssProps as error', () =>
            {
                wrapper.setProps( { hasError: true } );

                expect( wrapper.find( Css ).first().prop( 'cssProps' ).error )
                    .to.be.true;
            } );

            it( 'should be passed to the InputContainer', () =>
            {
                wrapper.setProps( { hasError: true } );

                expect( wrapper.find( InputContainer ).prop( 'hasError' ) ).to
                    .be.true;
            } );

            it( 'should be passed to the InputField', () =>
            {
                wrapper.setProps( { hasError: true } );

                expect( wrapper.find( InputField ).prop( 'hasError' ) ).to.be
                    .true;
            } );

            it( 'should be passed to the Tooltip', () =>
            {
                wrapper.setProps( {
                    iconType : 'add',
                    hasError : true
                } );

                expect( wrapper.find( Tooltip ).prop( 'hasError' ) ).to.be
                    .true;
            } );

            it( 'should be passed to the IconButton', () =>
            {
                wrapper.setProps( {
                    iconType : 'add',
                    hasError : true
                } );

                expect( wrapper.find( IconButton ).prop( 'hasError' ) ).to.be
                    .true;
            } );
        } );

        describe( 'errorMessage', () =>
        {
            it( 'should be undefined by default', () =>
            {
                expect( props.errorMessage ).to.be.undefined;
            } );

            it( 'should be passed to the InputContainer', () =>
            {
                wrapper.setProps( { errorMessage: 'yes!' } );

                expect( wrapper.find( InputContainer ).prop( 'errorMessage' ) )
                    .to.equal( 'yes!' );
            } );
        } );

        describe( 'errorMessageIsVisible', () =>
        {
            it( 'should be false by default', () =>
            {
                expect( props.errorMessageIsVisible ).to.be.false;
            } );

            it( 'should be passed to the InputContainer', () =>
            {
                wrapper.setProps( { errorMessageIsVisible: true } );

                expect( wrapper.find( InputContainer )
                    .prop( 'errorMessageIsVisible' ) ).to.be.true;
            } );
        } );

        describe( 'errorMessagePosition', () =>
        {
            it( 'should be "top" by default', () =>
            {
                expect( props.errorMessagePosition ).to.equal( 'top' );
            } );

            it( 'should be passed to the InputContainer', () =>
            {
                wrapper.setProps( { errorMessagePosition: 'topLeft' } );

                expect( wrapper.find( InputContainer )
                    .prop( 'errorMessagePosition' ) ).to.equal( 'topLeft' );
            } );
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

        describe( 'id', () =>
        {
            it( 'should be undefined by default', () =>
            {
                expect( props.id ).to.be.undefined;
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

        describe( 'onClickIcon', () =>
        {
            beforeEach( () =>
            {
                wrapper.setProps( { iconType: 'add' } );
            } );

            it( 'should be undefined by default', () =>
            {
                expect( props.onClickIcon ).to.be.undefined;
            } );

            it( 'should be passed to the IconButton as onClick', () =>
            {
                const onClickIcon = () => undefined;

                wrapper.setProps( { onClickIcon } );

                expect( wrapper.find( IconButton ).prop( 'onClick' ) ).to
                    .equal( onClickIcon );
            } );
        } );

        describe( 'onFocus', () =>
        {
            it( 'should be undefined by default', () =>
            {
                expect( props.onFocus ).to.be.undefined;
            } );
        } );

        describe( 'onBlur', () =>
        {
            it( 'should be undefined by default', () =>
            {
                expect( props.onBlur ).to.be.undefined;
            } );
        } );

        describe( 'onInput', () =>
        {
            it( 'should be undefined by default', () =>
            {
                expect( props.onInput ).to.be.undefined;
            } );

            it( 'should be passed to the InputField', () =>
            {
                const onInput = () => undefined;

                wrapper.setProps( { onInput } );

                expect( wrapper.find( InputField ).prop( 'onInput' ) ).to
                    .equal( onInput );
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

        describe( 'onMouseOver', () =>
        {
            it( 'should be undefined by default', () =>
            {
                expect( props.onMouseOver ).to.be.undefined;
            } );

            it( 'should be passed to the InputContainer', () =>
            {
                const onMouseOver = () => undefined;

                wrapper.setProps( { onMouseOver } );

                expect( wrapper.find( InputContainer ).prop( 'onMouseOver' ) )
                    .to.equal( onMouseOver );
            } );

            it( 'should be passed to the InputField', () =>
            {
                const onMouseOver = () => undefined;

                wrapper.setProps( { onMouseOver } );

                expect( wrapper.find( InputField ).prop( 'onMouseOver' ) ).to
                    .equal( onMouseOver );
            } );

            it( 'should not be passed to the Tooltip', () =>
            {
                const onMouseOver = () => undefined;

                wrapper.setProps( {
                    iconType : 'add',
                    onMouseOver
                } );

                expect( wrapper.find( Tooltip ).prop( 'onMouseOver' ) ).not.to
                    .equal( onMouseOver );
            } );

            it( 'should be passed to the IconButton', () =>
            {
                const onMouseOver = () => undefined;

                wrapper.setProps( {
                    iconType : 'add',
                    onMouseOver
                } );

                expect( wrapper.find( IconButton ).prop( 'onMouseOver' ) ).to
                    .equal( onMouseOver );
            } );
        } );

        describe( 'onMouseOut', () =>
        {
            it( 'should be undefined by default', () =>
            {
                expect( props.onMouseOut ).to.be.undefined;
            } );

            it( 'should be passed to the InputContainer', () =>
            {
                const onMouseOut = () => undefined;

                wrapper.setProps( { onMouseOut } );

                expect( wrapper.find( InputContainer ).prop( 'onMouseOut' ) )
                    .to.equal( onMouseOut );
            } );

            it( 'should be passed to the InputField', () =>
            {
                const onMouseOut = () => undefined;

                wrapper.setProps( { onMouseOut } );

                expect( wrapper.find( InputField ).prop( 'onMouseOut' ) ).to
                    .equal( onMouseOut );
            } );

            it( 'should not be passed to the Tooltip', () =>
            {
                const onMouseOut = () => undefined;

                wrapper.setProps( {
                    iconType : 'add',
                    onMouseOut
                } );

                expect( wrapper.find( Tooltip ).prop( 'onMouseOut' ) ).not.to
                    .equal( onMouseOut );
            } );

            it( 'should be passed to the IconButton', () =>
            {
                const onMouseOut = () => undefined;

                wrapper.setProps( {
                    iconType : 'add',
                    onMouseOut
                } );

                expect( wrapper.find( IconButton ).prop( 'onMouseOut' ) ).to
                    .equal( onMouseOut );
            } );
        } );

        describe( 'onMouseOverIcon', () =>
        {
            it( 'should be undefined by default', () =>
            {
                expect( props.onMouseOverIcon ).to.be.undefined;
            } );
        } );

        describe( 'onMouseOutIcon', () =>
        {
            it( 'should be undefined by default', () =>
            {
                expect( props.onMouseOutIcon ).to.be.undefined;
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
    } );

    describe( 'state', () =>
    {
        let e;

        beforeEach( () =>
        {
            wrapper.setProps( { iconType: 'add' } );
            e = new Event( {} );
        } );

        describe( 'id', () =>
        {
            it( 'should be defined', () =>
            {
                expect( wrapper.state( 'id' ) ).to.be.defined;
            } );

            it( 'should be passed to the InputContainer', () =>
            {
                wrapper.setState( { id: 'yes!' } );

                expect( wrapper.find( InputContainer ).prop( 'id' ) ).to
                    .equal( 'yes!' );
            } );

            it( 'should be passed to the InputField', () =>
            {
                wrapper.setState( { id: 'yes!' } );

                expect( wrapper.find( InputField ).prop( 'id' ) ).to
                    .equal( 'yes!' );
            } );
        } );

        describe( 'iconIsFocused', () =>
        {
            it( 'should be false by default', () =>
            {
                expect( wrapper.state( 'iconIsFocused' ) ).to.be.false;
            } );

            it( 'should not be true after InputField receives focus', () =>
            {
                wrapper.find( InputField ).simulate( 'focus', e );
                expect( wrapper.state( 'iconIsFocused' ) ).not.to.be.true;
            } );

            it( 'should be true after IconButton receives focus', () =>
            {
                wrapper.find( IconButton ).simulate( 'focus', e );
                expect( wrapper.update().state( 'iconIsFocused' ) ).to.be.true;
            } );

            it( 'should be false after IconButton is blurred', () =>
            {
                wrapper.find( IconButton ).simulate( 'focus', e );
                wrapper.find( IconButton ).simulate( 'blur', e );
                expect( wrapper.state( 'iconIsFocused' ) ).to.be.false;
            } );

            it( 'should be passed to InputField as forceHover', () =>
            {
                wrapper.setState( { iconIsFocused: true } );

                expect( wrapper.find( InputField ).prop( 'forceHover' ) ).to.be
                    .true;
            } );
        } );

        describe( 'iconIsHovered', () =>
        {
            it( 'should be false by default', () =>
            {
                expect( wrapper.state( 'iconIsHovered' ) ).to.be.false;
            } );

            it( 'should not be true after mouse enters InputField', () =>
            {
                wrapper.find( InputField ).simulate( 'mouseOver', e );
                expect( wrapper.state( 'iconIsHovered' ) ).not.to.be.true;
            } );

            it( 'should be true after mouse enters Tooltip', () =>
            {
                wrapper.find( Tooltip ).simulate( 'mouseOver', e );
                expect( wrapper.state( 'iconIsHovered' ) ).to.be.true;
            } );

            it( 'should be false after mouse leaves Tooltip', () =>
            {
                wrapper.find( Tooltip ).simulate( 'mouseOver', e );
                wrapper.find( Tooltip ).simulate( 'mouseOut', e );
                expect( wrapper.state( 'iconIsFocused' ) ).to.be.false;
            } );

            it( 'should be passed to InputField as forceHover', () =>
            {
                wrapper.setState( { iconIsHovered: true } );

                expect( wrapper.find( InputField ).prop( 'forceHover' ) ).to.be
                    .true;
            } );
        } );
    } );
} );


describe( 'TextInputWithIconDriver', () =>
{
    let wrapper;
    let driver;

    beforeEach( () =>
    {
        wrapper = mount( <TextInputWithIcon /> );
        driver  = wrapper.driver();
    } );

    describe( 'getErrorMessage()', () =>
    {
        beforeEach( () =>
        {
            wrapper.setProps( {
                hasError              : true,
                errorMessage          : <h2>Pikachu!</h2>,
                errorMessageIsVisible : true
            } );
        } );

        it( 'should return a ReactWrapper', () =>
        {
            expect( driver.getErrorMessage() ).to.be.instanceOf( ReactWrapper );
        } );

        it( 'should contain the message content', () =>
        {
            const message = driver.getErrorMessage();
            expect( message.find( 'h2' ) ).to.have.length( 1 );
        } );
    } );
} );
