/* global test */
/* eslint no-console: 0 */
/* eslint-disable no-magic-numbers, no-multi-str, no-unused-expressions */

import React          from 'react';
import { shallow }    from 'enzyme';

import { Fieldset }   from '../index';


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
