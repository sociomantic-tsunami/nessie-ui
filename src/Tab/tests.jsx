/* global test jest */

import React       from 'react';
import { mount }   from 'enzyme';

import Tab         from './index';

describe( 'SwitchDriver', () =>
{
    let wrapper;
    let driver;

    beforeEach( () =>
    {
        wrapper  = mount( <Tab /> );
        driver  = wrapper.driver();
    } );

    describe( 'click()', () =>
    {
        test( 'should trigger onClick callback function', () =>
        {
            const onClick = jest.fn();

            wrapper.setProps( { onClick } );

            driver.click();

            expect( onClick ).toBeCalled();
        } );
    } );
} );
