/* global test */
/* eslint-disable no-magic-numbers, no-multi-str, no-unused-expressions */

import React           from 'react';
import { shallow }     from 'enzyme';

import { Icon }        from '../index';

import NotificationBar from './index';

describe( 'NotificationBar', () =>
{
    let wrapper;

    beforeEach( () =>
    {
        wrapper = shallow( <NotificationBar /> );
    } );

    test( 'should contain an Icon', () =>
    {
        expect( wrapper.find( Icon ) ).toHaveLength( 1 );
    } );
} );
