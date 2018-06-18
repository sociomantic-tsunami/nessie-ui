/* eslint-env node, mocha */
/* global expect */
/* eslint no-console: 0*/
/* eslint-disable no-magic-numbers*/

import React                      from 'react';
import { mount }                  from 'enzyme';

import Label                      from './index';

describe( 'Label', () =>
{
    let Wrapper;
    const props = {
        label : 'Boom'
    };
    beforeEach(() =>
{
        Wrapper = mount( <Label { ...props } /> );
    });

    test('should conatain a single label element', () =>
{
        expect( Wrapper.find( 'label' ) ).toHaveLength(1);
    });

    test('should have its component name and hash as default className', () =>
{
        expect( Wrapper.find( '.label__default' ) ).toHaveLength(1);
    });
} );
