/* global test jest */
/* eslint-disable no-magic-numbers, no-multi-str, no-unused-expressions */

import React              from 'react';
import { mount, shallow } from 'enzyme';

import { Tag }            from '../index';

import TagInput           from './index';

const { cssMap } = TagInput.defaultProps;

describe( 'TagInput', () =>
{
    let wrapper;
    let instance;

    beforeEach( () =>
    {
        wrapper      = shallow( <TagInput /> );
        instance     = wrapper.instance();
    } );

    describe( 'constructor( props )', () =>
    {
        test( 'should have name TagInput', () =>
        {
            expect( instance.constructor.name ).toBe( 'TagInput' );
        } );
    } );

    describe( 'render()', () =>
    {
        test( 'should contain exactly one input', () =>
        {
            expect( wrapper.find( `.${cssMap.input}` ) ).toHaveLength( 1 );
        } );
    } );

    test( 'should have Tag components when passed as children', () =>
    {
        wrapper.setProps( {
            children : [
                <Tag label = "TagLabel 1" />,
                <Tag label = "TagLabel 2" />
            ]
        } );

        expect( wrapper.find( Tag ) ).toHaveLength( 2 );
    } );

    test( 'should have Tag components when passed as tags prop', () =>
    {
        wrapper.setProps( {
            tags : [ 'TagLabelString 1', 'TagLabelString 2' ],
        } );

        expect( wrapper.find( Tag ) ).toHaveLength( 2 );
    } );

    test( 'should trigger onKeyDown callbacks when key pressed', () =>
    {
        const onKeyDown = jest.fn();
        wrapper.setProps( { onKeyDown } );

        wrapper.find( `.${cssMap.input}` ).simulate( 'keyDown' );
        expect( onKeyDown ).toBeCalled();
    } );

    test( 'should trigger onKeyUp callbacks when key pressed', () =>
    {
        const onKeyUp = jest.fn();
        wrapper.setProps( { onKeyUp } );

        wrapper.find( `.${cssMap.input}` ).simulate( 'keyUp' );
        expect( onKeyUp ).toBeCalled();
    } );

    test( 'should trigger onKeyPress callbacks when key pressed', () =>
    {
        const onKeyPress = jest.fn();
        wrapper.setProps( { onKeyPress } );

        wrapper.find( `.${cssMap.input}` ).simulate( 'keyPress' );
        expect( onKeyPress ).toBeCalled();
    } );

    describe( 'readOnly state', () =>
    {
        beforeEach( () =>
        {
            wrapper.setProps( { isReadOnly: true } );
        } );

        test( 'input should receive readonly', () =>
        {
            expect( wrapper.find( `.${cssMap.input}` ).prop( 'readOnly' ) )
                .toBeTruthy();
        } );
    } );

    describe( 'disabled state', () =>
    {
        beforeEach( () =>
        {
            wrapper.setProps( { isDisabled: true } );
        } );

        test( 'input should receive isDisabled as "disabled"', () =>
        {
            expect( wrapper.find( `.${cssMap.input}` ).prop( 'disabled' ) )
                .toBeTruthy();
        } );
    } );
} );


describe( 'TagInputDriver', () =>
{
    let wrapper;

    beforeEach( () =>
    {
        wrapper  = mount( <TagInput /> );
    } );

    describe( 'blur()', () =>
    {
        test( 'should call blur exactly once', () =>
        {
            const onBlur = jest.fn();
            wrapper.setProps( {
                onBlur,
                children : [
                    <Tag label = "TagLabel 1" />,
                    <Tag label = "TagLabel 2" />
                ]
            } );

            wrapper.driver().blur();

            expect( onBlur ).toBeCalledTimes( 1 );
        } );
    } );

    describe( 'focus()', () =>
    {
        test( 'should call focus exactly once', () =>
        {
            const onFocus = jest.fn();
            wrapper.setProps( {
                onFocus,
                children : [
                    <Tag label = "TagLabel 1" />,
                    <Tag label = "TagLabel 2" />
                ]
            } );

            wrapper.driver().focus();

            expect( onFocus ).toBeCalledTimes( 1 );
        } );
    } );

    describe( 'clickCloseTagByIndex()', () =>
    {
        test( 'should call onClickClose exactly once', () =>
        {
            const onClickClose = jest.fn();
            wrapper.setProps( {
                onClickClose,
                children : [
                    <Tag label = "TagLabel 1" />,
                    <Tag label = "TagLabel 2" />
                ]
            } );

            wrapper.driver().clickCloseTagByIndex( 1 );

            expect( onClickClose ).toBeCalledTimes( 1 );
        } );
    } );

    describe( 'clickCloseTagByLabel()', () =>
    {
        test( 'should call onClickClose exactly once', () =>
        {
            const onClickClose = jest.fn();
            wrapper.setProps( {
                onClickClose,
                children : [
                    <Tag label = "TagLabel 1" />,
                    <Tag label = "TagLabel 2" />
                ]
            } );

            wrapper.driver().clickCloseTagByLabel( 'TagLabel 1' );

            expect( onClickClose ).toBeCalledTimes( 1 );
        } );
    } );

    describe( 'mouseOut()', () =>
    {
        test( 'should call onMouseOut exactly once', () =>
        {
            const onMouseOut = jest.fn();
            wrapper.setProps( {
                onMouseOut,
                children : [
                    <Tag label = "TagLabel 1" />,
                    <Tag label = "TagLabel 2" />
                ]
            } );

            wrapper.driver().mouseOut();

            expect( onMouseOut ).toBeCalledTimes( 1 );
        } );
    } );

    describe( 'mouseOver()', () =>
    {
        test( 'should call onMouseOver exactly once', () =>
        {
            const onMouseOver = jest.fn();
            wrapper.setProps( {
                onMouseOver,
                children : [
                    <Tag label = "TagLabel 1" />,
                    <Tag label = "TagLabel 2" />
                ]
            } );

            wrapper.driver().mouseOver();

            expect( onMouseOver ).toBeCalledTimes( 1 );
        } );
    } );
} );
