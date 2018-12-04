/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

/* eslint-disable no-magic-numbers */

import React              from 'react';
import { mount, shallow } from 'enzyme';

import { Form }           from '../index';

describe( 'Form', () =>
{
    let wrapper;

    beforeEach( () =>
    {
        wrapper  = shallow( <Form /> );
    } );

    describe( 'render()', () =>
    {
        test( 'should contain exactly one <form>', () =>
        {
            expect( wrapper.find( 'form' ) ).toHaveLength( 1 );
        } );
    } );

    describe( 'props', () =>
    {
        describe( 'onSubmit', () =>
        {
            test( 'should be passed to the <form>', () =>
            {
                const onSubmit = () => undefined;
                wrapper.setProps( { onSubmit } );
                expect( wrapper.find( 'form' ).prop( 'onSubmit' ) )
                    .toBe( onSubmit );
            } );
        } );
    } );
} );


describe( 'FormDriver', () =>
{
    let wrapper;

    beforeEach( () =>
    {
        wrapper = mount( <Form /> );
    } );

    describe( 'submit()', () =>
    {
        test( 'should fire the onSubmit callback prop once', () =>
        {
            const onSubmit = jest.fn();
            wrapper.setProps( { onSubmit } );

            wrapper.driver().submit();
            expect( onSubmit ).toBeCalledTimes( 1 );
        } );
    } );
} );
