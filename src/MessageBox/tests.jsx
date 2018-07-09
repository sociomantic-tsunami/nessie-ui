/* eslint-env node, mocha */
/* global expect */
/* eslint no-console: 0*/
/* eslint-disable no-magic-numbers */

import React                      from 'react';
import { mount }                  from 'enzyme';


import MessageBox                 from './index';

describe( 'MessageBox', () =>
{
    let Wrapper;

    beforeEach( () =>
{
        Wrapper = mount( <MessageBox /> );
    } );

    it( 'should have its component name and hash as default className', () =>
{
        expect( Wrapper.find( '.messageBox__default' ) ).to.have.length( 1 );
    } );
} );
