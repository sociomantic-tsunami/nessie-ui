/* eslint-disable no-magic-numbers, no-multi-str, no-unused-expressions */

import React               from 'react';
import { shallow, mount }  from 'enzyme';

import { Icon }            from '../index';

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

    test( '<button> should always have type "button"', () =>
    {
        expect( wrapper.find( 'button' ).prop( 'type' ) ).toEqual( 'button' );
    } );

    test( 'should contain an Icon when iconType is not "none"', () =>
    {
        wrapper.setProps( { iconType: 'add' } );
        expect( wrapper.find( Icon ) ).toHaveLength( 1 );
    } );

    describe( 'Icon', () =>
    {
        test( 'should always have size "M"', () =>
        {
            wrapper.setProps( { iconType: 'add' } );
            expect( wrapper.find( Icon ).first().prop( 'size' ) )
                .toEqual( 'S' );
        } );
    } );

    describe( 'props', () =>
    {
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
            test( 'should be undefined by default', () =>
            {
                expect( instance.props.id ).toBeUndefined();
            } );
        } );

        describe( 'iconPosition', () =>
        {
            test( 'should be "left" by default', () =>
            {
                expect( instance.props.iconPosition ).toEqual( 'left' );
            } );
        } );

        describe( 'isDisabled', () =>
        {
            test( 'should be false by default', () =>
            {
                expect( instance.props.isDisabled ).toEqual( false );
            } );

            test( 'should be passed to <button> as "disabled" when true', () =>
            {
                wrapper.setProps( { isDisabled: true } );
                expect( wrapper.prop( 'disabled' ) ).toEqual( true );
            } );
        } );

        describe( 'isReadOnly', () =>
        {
            test( 'should be false by default', () =>
            {
                expect( instance.props.isReadOnly ).toEqual( false );
            } );

            test( 'should be passed to <button> as "readOnly" when true', () =>
            {
                wrapper.setProps( { isReadOnly: true } );
                expect( wrapper.prop( 'readOnly' ) ).toEqual( true );
            } );
        } );

        describe( 'onClick', () =>
        {
            test( 'should be undefined by default', () =>
            {
                expect( instance.props.onClick ).toBeUndefined();
            } );

            test( 'should be passed to the <button> element', () =>
            {
                const onClick = jest.fn();
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

            test( 'should be passed to the <button>', () =>
            {
                const onFocus = jest.fn();
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

            test( 'should be passed to the <button> as onMouseEnter', () =>
            {
                const onMouseOver = jest.fn();
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

            test( 'should be passed to the <button> as onMouseLeave', () =>
            {
                const onMouseOut = jest.fn();
                wrapper.setProps( { onMouseOut } );
                expect( wrapper.prop( 'onMouseLeave' ) ).toEqual( onMouseOut );
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
        wrapper  = mount( <ToggleButton /> );
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

    describe( 'click', () =>
    {
        test( 'should trigger onClick callback prop once', () =>
        {
            const onClick = jest.fn();
            wrapper.setProps( { onClick } );

            driver.click();
            expect( onClick ).toBeCalledTimes( 1 );
        } );


        describe( 'isDisabled', () =>
        {
            test( 'throws the expected error when isDisabled', () =>
            {
                const expectedError =
                    'Button \'Cthulhu\' cannot onClick since it is disabled';
                wrapper.setProps( { isDisabled: true, label: 'Cthulhu' } );

                expect( () => driver.click() ).toThrow( expectedError );
            } );

            test( 'should not trigger onClick when isDisabled', () =>
            {
                const onClick = jest.fn();
                wrapper.setProps( { onClick, isDisabled: true } );

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
                const expectedError = 'Button \'Tekeli-li\' cannot onClick \
since it is read only';
                wrapper.setProps( { isReadOnly: true, label: 'Tekeli-li' } );

                expect( () => driver.click() ).toThrow( expectedError );
            } );

            test( 'should not trigger onClick when isReadOnly', () =>
            {
                const onClick = jest.fn();
                wrapper.setProps( { onClick, isReadOnly: true } );

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
                const expectedError = 'Button \'Tekeli-li\' cannot \
onMouseOver since it is disabled';
                wrapper.setProps( { isDisabled: true, label: 'Tekeli-li' } );

                expect( () => driver.mouseOver() ).toThrow( expectedError );
            } );

            test( 'should not trigger onMouseOver when isDisabled', () =>
            {
                const onMouseOver = jest.fn();
                wrapper.setProps( { onMouseOver, isDisabled: true } );

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
                wrapper.setProps( { isDisabled: true, label: 'Tekeli-li' } );

                const expectedError = 'Button \'Tekeli-li\' cannot \
onMouseOut since it is disabled';

                expect( () => driver.mouseOut() ).toThrow( expectedError );
            } );

            test( 'should not trigger onMouseOut when isDisabled', () =>
            {
                const onMouseOut = jest.fn();
                wrapper.setProps( { onMouseOut, isDisabled: true } );

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
                wrapper.setProps( { isDisabled: true, label: 'Tekeli-li' } );

                const expectedError = 'Button \'Tekeli-li\' cannot onBlur \
since it is disabled';

                expect( () => driver.blur() ).toThrow( expectedError );
            } );

            test( 'should not trigger onBlur when isDisabled', () =>
            {
                const onBlur = jest.fn();
                wrapper.setProps( { onBlur, isDisabled: true } );

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
                wrapper.setProps( { isReadOnly: true, label: 'Tekeli-li' } );

                const expectedError = 'Button \'Tekeli-li\' cannot onBlur \
since it is read only';

                expect( () => driver.blur() ).toThrow( expectedError );
            } );

            test( 'should not trigger onBlur when isReadOnly', () =>
            {
                const onBlur = jest.fn();
                wrapper.setProps( { onBlur, isReadOnly: true } );

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
                wrapper.setProps( { isDisabled: true, label: 'Tekeli-li' } );

                const expectedError = 'Button \'Tekeli-li\' cannot onFocus \
since it is disabled';

                expect( () => driver.focus() ).toThrow( expectedError );
            } );

            test( 'should not trigger onFocus when isDisabled', () =>
            {
                const onFocus = jest.fn();
                wrapper.setProps( { onFocus, isDisabled: true } );

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
                wrapper.setProps( { isReadOnly: true, label: 'Tekeli-li' } );

                const expectedError = 'Button \'Tekeli-li\' cannot onFocus \
since it is read only';

                expect( () => driver.focus() ).toThrow( expectedError );
            } );

            test( 'should not trigger onFocus when isReadOnly', () =>
            {
                const onFocus = jest.fn();
                wrapper.setProps( { onFocus, isReadOnly: true } );

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
