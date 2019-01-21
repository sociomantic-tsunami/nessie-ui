/*
 * Copyright (c) 2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

/* eslint-disable no-magic-numbers */

import React                    from 'react';
import { shallow, mount }       from 'enzyme';

import { Tab, TabButton, Tabs } from '../index';

describe( 'Tabs', () =>
{
    let wrapper;

    beforeEach( () =>
    {
        wrapper = shallow( <Tabs /> );
    } );

    describe( 'render()', () =>
    {
        test( 'should accept a single Tab as children', () =>
        {
            wrapper.setProps( { children: <Tab /> } );
            expect( wrapper.find( TabButton ) ).toHaveLength( 1 );
        } );

        test( 'should accept an array of Tabs as children', () =>
        {
            wrapper.setProps( { children: [ <Tab />, <Tab /> ] } );
            expect( wrapper.find( TabButton ) ).toHaveLength( 2 );
        } );
    } );
} );


describe( 'TabsDriver', () =>
{
    let wrapper;
    let driver;

    beforeEach( () =>
    {
        wrapper = mount( <Tabs /> );
        driver  = wrapper.driver();
    } );

    describe( 'clickTab( index )', () =>
    {
        test( 'should trigger onClickTab callback prop once on TabButton at \
index', () =>
        {
            const onClickTab = jest.fn();
            wrapper.setProps( {
                onClickTab,
                children : [
                    <Tab label = "Tabity" />,
                    <Tab label = "Taby" />,
                ],
            } );

            driver.clickTab( 1 );
            expect( onClickTab ).toBeCalledTimes( 1 );
        } );

        test(
            'should throw an expected error if Tab is disabled',
            () =>
            {
                wrapper.setProps( {
                    children : [
                        <Tab label = "Tabity" isDisabled />,
                        <Tab label = "Taby" />,
                    ],
                } );

                expect( () => driver.clickTab( 0 ) ).toThrowError( 'TabButton \
cannot be clicked because it is disabled' );
            },
        );
    } );
} );
