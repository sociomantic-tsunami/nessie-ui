/* global jest test */
/* eslint no-console: 0 */
/* eslint-disable no-magic-numbers, no-multi-str, no-unused-expressions */

import React                from 'react';
import { shallow, mount }   from 'enzyme';

import { Fieldset }         from '../index';

describe( 'Fieldset', () =>
{
    let wrapper;
    let instance;

    beforeEach( () =>
    {
        wrapper  = shallow( <Fieldset /> );
        instance = wrapper.instance();
    } );

    describe( 'render()', () =>
    {
        test( 'should contain exactly one Fieldset', () =>
        {
            expect( wrapper ).toHaveLength( 1 );
        } );
    } );

    describe( 'props', () =>
    {
        let props;

        beforeEach( () =>
        {
            ( { props } = instance );
        } );

        describe( 'hasError', () =>
        {
            test( 'should be false by default', () =>
            {
                expect( props.hasError ).toBeFalsy();
            } );
        } );

        describe( 'isDisabled', () =>
        {
            test( 'should be undefined by default', () =>
            {
                expect( props.isDisabled ).toBeUndefined();
            } );
        } );

        describe( 'onMouseOut', () =>
        {
            test( 'should be undefined by default', () =>
            {
                expect( props.onMouseOut ).toBeUndefined();
            } );
        } );

        describe( 'onMouseOver', () =>
        {
            test( 'should be undefined by default', () =>
            {
                expect( props.onMouseOver ).toBeUndefined();
            } );
        } );
    } );
} );


describe( 'FieldsetDriver', () =>
{
    let wrapper;
    let driver;

    beforeEach( () =>
    {
        wrapper  = mount( <Fieldset /> );
        driver   = wrapper.driver();
    } );


    describe( 'mouseOver()', () =>
    {
        test( 'should trigger onMouseEnter callback once', () =>
        {
            const onMouseOver = jest.fn();

            wrapper.setProps( { onMouseOver } );

            driver.mouseOver();

            expect( onMouseOver ).toBeCalledTimes( 1 );
        } );


        describe( 'isDisabled', () =>
        {
            test( 'should throw the expected error when isDisabled', () =>
            {
                const expectedError =
                    'Cannot trigger onMouseOver because it is disabled';

                wrapper.setProps( { isDisabled: true } );

                expect( () => driver.mouseOver() ).toThrow( expectedError );
            } );

            test( 'does not call simulate( event ) when isDisabled', () =>
            {
                const simulate = jest.spyOn( wrapper.find( `.${wrapper.props()
                    .cssMap.hour}` ), 'simulate' );

                wrapper.setProps( { isDisabled: true } );

                expect( () => driver.mouseOver() );
                expect( simulate ).not.toBeCalled();
            } );
        } );
    } );


    describe( 'mouseOut()', () =>
    {
        test( 'should trigger onMouseEnter callback once', () =>
        {
            const onMouseOut = jest.fn();

            wrapper.setProps( { onMouseOut } );

            driver.mouseOut();

            expect( onMouseOut ).toBeCalledTimes( 1 );
        } );


        describe( 'isDisabled', () =>
        {
            test( 'should throw the expected error when isDisabled', () =>
            {
                const expectedError =
                    'Cannot trigger onMouseOut because it is disabled';

                wrapper.setProps( { isDisabled: true } );

                expect( () => driver.mouseOut() ).toThrow( expectedError );
            } );

            test( 'does not call simulate( event ) when isDisabled', () =>
            {
                const simulate = jest.spyOn( wrapper.find( `.${wrapper.props()
                    .cssMap.hour}` ), 'simulate' );

                wrapper.setProps( { isDisabled: true } );

                expect( () => driver.mouseOut() );
                expect( simulate ).not.toBeCalled();
            } );
        } );
    } );
} );
