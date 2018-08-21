/* eslint-disable no-magic-numbers, no-multi-str, no-unused-expressions */

import React              from 'react';
import { mount, shallow } from 'enzyme';

import Icon               from '../Icon';
import Spinner            from '../Spinner';

import Button             from './index';


describe( 'Button', () =>
{
    let wrapper;
    let instance;

    beforeEach( () =>
    {
        wrapper  = shallow( <Button /> );
        instance = wrapper.instance();
    } );

    describe( 'constructor( props )', () =>
    {
        test( 'should have name Button', () =>
        {
            expect( instance.constructor.name ).toBe( 'Button' );
        } );
    } );

    describe( 'handleMouseOver( e )', () =>
    {
        test( 'sets isHovered state to true', () =>
        {
            const onMouseOver = jest.fn();
            wrapper.setProps( { onMouseOver } );

            instance.handleMouseOver();
            expect( instance.state.isHovered ).toEqual( true );
        } );
    } );

    describe( 'handleMouseOut( e )', () =>
    {
        test( 'sets isHovered state to false', () =>
        {
            const onMouseOut = jest.fn();
            wrapper.setProps( { onMouseOut } );

            instance.handleMouseOut();
            expect( instance.state.isHovered ).toEqual( false );
        } );
    } );

    describe( 'render()', () =>
    {
        test( 'should contain exactly one <button>', () =>
        {
            expect( wrapper.find( 'button' ) ).toHaveLength( 1 );
        } );

        test( 'should have a exactly one Icon when configured', () =>
        {
            wrapper.setProps( { iconType: 'add' } );
            expect( wrapper.find( Icon ) ).toHaveLength( 1 );
        } );

        test( 'should have a exactly one Spinner when loading', () =>
        {
            wrapper.setProps( { isLoading: true } );
            expect( wrapper.find( Spinner ) ).toHaveLength( 1 );
        } );
    } );

    describe( 'props', () =>
    {
        describe( 'iconType', () =>
        {
            test( 'should be "none" by default', () =>
            {
                expect( instance.props.iconType ).toBe( 'none' );
            } );

            test( 'should be passed to the Icon as type', () =>
            {
                wrapper.setProps( { iconType: 'add' } );
                expect( wrapper.find( Icon ).prop( 'type' ) ).toBe( 'add' );
            } );
        } );

        describe( 'iconPosition', () =>
        {
            test( 'should be "left" by default', () =>
            {
                expect( instance.props.iconPosition ).toBe( 'left' );
            } );
        } );

        describe( 'role', () =>
        {
            test( 'should be "default" by default', () =>
            {
                expect( instance.props.role ).toBe( 'default' );
            } );

            test( 'should be passed to Icon as theme when "control"', () =>
            {
                wrapper.setProps( {
                    iconType : 'add',
                    role     : 'control',
                } );

                expect( wrapper.find( Icon ).prop( 'theme' ) )
                    .toBe( 'control' );
            } );
        } );

        describe( 'isLoading', () =>
        {
            test( 'should be false by default', () =>
            {
                expect( instance.props.isLoading ).toBe( false );
            } );

            test( 'should be passed to Icon as theme when "control"', () =>
            {
                wrapper.setProps( {
                    iconType : 'add',
                    role     : 'control',
                } );

                expect( wrapper.find( Icon ).prop( 'theme' ) )
                    .toBe( 'control' );
            } );
        } );

        describe( 'onClick', () =>
        {
            test( 'is undefined by default', () =>
            {
                expect( instance.props.onClick ).toBeUndefined();
            } );

            test( 'is passed to <button>', () =>
            {
                const onClick = jest.fn();
                wrapper.setProps( { onClick } );

                expect( wrapper.find( 'button' ).prop( 'onClick' ) )
                    .toEqual( onClick );
            } );
        } );

        describe( 'onMouseOver', () =>
        {
            test( 'is undefined by default', () =>
            {
                expect( instance.props.onMouseOver ).toBeUndefined();
            } );
        } );

        describe( 'onMouseOut', () =>
        {
            test( 'is undefined by default', () =>
            {
                expect( instance.props.onMouseOut ).toBeUndefined();
            } );
        } );

        describe( 'buttonRef', () =>
        {
            test( 'should be undefined by default', () =>
            {
                expect( instance.props.buttonRef ).toBeUndefined();
            } );
        } );
    } );
} );


describe( 'ButtonDriver', () =>
{
    let wrapper;
    let driver;
    let button;

    beforeEach( () =>
    {
        wrapper  = mount( <Button /> );
        driver   = wrapper.driver();
        button   = wrapper.find( 'button' ).first();
    } );

    describe( 'constructor', () =>
    {
        test( 'assigns the <button> to this.button', () =>
        {
            expect( driver.button.getNode() ).toEqual( button.getNode() );
        } );
    } );

    describe( 'click()', () =>
    {
        test( 'should trigger onClick callback prop once', () =>
        {
            const onClick = jest.fn();
            wrapper.setProps( {
                onClick,
                label : 'Pikaboo',
            } );

            driver.click();
            expect( onClick ).toBeCalledTimes( 1 );
        } );


        describe( 'isDisabled', () =>
        {
            test( 'throws the expected error when isDisabled', () =>
            {
                const expectedError =
                    'Button \'Pikaboo\' cannot be clicked since it is disabled';
                wrapper.setProps( { isDisabled: true, label: 'Pikaboo' } );

                expect( () => driver.click() ).toThrow( expectedError );
            } );

            test( 'does not call simulate( event ) when isDisabled', () =>
            {
                const onClick = jest.fn();
                wrapper.setProps( {
                    onClick,
                    isDisabled : true,
                    label      : 'Pikaboo',
                } );

                try
                {
                    driver.click();
                }
                catch ( error )
                {
                    expect( onClick ).not.toBeCalled();
                }
            } );
        } );


        describe( 'isReadOnly', () =>
        {
            test( 'throws the expected error when isReadOnly', () =>
            {
                const expectedError = 'Button \'Tekeli-li\' cannot be clicked \
since it is read only';
                wrapper.setProps( { isReadOnly: true, label: 'Tekeli-li' } );

                expect( () => driver.click() ).toThrow( expectedError );
            } );

            test( 'does not call simulate( event ) when isReadOnly', () =>
            {
                const onClick = jest.fn();
                wrapper.setProps( {
                    onClick,
                    isReadOnly : true,
                    label      : 'Tekeli-li',
                } );

                try
                {
                    driver.click();
                }
                catch ( error )
                {
                    expect( onClick ).not.toBeCalled();
                }
            } );
        } );


        describe( 'isLoading', () =>
        {
            test( 'throws the expected error when isLoading', () =>
            {
                const expectedError = 'Button \'Pikaboo\' cannot be clicked \
since it is loading';
                wrapper.setProps( { isLoading: true, label: 'Pikaboo'  } );

                expect( () => driver.click() ).toThrow( expectedError );
            } );

            test( 'does not call simulate( event ) when isLoading', () =>
            {
                const onClick = jest.fn();
                wrapper.setProps( {
                    onClick,
                    isLoading : true,
                    label     : 'Pikaboo',
                } );

                try
                {
                    driver.click();
                }
                catch ( error )
                {
                    expect( onClick ).not.toBeCalled();
                }
            } );
        } );
    } );


    describe( 'mouseOver()', () =>
    {
        test( 'should trigger onMouseOver callback prop once', () =>
        {
            const onMouseOver = jest.fn();
            wrapper.setProps( { onMouseOver } );

            driver.mouseOver();
            expect( onMouseOver ).toBeCalledTimes( 1 );
        } );


        describe( 'isDisabled', () =>
        {
            test( 'throws the expected error when isDisabled', () =>
            {
                const expectedError = 'Button \'Tekeli-li\' cannot have \
onMouseOver since it is disabled';
                wrapper.setProps( { isDisabled: true, label: 'Tekeli-li' } );

                expect( () => driver.mouseOver() ).toThrow( expectedError );
            } );

            test( 'does not call simulate( event ) when isDisabled', () =>
            {
                const onMouseOver = jest.fn();
                wrapper.setProps( {
                    onMouseOver,
                    isDisabled : true,
                    label      : 'Tekeli-li',
                } );

                try
                {
                    driver.mouseOver();
                }
                catch ( error )
                {
                    expect( onMouseOver ).not.toBeCalled();
                }
            } );
        } );


        describe( 'isLoading', () =>
        {
            test( 'throws the expected error when isLoading', () =>
            {
                const expectedError = 'Button \'Tekeli-li\' cannot have \
onMouseOver since it is loading';
                wrapper.setProps( { isLoading: true, label: 'Tekeli-li' } );

                expect( () => driver.mouseOver() ).toThrow( expectedError );
            } );

            test( 'does not call simulate( event ) when isLoading', () =>
            {
                const onMouseOver = jest.fn();
                wrapper.setProps( {
                    onMouseOver,
                    isLoading : true,
                    label     : 'Tekeli-li',
                } );

                try
                {
                    driver.mouseOver();
                }
                catch ( error )
                {
                    expect( onMouseOver ).not.toBeCalled();
                }
            } );
        } );
    } );


    describe( 'mouseOut()', () =>
    {
        test( 'should trigger onMouseOut callback prop once', () =>
        {
            const onMouseOut = jest.fn();
            wrapper.setProps( { onMouseOut } );

            driver.mouseOut();
            expect( onMouseOut ).toBeCalledTimes( 1 );
        } );


        describe( 'isDisabled', () =>
        {
            test( 'throws the expected error when isDisabled', () =>
            {
                const onMouseOut = jest.fn();
                wrapper.setProps( {
                    onMouseOut,
                    isDisabled : true,
                    label      : 'Tekeli-li',
                } );

                const expectedError = 'Button \'Tekeli-li\' cannot have \
onMouseOut since it is disabled';

                expect( () => driver.mouseOut() ).toThrow( expectedError );
            } );

            test( 'does not call simulate( event ) when isDisabled', () =>
            {
                const onMouseOut = jest.fn();
                wrapper.setProps( {
                    onMouseOut,
                    isDisabled : true,
                    label      : 'Tekeli-li',
                } );

                try
                {
                    driver.mouseOut();
                }
                catch ( error )
                {
                    expect( onMouseOut ).not.toBeCalled();
                }
            } );
        } );


        describe( 'isLoading', () =>
        {
            test( 'throws the expected error when isLoading', () =>
            {
                const expectedError = 'Button \'Tekeli-li\' cannot have \
onMouseOut since it is loading';
                wrapper.setProps( { isLoading: true, label: 'Tekeli-li' } );

                expect( () => driver.mouseOut() ).toThrow( expectedError );
            } );

            test( 'does not call simulate( event ) when isLoading', () =>
            {
                const onMouseOut = jest.fn();
                wrapper.setProps( {
                    onMouseOut,
                    isLoading : true,
                    label     : 'Tekeli-li',
                } );

                try
                {
                    driver.mouseOut();
                }
                catch ( error )
                {
                    expect( onMouseOut ).not.toBeCalled();
                }
            } );
        } );
    } );


    describe( 'blur()', () =>
    {
        test( 'should trigger onBlur callback prop once', () =>
        {
            const onBlur = jest.fn();
            wrapper.setProps( { onBlur } );

            driver.blur();
            expect( onBlur ).toBeCalledTimes( 1 );
        } );


        describe( 'isDisabled', () =>
        {
            test( 'throws the expected error when isDisabled', () =>
            {
                const expectedError = 'Button \'Tekeli-li\' cannot have blur \
since it is disabled';
                wrapper.setProps( { isDisabled: true, label: 'Tekeli-li' } );

                expect( () => driver.blur() ).toThrow( expectedError );
            } );

            test( 'does not call simulate( event ) when isDisabled', () =>
            {
                const onBlur = jest.fn();
                wrapper.setProps( {
                    onBlur,
                    isDisabled : true,
                    label      : 'Tekeli-li',
                } );

                try
                {
                    driver.blur();
                }
                catch ( error )
                {
                    expect( onBlur ).not.toBeCalled();
                }
            } );
        } );


        describe( 'isReadOnly', () =>
        {
            test( 'throws the expected error when isReadOnly', () =>
            {
                const expectedError = 'Button \'Tekeli-li\' cannot have blur \
since it is read only';
                wrapper.setProps( { isReadOnly: true, label: 'Tekeli-li' } );

                expect( () => driver.blur() ).toThrow( expectedError );
            } );

            test( 'does not call simulate( event ) when isReadOnly', () =>
            {
                const onBlur = jest.fn();
                wrapper.setProps( {
                    onBlur,
                    isReadOnly : true,
                    label      : 'Tekeli-li',
                } );

                try
                {
                    driver.blur();
                }
                catch ( error )
                {
                    expect( onBlur ).not.toBeCalled();
                }
            } );
        } );


        describe( 'isLoading', () =>
        {
            test( 'throws the expected error when isLoading', () =>
            {
                const expectedError =
                    'Button \'Tekeli-li\' cannot have blur since it is loading';
                wrapper.setProps( { isLoading: true, label: 'Tekeli-li' } );

                expect( () => driver.blur() ).toThrow( expectedError );
            } );

            test( 'does not call simulate( event ) when isLoading', () =>
            {
                const onBlur = jest.fn();
                wrapper.setProps( {
                    onBlur,
                    isLoading : true,
                    label     : 'Tekeli-li',
                } );

                try
                {
                    driver.blur();
                }
                catch ( error )
                {
                    expect( onBlur ).not.toBeCalled();
                }
            } );
        } );
    } );


    describe( 'focus()', () =>
    {
        test( 'should trigger onFocus callback prop once', () =>
        {
            const onFocus = jest.fn();
            wrapper.setProps( { onFocus } );

            driver.focus();
            expect( onFocus ).toBeCalledTimes( 1 );
        } );


        describe( 'isDisabled', () =>
        {
            test( 'throws the expected error when isDisabled', () =>
            {
                const expectedError = 'Button \'Tekeli-li\' cannot have focus \
since it is disabled';
                wrapper.setProps( { isDisabled: true, label: 'Tekeli-li' } );

                expect( () => driver.focus() ).toThrow( expectedError );
            } );

            test( 'does not call simulate( event ) when isDisabled', () =>
            {
                const onFocus = jest.fn();
                wrapper.setProps( {
                    onFocus,
                    isDisabled : true,
                    label      : 'Tekeli-li',
                } );

                try
                {
                    driver.focus();
                }
                catch ( error )
                {
                    expect( onFocus ).not.toBeCalled();
                }
            } );
        } );


        describe( 'isReadOnly', () =>
        {
            test( 'throws the expected error when isReadOnly', () =>
            {
                const expectedError = 'Button \'Tekeli-li\' cannot have focus \
since it is read only';
                wrapper.setProps( { isReadOnly: true, label: 'Tekeli-li' } );

                expect( () => driver.focus() ).toThrow( expectedError );
            } );

            test( 'does not call simulate( event ) when isReadOnly', () =>
            {
                const onFocus = jest.fn();
                wrapper.setProps( {
                    onFocus,
                    isReadOnly : true,
                    label      : 'Tekeli-li',
                } );

                try
                {
                    driver.focus();
                }
                catch ( error )
                {
                    expect( onFocus ).not.toBeCalled();
                }
            } );
        } );


        describe( 'isLoading', () =>
        {
            test( 'throws the expected error when isLoading', () =>
            {
                const expectedError = 'Button \'Tekeli-li\' cannot have focus \
since it is loading';
                wrapper.setProps( { isLoading: true, label: 'Tekeli-li' } );

                expect( () => driver.focus() ).toThrow( expectedError );
            } );

            test( 'does not call simulate( event ) when isLoading', () =>
            {
                const onFocus = jest.fn();
                wrapper.setProps( {
                    onFocus,
                    isLoading : true,
                    label     : 'Tekeli-li',
                } );

                try
                {
                    driver.focus();
                }
                catch ( error )
                {
                    expect( onFocus ).not.toBeCalled();
                }
            } );
        } );
    } );
} );
