/*
 * Copyright (c) 2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

/* global test */
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
    } );
} );
