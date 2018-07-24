/* eslint-disable no-magic-numbers, no-multi-str, no-unused-expressions */
/* global jest test */

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
        it( 'calls the onMouseOver callback prop', () =>
        {
            const onMouseOver = jest.fn();
            wrapper.setProps( { onMouseOver } );

            instance.handleMouseOver();

            expect( onMouseOver ).toBeCalledTimes( 1 );
        } );

        it( 'sets isHovered state to true', () =>
        {
            const onMouseOver = jest.fn();
            wrapper.setProps( { onMouseOver } );

            instance.handleMouseOver();

            expect( instance.state.isHovered ).toEqual( true );
        } );
    } );

    describe( 'handleMouseOut( e )', () =>
    {
        it( 'calls the onMouseOver callback prop', () =>
        {
            const onMouseOut = jest.fn();
            wrapper.setProps( { onMouseOut } );

            instance.handleMouseOut();

            expect( onMouseOut ).toBeCalledTimes( 1 );
        } );

        it( 'sets isHovered state to false', () =>
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
                    role     : 'control'
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
                    role     : 'control'
                } );

                expect( wrapper.find( Icon ).prop( 'theme' ) )
                    .toBe( 'control' );
            } );
        } );

        describe( 'onClick', () =>
        {
            it( 'is undefined by default', () =>
            {
                expect( instance.props.onClick ).toBeUndefined();
            } );

            it( 'is passed to <button>', () =>
            {
                const onClick = jest.fn();
                wrapper.setProps( { onClick } );

                expect( wrapper.find( 'button' ).prop( 'onClick' ) )
                    .toEqual( onClick );
            } );
        } );

        describe( 'onMouseOver', () =>
        {
            it( 'is undefined by default', () =>
            {
                expect( instance.props.onMouseOver ).toBeUndefined();
            } );
        } );

        describe( 'onMouseOut', () =>
        {
            it( 'is undefined by default', () =>
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
        it( 'assigns the <button> to this.button', () =>
        {
            expect( driver.button.getNode() ).toEqual( button.getNode() );
        } );
    } );

    describe( 'click', () =>
    {
        it( 'calls simulate( event ) exactly once on the <button>', () =>
        {
            driver.click();
            expect( simulate ).toBeCalledTimes( 1 );
        } );

        it( 'calls simulate( event ) with event \'click\'', () =>
        {
            driver.click();
            expect( simulate ).toBeCalledWith( 'click' );
        } );

        it( 'returns the driver instance', () =>
        {
            expect( driver.click() ).toEqual( driver );
        } );

        it( 'throws the expected error when isDisabled', () =>
        {
            wrapper.setProps( { isDisabled: true, label: 'Pikaboo' } );

            const expectedError =
                'Button \'Pikaboo\' cannot be clicked since it is disabled';

            expect( () => driver.click() ).toThrow( expectedError );
        } );

        it( 'does not call simulate( event ) when isDisabled', () =>
        {
            wrapper.setProps( { isDisabled: true, label: 'Pikaboo' } );

            expect( () => driver.click() );
            expect( simulate ).not.toBeCalled();
        } );

        it( 'throws the expected error when isLoading', () =>
        {
            wrapper.setProps( { isLoading: true, label: 'Pikaboo'  } );

            const expectedError =
                'Button \'Pikaboo\' cannot be clicked since it is loading';

            expect( () => driver.click() ).toThrow( expectedError );
        } );

        it( 'does not call simulate( event ) when isLoading', () =>
        {
            wrapper.setProps( { isLoading: true, label: 'Pikaboo'  } );

            expect( () => driver.click() );
            expect( simulate ).not.toBeCalled();
        } );
    } );

    describe( 'mouseOver', () =>
    {
        it( 'calls simulate( event ) exactly once on the <button>', () =>
        {
            driver.mouseOver();
            expect( simulate ).toBeCalledTimes( 1 );
        } );

        it( 'calls simulate( event ) with event \'mouseenter\'', () =>
        {
            driver.mouseOver();
            expect( simulate ).toBeCalledWith( 'mouseenter' );
        } );

        it( 'returns the driver instance', () =>
        {
            expect( driver.click() ).toEqual( driver );
        } );
    } );

    describe( 'mouseOut', () =>
    {
        it( 'calls simulate( event ) exactly once on the <button>', () =>
        {
            driver.mouseOut();
            expect( simulate ).toBeCalledTimes( 1 );
        } );

        it( 'calls simulate( event ) with event \'mouseleave\'', () =>
        {
            driver.mouseOut();
            expect( simulate ).toBeCalledWith( 'mouseleave' );
        } );

        it( 'returns the driver instance', () =>
        {
            expect( driver.click() ).toEqual( driver );
        } );
    } );


    describe( 'blur', () =>
    {
        it( 'calls simulate( event ) exactly once on the <button>', () =>
        {
            driver.blur();
            expect( simulate ).toBeCalledTimes( 1 );
        } );

        it( 'calls simulate( event ) with event \'blur\'', () =>
        {
            driver.blur();
            expect( simulate ).toBeCalledWith( 'blur' );
        } );

        it( 'returns the driver instance', () =>
        {
            expect( driver.click() ).toEqual( driver );
        } );
    } );

    describe( 'focus', () =>
    {
        it( 'calls simulate( event ) exactly once on the <button>', () =>
        {
            driver.focus();
            expect( simulate ).toBeCalledTimes( 1 );
        } );

        it( 'calls simulate( event ) with event \'focus\'', () =>
        {
            driver.focus();
            expect( simulate ).toBeCalledWith( 'focus' );
        } );

        it( 'returns the driver instance', () =>
        {
            expect( driver.click() ).toEqual( driver );
        } );
    } );
} );
