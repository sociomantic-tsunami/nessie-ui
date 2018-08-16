import React              from 'react';
import { shallow, mount } from 'enzyme';

import { Icon }           from '../index';

import IconButton         from './index';


describe( 'IconButton', () =>
{
    let wrapper;
    let instance;

    beforeEach( () =>
    {
        wrapper  = shallow( <IconButton /> );
        instance = wrapper.instance();
    } );

    describe( 'constructor( props )', () =>
    {
        test( 'should have name IconButton', () =>
        {
            expect( instance.constructor.name ).toBe( 'IconButton' );
        } );
    } );

    describe( 'render()', () =>
    {
        test( 'should contain exactly one Icon', () =>
        {
            expect( wrapper.find( Icon ) ).toHaveLength( 1 );
        } );
    } );

    describe( 'props', () =>
    {
        describe( 'iconTheme', () =>
        {
            test( 'should be "control" by default', () =>
            {
                expect( instance.props.iconTheme ).toBe( 'control' );
            } );

            test( 'should be passed to the Icon as theme', () =>
            {
                wrapper.setProps( { iconTheme: 'light' } );
                expect( wrapper.find( Icon ).prop( 'theme' ) ).toBe( 'light' );
            } );
        } );

        describe( 'iconSize', () =>
        {
            test( 'should be "S" by default', () =>
            {
                expect( instance.props.iconSize ).toBe( 'S' );
            } );

            test( 'should be passed to the Icon as size', () =>
            {
                wrapper.setProps( { iconSize: 'L' } );
                expect( wrapper.find( Icon ).prop( 'size' ) ).toBe( 'L' );
            } );
        } );

        describe( 'iconType', () =>
        {
            test( 'should be undefiend by default', () =>
            {
                expect( instance.props.iconType ).toBeUndefined();
            } );

            test( 'should be passed to the Icon as type', () =>
            {
                wrapper.setProps( { iconType: 'add' } );
                expect( wrapper.find( Icon ).prop( 'type' ) ).toBe( 'add' );
            } );
        } );
    } );
} );

describe( 'IconButtonDriver', () =>
{
    let wrapper;
    let driver;
    let simulate;

    beforeEach( () =>
    {
        wrapper = mount( <IconButton /> );
        driver  = wrapper.driver();
        simulate = jest.spyOn( driver.button, 'simulate' );
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
