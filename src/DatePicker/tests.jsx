/*
 * Copyright (c) 2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

/* global jest test */
/* eslint-disable no-magic-numbers, no-multi-str, no-unused-expressions, max-len */

import React      from 'react';
import { mount }  from 'enzyme';

import DatePicker from './index';


describe( 'DatePickerDriver', () =>
{
    let wrapper;

    beforeEach( () =>
    {
        wrapper = mount( <DatePicker /> );
    } );


    describe( 'clickItem', () =>
    {
        test( 'should simulate and trigger onClickItem() once', () =>
        {
            const onClickItem = jest.fn();
            wrapper.setProps( {
                onClickItem,
                label   : 'January 2000',
                headers : [
                    { label: 'Mon', title: 'Monday' },
                    { label: 'Tue', title: 'Tuesday' },
                    { label: 'Wed', title: 'Wednesday' },
                    { label: 'Thu', title: 'Thursday' },
                    { label: 'Fri', title: 'Friday' },
                    { label: 'Sat', title: 'Saturday' },
                    { label: 'Sun', title: 'Sunday' },
                ],
                items : [
                    [
                        {
                            label      : '01',
                            value      : '1',
                            isCurrent  : false,
                            isSelected : false,
                        },
                        {
                            label      : '02',
                            value      : '2',
                            isCurrent  : false,
                            isSelected : false,
                        },
                        {
                            label      : '03',
                            value      : '3',
                            isCurrent  : false,
                            isSelected : false,
                        },
                        {
                            label      : '04',
                            value      : '4',
                            isCurrent  : false,
                            isSelected : false,
                        },
                        {
                            label      : '05',
                            value      : '5',
                            isCurrent  : true,
                            isSelected : true,
                        },
                        {
                            label      : '06',
                            value      : '6',
                            isCurrent  : false,
                            isSelected : false,
                        },
                        {
                            label      : '07',
                            value      : '7',
                            isCurrent  : false,
                            isSelected : false,
                        },
                    ],
                    [
                        {
                            label      : '08',
                            value      : '8',
                            isCurrent  : false,
                            isSelected : false,
                        },
                        {
                            label      : '09',
                            value      : '9',
                            isCurrent  : false,
                            isSelected : false,
                        },
                        {
                            label      : '10',
                            value      : '10',
                            isCurrent  : false,
                            isSelected : false,
                        },
                        {
                            label      : '11',
                            value      : '11',
                            isCurrent  : false,
                            isSelected : false,
                        },
                        {
                            label      : '12',
                            value      : '12',
                            isCurrent  : false,
                            isSelected : false,
                        },
                        {
                            label      : '13',
                            value      : '13',
                            isCurrent  : false,
                            isSelected : false,
                        },
                        {
                            label      : '14',
                            value      : '14',
                            isCurrent  : false,
                            isSelected : false,
                        },
                    ],
                ],
            } );

            wrapper.driver().clickItem();

            expect( onClickItem ).toBeCalledTimes( 1 );
        } );
    } );

    describe( 'clickNext', () =>
    {
        test( 'should simulate and trigger onClickNext() once', () =>
        {
            const onClickNext = jest.fn();
            wrapper.setProps( { onClickNext } );

            wrapper.driver().clickNext();

            expect( onClickNext ).toBeCalledTimes( 1 );
        } );
    } );

    describe( 'clickPrev', () =>
    {
        test( 'should simulate and trigger onClickPrev() once', () =>
        {
            const onClickPrev = jest.fn();
            wrapper.setProps( { onClickPrev } );

            wrapper.driver().clickPrev();

            expect( onClickPrev ).toBeCalledTimes( 1 );
        } );
    } );
} );
