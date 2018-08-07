/* global test jest */
/* eslint-disable no-magic-numbers, no-multi-str, no-unused-expressions */

import React              from 'react';
import { mount, shallow } from 'enzyme';

import { Tag }            from '../index';

import TagInput           from './index';


describe( 'TagInput', () =>
{
    let wrapper;
    let instance;
    let cssMap;

    beforeEach( () =>
    {
        wrapper      = shallow( <TagInput /> );
        instance     = wrapper.instance();
        ( { cssMap } = instance.props );
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
                <Tag label = "TagLabel 2" />,
            ],
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
    let driver;

    beforeEach( () =>
    {
        wrapper  = mount( <TagInput /> );
        driver   = wrapper.driver();
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
                    <Tag label = "TagLabel 2" />,
                ],
            } );

            driver.blur();

            expect( onBlur ).toBeCalledTimes( 1 );
        } );


        describe( 'isDisabled', () =>
        {
            it( 'throws the expected error when isDisabled', () =>
            {
                wrapper.setProps( { isDisabled: true } );

                const expectedError =
                    'Input can\'t blur since it is disabled';

                expect( () => driver.blur() ).toThrow( expectedError );
            } );

            it( 'does not call simulate( event ) when isDisabled', () =>
            {
                const simulate = jest.spyOn( wrapper.find( `.${wrapper.props()
                    .cssMap.default}` ), 'simulate' );

                wrapper.setProps( { isDisabled: true } );

                expect( () => driver.blur() );
                expect( simulate ).not.toBeCalled();
            } );
        } );


        describe( 'isReadOnly', () =>
        {
            it( 'throws the expected error when isReadOnly', () =>
            {
                wrapper.setProps( { isReadOnly: true } );

                const expectedError =
                    'Input can\'t blur since it is read only';

                expect( () => driver.blur() ).toThrow( expectedError );
            } );

            it( 'does not call simulate( event ) when isReadOnly', () =>
            {
                const simulate = jest.spyOn( wrapper.find( `.${wrapper.props()
                    .cssMap.default}` ), 'simulate' );

                wrapper.setProps( { isReadOnly: true } );

                expect( () => driver.blur() );
                expect( simulate ).not.toBeCalled();
            } );
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
                    <Tag label = "TagLabel 2" />,
                ],
            } );

            driver.focus();

            expect( onFocus ).toBeCalledTimes( 1 );
        } );


        describe( 'isDisabled', () =>
        {
            it( 'throws the expected error when isDisabled', () =>
            {
                wrapper.setProps( { isDisabled: true } );

                const expectedError =
                    'Input can\'t focus since it is disabled';

                expect( () => driver.focus() ).toThrow( expectedError );
            } );

            it( 'does not call simulate( event ) when isDisabled', () =>
            {
                const simulate = jest.spyOn( wrapper.find( `.${wrapper.props()
                    .cssMap.default}` ), 'simulate' );

                wrapper.setProps( { isDisabled: true } );

                expect( () => driver.focus() );
                expect( simulate ).not.toBeCalled();
            } );
        } );


        describe( 'isReadOnly', () =>
        {
            it( 'throws the expected error when isReadOnly', () =>
            {
                wrapper.setProps( { isReadOnly: true } );

                const expectedError =
                    'Input can\'t focus since it is read only';

                expect( () => driver.focus() ).toThrow( expectedError );
            } );

            it( 'does not call simulate( event ) when isReadOnly', () =>
            {
                const simulate = jest.spyOn( wrapper.find( `.${wrapper.props()
                    .cssMap.default}` ), 'simulate' );

                wrapper.setProps( { isReadOnly: true } );

                expect( () => driver.focus() );
                expect( simulate ).not.toBeCalled();
            } );
        } );
    } );


    describe( 'change()', () =>
    {
        test( 'should call change exactly once', () =>
        {
            const onChange = jest.fn();
            wrapper.setProps( {
                onChange,
                children : [
                    <Tag label = "TagLabel 1" />,
                    <Tag label = "TagLabel 2" />,
                ],
            } );

            driver.change();

            expect( onChange ).toBeCalledTimes( 1 );
        } );


        describe( 'isDisabled', () =>
        {
            it( 'throws the expected error when isDisabled', () =>
            {
                wrapper.setProps( { isDisabled: true } );

                const expectedError =
                    'Input can\'t change since it is disabled';

                expect( () => driver.change() ).toThrow( expectedError );
            } );

            it( 'does not call simulate( event ) when isDisabled', () =>
            {
                const simulate = jest.spyOn( wrapper.find( `.${wrapper.props()
                    .cssMap.default}` ), 'simulate' );

                wrapper.setProps( { isDisabled: true } );

                expect( () => driver.change() );
                expect( simulate ).not.toBeCalled();
            } );
        } );


        describe( 'isReadOnly', () =>
        {
            it( 'throws the expected error when isReadOnly', () =>
            {
                wrapper.setProps( { isReadOnly: true } );

                const expectedError =
                    'Input can\'t change since it is read only';

                expect( () => driver.change() ).toThrow( expectedError );
            } );

            it( 'does not call simulate( event ) when isReadOnly', () =>
            {
                const simulate = jest.spyOn( wrapper.find( `.${wrapper.props()
                    .cssMap.default}` ), 'simulate' );

                wrapper.setProps( { isReadOnly: true } );

                expect( () => driver.change() );
                expect( simulate ).not.toBeCalled();
            } );
        } );
    } );


    describe( 'clickCloseTagByIndex( index )', () =>
    {
        test( 'should call onClickClose exactly once', () =>
        {
            const onClickClose = jest.fn();
            wrapper.setProps( {
                onClickClose,
                children : [
                    <Tag label = "TagLabel 1" />,
                    <Tag label = "TagLabel 2" />,
                ],
            } );

            driver.clickCloseTagByIndex( 1 );

            expect( onClickClose ).toBeCalledTimes( 1 );
        } );


        describe( 'isDisabled', () =>
        {
            it( 'throws the expected error when isDisabled', () =>
            {
                wrapper.setProps( { isDisabled: true } );

                const expectedError =
                    'Input can\'t clickCloseTagByIndex since it is disabled';

                expect( () => driver.clickCloseTagByIndex() )
                    .toThrow( expectedError );
            } );

            it( 'does not call simulate( event ) when isDisabled', () =>
            {
                const simulate = jest.spyOn( wrapper.find( `.${wrapper.props()
                    .cssMap.default}` ), 'simulate' );

                wrapper.setProps( { isDisabled: true } );

                expect( () => driver.clickCloseTagByIndex() );
                expect( simulate ).not.toBeCalled();
            } );
        } );


        describe( 'isReadOnly', () =>
        {
            it( 'throws the expected error when isReadOnly', () =>
            {
                wrapper.setProps( { isReadOnly: true } );

                const expectedError =
                    'Input can\'t clickCloseTagByIndex since it is read only';

                expect( () => driver.clickCloseTagByIndex() )
                    .toThrow( expectedError );
            } );

            it( 'does not call simulate( event ) when isReadOnly', () =>
            {
                const simulate = jest.spyOn( wrapper.find( `.${wrapper.props()
                    .cssMap.default}` ), 'simulate' );

                wrapper.setProps( { isReadOnly: true } );

                expect( () => driver.clickCloseTagByIndex() );
                expect( simulate ).not.toBeCalled();
            } );
        } );
    } );

    describe( 'clickCloseTagByLabel( label )', () =>
    {
        test( 'should call onClickClose exactly once', () =>
        {
            const onClickClose = jest.fn();
            wrapper.setProps( {
                onClickClose,
                children : [
                    <Tag label = "TagLabel 1" />,
                    <Tag label = "TagLabel 2" />,
                ],
            } );

            driver.clickCloseTagByLabel( 'TagLabel 1' );

            expect( onClickClose ).toBeCalledTimes( 1 );
        } );


        describe( 'isDisabled', () =>
        {
            it( 'throws the expected error when isDisabled', () =>
            {
                wrapper.setProps( { isDisabled: true } );

                const expectedError =
                    'Input can\'t clickCloseTagByLabel since it is disabled';

                expect( () => driver.clickCloseTagByLabel() )
                    .toThrow( expectedError );
            } );

            it( 'does not call simulate( event ) when isDisabled', () =>
            {
                const simulate = jest.spyOn( wrapper.find( `.${wrapper.props()
                    .cssMap.default}` ), 'simulate' );

                wrapper.setProps( { isDisabled: true } );

                expect( () => driver.clickCloseTagByLabel() );
                expect( simulate ).not.toBeCalled();
            } );
        } );


        describe( 'isReadOnly', () =>
        {
            it( 'throws the expected error when isReadOnly', () =>
            {
                wrapper.setProps( { isReadOnly: true } );

                const expectedError =
                    'Input can\'t clickCloseTagByLabel since it is read only';

                expect( () => driver.clickCloseTagByLabel() )
                    .toThrow( expectedError );
            } );

            it( 'does not call simulate( event ) when isReadOnly', () =>
            {
                const simulate = jest.spyOn( wrapper.find( `.${wrapper.props()
                    .cssMap.default}` ), 'simulate' );

                wrapper.setProps( { isReadOnly: true } );

                expect( () => driver.clickCloseTagByLabel() );
                expect( simulate ).not.toBeCalled();
            } );
        } );
    } );


    describe( 'keyPress()', () =>
    {
        test( 'should trigger onKeyPress callback prop once', () =>
        {
            const onKeyPress = jest.fn();
            wrapper.setProps( {
                onKeyPress,
                children : [
                    <Tag label = "TagLabel 1" />,
                    <Tag label = "TagLabel 2" />,
                ],
            } );

            driver.keyPress();

            expect( onKeyPress ).toBeCalledTimes( 1 );
        } );


        describe( 'isDisabled', () =>
        {
            it( 'throws the expected error when isDisabled', () =>
            {
                wrapper.setProps( { isDisabled: true } );

                const expectedError =
                    'Input can\'t keyPress since it is disabled';

                expect( () => driver.keyPress() ).toThrow( expectedError );
            } );

            it( 'does not call simulate( event ) when isDisabled', () =>
            {
                const simulate = jest.spyOn( wrapper.find( `.${wrapper.props()
                    .cssMap.default}` ), 'simulate' );

                wrapper.setProps( { isDisabled: true } );

                expect( () => driver.keyPress() );
                expect( simulate ).not.toBeCalled();
            } );
        } );


        describe( 'isReadOnly', () =>
        {
            it( 'throws the expected error when isReadOnly', () =>
            {
                wrapper.setProps( { isReadOnly: true } );

                const expectedError =
                    'Input can\'t keyPress since it is read only';

                expect( () => driver.keyPress() ).toThrow( expectedError );
            } );

            it( 'does not call simulate( event ) when isReadOnly', () =>
            {
                const simulate = jest.spyOn( wrapper.find( `.${wrapper.props()
                    .cssMap.default}` ), 'simulate' );

                wrapper.setProps( { isReadOnly: true } );

                expect( () => driver.keyPress() );
                expect( simulate ).not.toBeCalled();
            } );
        } );
    } );


    describe( 'keyUp()', () =>
    {
        test( 'should trigger onKeyUp callback prop once', () =>
        {
            const onKeyUp = jest.fn();
            wrapper.setProps( {
                onKeyUp,
                children : [
                    <Tag label = "TagLabel 1" />,
                    <Tag label = "TagLabel 2" />,
                ],
            } );

            driver.keyUp();

            expect( onKeyUp ).toBeCalledTimes( 1 );
        } );


        describe( 'isDisabled', () =>
        {
            it( 'throws the expected error when isDisabled', () =>
            {
                wrapper.setProps( { isDisabled: true } );

                const expectedError =
                    'Input can\'t keyUp since it is disabled';

                expect( () => driver.keyUp() ).toThrow( expectedError );
            } );

            it( 'does not call simulate( event ) when isDisabled', () =>
            {
                const simulate = jest.spyOn( wrapper.find( `.${wrapper.props()
                    .cssMap.default}` ), 'simulate' );

                wrapper.setProps( { isDisabled: true } );

                expect( () => driver.keyUp() );
                expect( simulate ).not.toBeCalled();
            } );
        } );


        describe( 'isReadOnly', () =>
        {
            it( 'throws the expected error when isReadOnly', () =>
            {
                wrapper.setProps( { isReadOnly: true } );

                const expectedError =
                    'Input can\'t keyUp since it is read only';

                expect( () => driver.keyUp() ).toThrow( expectedError );
            } );

            it( 'does not call simulate( event ) when isReadOnly', () =>
            {
                const simulate = jest.spyOn( wrapper.find( `.${wrapper.props()
                    .cssMap.default}` ), 'simulate' );

                wrapper.setProps( { isReadOnly: true } );

                expect( () => driver.keyUp() );
                expect( simulate ).not.toBeCalled();
            } );
        } );
    } );


    describe( 'keyDown()', () =>
    {
        test( 'should trigger onKeyDown callback prop once', () =>
        {
            const onKeyDown = jest.fn();
            wrapper.setProps( {
                onKeyDown,
                children : [
                    <Tag label = "TagLabel 1" />,
                    <Tag label = "TagLabel 2" />,
                ],
            } );

            driver.keyDown();

            expect( onKeyDown ).toBeCalledTimes( 1 );
        } );


        describe( 'isDisabled', () =>
        {
            it( 'throws the expected error when isDisabled', () =>
            {
                wrapper.setProps( { isDisabled: true } );

                const expectedError =
                    'Input can\'t keyDown since it is disabled';

                expect( () => driver.keyDown() ).toThrow( expectedError );
            } );

            it( 'does not call simulate( event ) when isDisabled', () =>
            {
                const simulate = jest.spyOn( wrapper.find( `.${wrapper.props()
                    .cssMap.default}` ), 'simulate' );

                wrapper.setProps( { isDisabled: true } );

                expect( () => driver.keyDown() );
                expect( simulate ).not.toBeCalled();
            } );
        } );


        describe( 'isReadOnly', () =>
        {
            it( 'throws the expected error when isReadOnly', () =>
            {
                wrapper.setProps( { isReadOnly: true } );

                const expectedError =
                    'Input can\'t keyDown since it is read only';

                expect( () => driver.keyDown() ).toThrow( expectedError );
            } );

            it( 'does not call simulate( event ) when isReadOnly', () =>
            {
                const simulate = jest.spyOn( wrapper.find( `.${wrapper.props()
                    .cssMap.default}` ), 'simulate' );

                wrapper.setProps( { isReadOnly: true } );

                expect( () => driver.keyDown() );
                expect( simulate ).not.toBeCalled();
            } );
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
                    <Tag label = "TagLabel 2" />,
                ],
            } );

            driver.mouseOut();

            expect( onMouseOut ).toBeCalledTimes( 1 );
        } );


        describe( 'isDisabled', () =>
        {
            it( 'throws the expected error when isDisabled', () =>
            {
                wrapper.setProps( { isDisabled: true } );

                const expectedError =
                    'Input can\'t mouseOut since it is disabled';

                expect( () => driver.mouseOut() ).toThrow( expectedError );
            } );

            it( 'does not call simulate( event ) when isDisabled', () =>
            {
                const simulate = jest.spyOn( wrapper.find( `.${wrapper.props()
                    .cssMap.default}` ), 'simulate' );

                wrapper.setProps( { isDisabled: true } );

                expect( () => driver.mouseOut() );
                expect( simulate ).not.toBeCalled();
            } );
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
                    <Tag label = "TagLabel 2" />,
                ],
            } );

            driver.mouseOver();

            expect( onMouseOver ).toBeCalledTimes( 1 );
        } );


        describe( 'isDisabled', () =>
        {
            it( 'throws the expected error when isDisabled', () =>
            {
                wrapper.setProps( { isDisabled: true } );

                const expectedError =
                    'Input can\'t mouseOver since it is disabled';

                expect( () => driver.mouseOver() ).toThrow( expectedError );
            } );

            it( 'does not call simulate( event ) when isDisabled', () =>
            {
                const simulate = jest.spyOn( wrapper.find( `.${wrapper.props()
                    .cssMap.default}` ), 'simulate' );

                wrapper.setProps( { isDisabled: true } );

                expect( () => driver.mouseOver() );
                expect( simulate ).not.toBeCalled();
            } );
        } );
    } );
} );
