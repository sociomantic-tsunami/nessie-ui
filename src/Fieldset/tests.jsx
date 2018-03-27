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

            it( 'should be passed to the Fieldset', () =>
            {
                wrapper.setProps( { hasError: true } );

                expect( wrapper.find( Fieldset ).prop( 'hasError' ) ).to.be
                    .true;
            } );
        } );

        describe( 'isDisabled', () =>
        {
            it( 'should be undefined by default', () =>
            {
                expect( props.isDisabled ).to.be.undefined;
            } );

            it( 'should be passed to the Fieldset', () =>
            {
                wrapper.setProps( { isDisabled: true } );

                expect( wrapper.find( Fieldset ).prop( 'isDisabled' ) ).to.be
                    .true;
            } );
        } );

        describe( 'onMouseOut', () =>
        {
            it( 'should be undefined by default', () =>
            {
                expect( props.onMouseOut ).to.be.undefined;
            } );

            it( 'should be passed to the Fieldset', () =>
            {
                const onMouseOut = () => undefined;

                wrapper.setProps( { onMouseOut } );

                expect( wrapper.find( Fieldset ).prop( 'onMouseOut' ) ).to
                    .equal( onMouseOut );
            } );
        } );

        describe( 'onMouseOver', () =>
        {
            it( 'should be undefined by default', () =>
            {
                expect( props.onMouseOver ).to.be.undefined;
            } );

            it( 'should be passed to the Fieldset', () =>
            {
                const onMouseOver = () => undefined;

                wrapper.setProps( { onMouseOver } );

                expect( wrapper.prop( 'onMouseOver' ) ).to
                    .equal( onMouseOver );
            } );
        } );
    } );
} );
