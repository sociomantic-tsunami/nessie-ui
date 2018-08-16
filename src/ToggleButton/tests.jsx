/* eslint-disable no-magic-numbers, no-multi-str, no-unused-expressions */

import React               from 'react';
import { shallow, mount }  from 'enzyme';

import { Icon }            from '../index';

import ToggleButton        from './index';


describe( 'ToggleToggleButton', () =>
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
    let simulate;

    beforeEach( () =>
    {
        wrapper  = mount( <ToggleButton /> );
        driver   = wrapper.driver();
        button   = wrapper.find( 'button' ).first();
        simulate = jest.spyOn( driver.button, 'simulate' );
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
        test( 'calls simulate( event ) exactly once on the <button>', () =>
        {
            driver.click();
            expect( simulate ).toBeCalledTimes( 1 );
        } );

        test( 'calls simulate( event ) with event \'click\'', () =>
        {
            driver.click();
            expect( simulate ).toBeCalledWith( 'click' );
        } );

        test( 'returns the driver instance', () =>
        {
            expect( driver.click() ).toEqual( driver );
        } );


        describe( 'isDisabled', () =>
        {
            test( 'throws the expected error when isDisabled', () =>
            {
                wrapper.setProps( { isDisabled: true, label: 'Pikaboo' } );

                const expectedError =
                    'Button \'Pikaboo\' cannot be clicked since it is disabled';

                expect( () => driver.click() ).toThrow( expectedError );
            } );

            test( 'does not call simulate( event ) when isDisabled', () =>
            {
                wrapper.setProps( { isDisabled: true, label: 'Pikaboo' } );

                expect( () => driver.click() );
                expect( simulate ).not.toBeCalled();
            } );
        } );


        describe( 'isReadOnly', () =>
        {
            test( 'throws the expected error when isReadOnly', () =>
            {
                wrapper.setProps( { isReadOnly: true, label: 'Tekeli-li' } );

                const expectedError = 'Button \'Tekeli-li\' cannot be clicked \
since it is read only';

                expect( () => driver.click() ).toThrow( expectedError );
            } );

            test( 'does not call simulate( event ) when isReadOnly', () =>
            {
                wrapper.setProps( { isReadOnly: true, label: 'Tekeli-li' } );

                expect( () => driver.click() );
                expect( simulate ).not.toBeCalled();
            } );
        } );
    } );


    describe( 'mouseOver()', () =>
    {
        test( 'calls simulate( event ) exactly once on the <button>', () =>
        {
            driver.mouseOver();
            expect( simulate ).toBeCalledTimes( 1 );
        } );

        test( 'calls simulate( event ) with event \'mouseenter\'', () =>
        {
            driver.mouseOver();
            expect( simulate ).toBeCalledWith( 'mouseenter' );
        } );

        test( 'returns the driver instance', () =>
        {
            expect( driver.click() ).toEqual( driver );
        } );


        describe( 'isDisabled', () =>
        {
            test( 'throws the expected error when isDisabled', () =>
            {
                wrapper.setProps( { isDisabled: true, label: 'Tekeli-li' } );

                const expectedError = 'Button \'Tekeli-li\' cannot have \
onMouseOver since it is disabled';

                expect( () => driver.mouseOver() ).toThrow( expectedError );
            } );

            test( 'does not call simulate( event ) when isDisabled', () =>
            {
                wrapper.setProps( { isDisabled: true, label: 'Tekeli-li' } );

                expect( () => driver.mouseOver() );
                expect( simulate ).not.toBeCalled();
            } );
        } );
    } );


    describe( 'mouseOut()', () =>
    {
        test( 'calls simulate( event ) exactly once on the <button>', () =>
        {
            driver.mouseOut();
            expect( simulate ).toBeCalledTimes( 1 );
        } );

        test( 'calls simulate( event ) with event \'mouseleave\'', () =>
        {
            driver.mouseOut();
            expect( simulate ).toBeCalledWith( 'mouseleave' );
        } );

        test( 'returns the driver instance', () =>
        {
            expect( driver.click() ).toEqual( driver );
        } );


        describe( 'isDisabled', () =>
        {
            test( 'throws the expected error when isDisabled', () =>
            {
                wrapper.setProps( { isDisabled: true, label: 'Tekeli-li' } );

                const expectedError = 'Button \'Tekeli-li\' cannot have \
onMouseOut since it is disabled';

                expect( () => driver.mouseOut() ).toThrow( expectedError );
            } );

            test( 'does not call simulate( event ) when isDisabled', () =>
            {
                wrapper.setProps( { isDisabled: true, label: 'Tekeli-li' } );

                expect( () => driver.mouseOut() );
                expect( simulate ).not.toBeCalled();
            } );
        } );
    } );


    describe( 'blur()', () =>
    {
        test( 'calls simulate( event ) exactly once on the <button>', () =>
        {
            driver.blur();
            expect( simulate ).toBeCalledTimes( 1 );
        } );

        test( 'calls simulate( event ) with event \'blur\'', () =>
        {
            driver.blur();
            expect( simulate ).toBeCalledWith( 'blur' );
        } );

        test( 'returns the driver instance', () =>
        {
            expect( driver.click() ).toEqual( driver );
        } );


        describe( 'isDisabled', () =>
        {
            test( 'throws the expected error when isDisabled', () =>
            {
                wrapper.setProps( { isDisabled: true, label: 'Tekeli-li' } );

                const expectedError = 'Button \'Tekeli-li\' cannot have blur \
since it is disabled';

                expect( () => driver.blur() ).toThrow( expectedError );
            } );

            test( 'does not call simulate( event ) when isDisabled', () =>
            {
                wrapper.setProps( { isDisabled: true, label: 'Tekeli-li' } );

                expect( () => driver.blur() );
                expect( simulate ).not.toBeCalled();
            } );
        } );


        describe( 'isReadOnly', () =>
        {
            test( 'throws the expected error when isReadOnly', () =>
            {
                wrapper.setProps( { isReadOnly: true, label: 'Tekeli-li' } );

                const expectedError = 'Button \'Tekeli-li\' cannot have blur \
since it is read only';

                expect( () => driver.blur() ).toThrow( expectedError );
            } );

            test( 'does not call simulate( event ) when isReadOnly', () =>
            {
                wrapper.setProps( { isReadOnly: true, label: 'Tekeli-li' } );

                expect( () => driver.blur() );
                expect( simulate ).not.toBeCalled();
            } );
        } );
    } );


    describe( 'focus()', () =>
    {
        test( 'calls simulate( event ) exactly once on the <button>', () =>
        {
            driver.focus();
            expect( simulate ).toBeCalledTimes( 1 );
        } );

        test( 'calls simulate( event ) with event \'focus\'', () =>
        {
            driver.focus();
            expect( simulate ).toBeCalledWith( 'focus' );
        } );

        test( 'returns the driver instance', () =>
        {
            expect( driver.click() ).toEqual( driver );
        } );


        describe( 'isDisabled', () =>
        {
            test( 'throws the expected error when isDisabled', () =>
            {
                wrapper.setProps( { isDisabled: true, label: 'Tekeli-li' } );

                const expectedError = 'Button \'Tekeli-li\' cannot have focus \
since it is disabled';

                expect( () => driver.focus() ).toThrow( expectedError );
            } );

            test( 'does not call simulate( event ) when isDisabled', () =>
            {
                wrapper.setProps( { isDisabled: true, label: 'Tekeli-li' } );

                expect( () => driver.focus() );
                expect( simulate ).not.toBeCalled();
            } );
        } );


        describe( 'isReadOnly', () =>
        {
            test( 'throws the expected error when isReadOnly', () =>
            {
                wrapper.setProps( { isReadOnly: true, label: 'Tekeli-li' } );

                const expectedError = 'Button \'Tekeli-li\' cannot have focus \
since it is read only';

                expect( () => driver.focus() ).toThrow( expectedError );
            } );

            test( 'does not call simulate( event ) when isReadOnly', () =>
            {
                wrapper.setProps( { isReadOnly: true, label: 'Tekeli-li' } );

                expect( () => driver.focus() );
                expect( simulate ).not.toBeCalled();
            } );
        } );
    } );
} );
