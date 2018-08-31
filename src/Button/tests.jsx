/* eslint-disable no-magic-numbers, no-multi-str, no-unused-expressions */
/* global jest test */

import React              from 'react';
import { mount, shallow } from 'enzyme';

import { Icon, Spinner }  from '../index';

import Button             from './index';


describe( 'Button', () =>
{
    let wrapper;

    beforeEach( () =>
    {
        wrapper  = shallow( <Button /> );
    } );

    test( 'should a stateless functional component', () =>
    {
        expect( wrapper.instance() ).toBe( null );
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
                expect( Button.defaultProps.iconType ).toBe( 'none' );
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
                expect( Button.defaultProps.iconPosition ).toBe( 'left' );
            } );
        } );

        describe( 'role', () =>
        {
            test( 'should be "default" by default', () =>
            {
                expect( Button.defaultProps.role ).toBe( 'default' );
            } );
        } );

        describe( 'isLoading', () =>
        {
            test( 'should be false by default', () =>
            {
                expect( Button.defaultProps.isLoading ).toBe( false );
            } );
        } );

        describe( 'buttonRef', () =>
        {
            test( 'should be undefined by default', () =>
            {
                expect( Button.defaultProps.buttonRef ).toBeUndefined();
            } );
        } );
    } );
} );


describe( 'ButtonDriver', () =>
{
    let wrapper;

    beforeEach( () =>
    {
        wrapper = mount( <Button /> );
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
            wrapper.driver().click();

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

            expect( () => wrapper.driver().click() ).toThrow( expectedError );
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

            expect( () => wrapper.driver().click() ).toThrow( expectedError );
            expect( clickSpy ).toHaveBeenCalledTimes( 0 );
        } );
    } );
} );
