/* eslint-env node, mocha */
/* global expect */
/* eslint no-console: 0*/
/* eslint-disable no-magic-numbers, no-multi-str, no-unused-expressions */


import React            from 'react';
import { mount }        from 'enzyme';

import NotificationBar  from './index';

describe( 'NotificationBar', () =>
{
    let Wrapper;

    beforeEach( () =>
{
        Wrapper = mount( <NotificationBar /> );
    } );

    it( 'should have its component name and hash as default className', () =>
{
        expect( Wrapper.find( '.notificationBar__default' ) )
            .to.have.length( 1 );
    } );
} );
