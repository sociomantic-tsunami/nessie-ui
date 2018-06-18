/* eslint-env node, mocha */
/* global expect */
/* eslint no-console: 0*/
/* eslint-disable no-magic-numbers  */


// Uncomment the following lines to use the react test utilities
import React                      from 'react';
// const TestUtils = React.addons.TestUtils;
import { mount }                  from 'enzyme';


import ProgressIndicator          from './index';

describe( 'ProgressIndicator', () =>
{
    let Wrapper;

    beforeEach(() =>
{
        Wrapper = mount( <ProgressIndicator /> );
    });

    test('should have its component name as default className', () =>
{
        expect( Wrapper.find( '.progressIndicator__default' ) ).toHaveLength(1);
    });
    test('should contain a ProgressIndicator', () =>
{
        expect( Wrapper.find( ProgressIndicator ) ).toHaveLength(1);
    });
} );
