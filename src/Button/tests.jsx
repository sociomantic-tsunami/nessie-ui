/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

/* eslint-disable no-magic-numbers, no-multi-str, no-unused-expressions */
/* global jest test */

import React              from 'react';
import { mount, shallow } from 'enzyme';

import { Icon, Spinner }  from '../index';

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

    test( 'should be an instance of StatelessComponent', () =>
    {
        expect( instance.constructor.name ).toBe( 'StatelessComponent' );
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
        } );

        describe( 'isLoading', () =>
        {
            test( 'should be false by default', () =>
            {
                expect( instance.props.isLoading ).toBe( false );
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

        test( 'should have the button clicked once', () =>
        {
            wrapper.setProps( { onClick: clickSpy } );
            driver.click();

            expect( clickSpy ).toBeCalledTimes( 1 );
        } );

        test( 'click on a disabled button should produce an error', () =>
        {
            const expectedError =
                'Button \'Pikaboo\' cannot be clicked since it is disabled';

            wrapper.setProps( {
                label      : 'Pikaboo',
                isDisabled : true,
                onClick    : clickSpy,
            } );

            expect( () => driver.click() )
                .toThrow( expectedError );
            expect( clickSpy ).toHaveBeenCalledTimes( 0 );
        } );

        test( 'click on a loading button should produce an error', () =>
        {
            wrapper.setProps( {
                label     : 'Pikaboo',
                isLoading : true,
                onClick   : clickSpy,
            } );

            const expectedError =
                'Button \'Pikaboo\' cannot be clicked since it is loading';

            expect( () => driver.click() )
                .toThrow( expectedError );
            expect( clickSpy ).toHaveBeenCalledTimes( 0 );
        } );
    } );
} );
