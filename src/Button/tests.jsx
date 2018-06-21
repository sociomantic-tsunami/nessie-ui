/* eslint-env node, mocha */
/* eslint-disable no-magic-numbers, no-multi-str, no-unused-expressions */
/* global expect */

import React              from 'react';
import { mount, shallow } from 'enzyme';
import jest               from 'jest';

import Css                from '../hoc/Css';
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

    describe( 'render()', () =>
    {
        test( 'should implement the Css injector component', () =>
        {
            expect( wrapper.find( Css ) ).toHaveLength( 1 );
        } );

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

    beforeEach( () =>
    {
        wrapper = mount( <Button /> );
        driver  = wrapper.driver();
    } );

    describe( 'click', () =>
    {
        let clickSpy;

        beforeEach( () =>
        {
            clickSpy = jest.fn();
        } );

        test( 'should have the button clicked', () =>
        {
            wrapper.setProps( { onClick: clickSpy } );
            driver.click();
            expect( clickSpy.calledOnce ).toBe( true );
        } );

        test( 'click on a disabled button should produce an error', () =>
        {
            wrapper.setProps( {
                label      : 'Pikaboo',
                isDisabled : true,
                onClick    : clickSpy
            } );

            const expectedError =
                'Button \'Pikaboo\' cannot be clicked since it is disabled';

            expect( () => driver.click() ).toThrowError( expectedError );
            expect( clickSpy.notCalled ).toBe( true );
        } );

        test( 'click on a loading button should produce an error', () =>
        {
            wrapper.setProps( {
                label     : 'Pikaboo',
                isLoading : true,
                onClick   : clickSpy
            } );

            const expectedError =
                'Button \'Pikaboo\' cannot be clicked since it is loading';

            expect( () => driver.click() ).toThrowError( expectedError );
            expect( clickSpy.notCalled ).toBe( true );
        } );
    } );
} );
