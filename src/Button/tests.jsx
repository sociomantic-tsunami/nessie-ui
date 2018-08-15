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
        test( 'calls the onMouseOver callback prop', () =>
        {
            const onMouseOver = jest.fn();
            wrapper.setProps( { onMouseOver } );

            instance.handleMouseOver();

            expect( onMouseOver ).toBeCalledTimes( 1 );
        } );

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
        test( 'calls the onMouseOver callback prop', () =>
        {
            const onMouseOut = jest.fn();
            wrapper.setProps( { onMouseOut } );

            instance.handleMouseOut();

            expect( onMouseOut ).toBeCalledTimes( 1 );
        } );

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
    let simulate;

    beforeEach( () =>
    {
        wrapper  = mount( <Button /> );
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


        describe( 'isLoading', () =>
        {
            test( 'throws the expected error when isLoading', () =>
            {
                wrapper.setProps( { isLoading: true, label: 'Pikaboo'  } );

                const expectedError = 'Button \'Pikaboo\' cannot be clicked \
since it is loading';

                expect( () => driver.click() ).toThrow( expectedError );
            } );

            test( 'does not call simulate( event ) when isLoading', () =>
            {
                wrapper.setProps( { isLoading: true, label: 'Pikaboo'  } );

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


        describe( 'isLoading', () =>
        {
            test( 'throws the expected error when isLoading', () =>
            {
                wrapper.setProps( { isLoading: true, label: 'Tekeli-li' } );

                const expectedError = 'Button \'Tekeli-li\' cannot have \
onMouseOver since it is loading';

                expect( () => driver.mouseOver() ).toThrow( expectedError );
            } );

            test( 'does not call simulate( event ) when isLoading', () =>
            {
                wrapper.setProps( { isLoading: true, label: 'Tekeli-li' } );

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


        describe( 'isLoading', () =>
        {
            test( 'throws the expected error when isLoading', () =>
            {
                wrapper.setProps( { isLoading: true, label: 'Tekeli-li' } );

                const expectedError = 'Button \'Tekeli-li\' cannot have \
onMouseOut since it is loading';

                expect( () => driver.mouseOut() ).toThrow( expectedError );
            } );

            test( 'does not call simulate( event ) when isLoading', () =>
            {
                wrapper.setProps( { isLoading: true, label: 'Tekeli-li' } );

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


        describe( 'isLoading', () =>
        {
            test( 'throws the expected error when isLoading', () =>
            {
                wrapper.setProps( { isLoading: true, label: 'Tekeli-li'  } );

                const expectedError =
                    'Button \'Tekeli-li\' cannot have blur since it is loading';

                expect( () => driver.blur() ).toThrow( expectedError );
            } );

            test( 'does not call simulate( event ) when isLoading', () =>
            {
                wrapper.setProps( { isLoading: true, label: 'Tekeli-li'  } );

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


        describe( 'isLoading', () =>
        {
            test( 'throws the expected error when isLoading', () =>
            {
                wrapper.setProps( { isLoading: true, label: 'Tekeli-li'  } );

                const expectedError = 'Button \'Tekeli-li\' cannot have focus \
since it is loading';

                expect( () => driver.focus() ).toThrow( expectedError );
            } );

            test( 'does not call simulate( event ) when isLoading', () =>
            {
                wrapper.setProps( { isLoading: true, label: 'Tekeli-li'  } );

                expect( () => driver.focus() );
                expect( simulate ).not.toBeCalled();
            } );
        } );
    } );
} );
