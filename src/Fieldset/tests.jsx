/* eslint-env node, mocha */
/* eslint no-console: 0 */
/* eslint-disable no-magic-numbers, no-multi-str, no-unused-expressions */

import React          from 'react';
import { mount }      from 'enzyme';

import { Fieldset }   from '../index';


describe( 'Fieldset', () =>
{
    let wrapper;
    let instance;

    beforeEach( () =>
    {
        wrapper  = mount( <Fieldset /> );
        instance = wrapper.instance();
    } );

    describe( 'render()', () =>
    {
        it( 'should contain exactly one Fieldset', () =>
        {
            expect( wrapper ).to.have.length( 1 );
        } );
    } );

    describe( 'props', () =>
    {
        let props;

        beforeEach( () =>
        {
            props = instance.props;
        } );

        describe( 'hasError', () =>
        {
            it( 'should be false by default', () =>
            {
                expect( props.hasError ).to.be.false;
            } );
        } );

        describe( 'isDisabled', () =>
        {
            it( 'should be undefined by default', () =>
            {
                expect( props.isDisabled ).to.be.undefined;
            } );
        } );

        describe( 'onMouseOut', () =>
        {
            it( 'should be undefined by default', () =>
            {
                expect( props.onMouseOut ).to.be.undefined;
            } );
        } );

        describe( 'onMouseOver', () =>
        {
            it( 'should be undefined by default', () =>
            {
                expect( props.onMouseOver ).to.be.undefined;
            } );
        } );
    } );
} );
