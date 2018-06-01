/* eslint-env node, mocha */
/* global expect */
/* eslint no-console: 0*/


import React        from 'react';
import { shallow }  from 'enzyme';

import ScrollBar    from './index';

describe( 'ScrollBar', () =>
{
    let wrapper;
    let instance;

    beforeEach( () =>
    {
        wrapper = shallow( <ScrollBar /> );
        instance = wrapper.instance();
    } );


    it( 'should contain exactly one <div>', () => {
        expect( wrapper.find( 'div' ).length ).to.equal( 1 )
    } );

    it( 'should contain exactly one <input>', () =>
    {
        expect( wrapper.find( 'input' ).length ).to.equal( 1 )
    } );

    it( '<input> has type="range"', () =>
    {
        expect( wrapper.find( 'input' ).first().prop( 'type' ) ).to.equal( 'range' );
    } );

    describe( 'scrollPos', () =>
    {
        it( 'should have a value of 0 as default', () =>
        {
            expect( instance.props.scrollPos ).to.equal( 0 );
        } );

        it( 'should be passed to the <input> as value prop', () =>
        {
            wrapper.setProps( { scrollPos: 20 } );
            expect( wrapper.find( 'input' ).first().prop( 'value' ) )
                .to.equal( 20 );
        } )
    } )

    describe( 'onChange', () =>
    {
        it( 'should be undefined by default', () =>
        {
            expect( instance.props.onChange ).to.be.undefined;
        } );

        it( 'should be invoked when <input>’s onChange prop is invoked', () =>
        {
            const onChange = sinon.spy();
            wrapper.setProps( { onChange } );

            const inputOnChange =
                wrapper.find( 'input' ).first().prop( 'onChange' );

            inputOnChange( {
                target: {}
            } );

            expect( onChange.calledOnce ).to.be.true;
        } );
    } )

    describe( 'scrollMin', () =>
    {
        it( 'should have a value of 0 as default', () =>
        {
            expect( instance.props.scrollMin ).to.equal( 0 );
        } );

        it( 'should be passed to the <input> as min prop', () =>
        {
            wrapper.setProps( { scrollMin: 20 } );
            expect( wrapper.find( 'input' ).first().prop( 'min' ) )
                .to.equal( 20 );
        } )
    } );

    describe( 'scrollMax', () =>
    {
        it( 'should be undefined by default', () =>
        {
            expect( instance.props.scrollMax ).to.be.undefined;
        } );

        it( 'should be passed to the <input> as max prop', () =>
        {
            wrapper.setProps( { scrollMax: 20 } );
            expect( wrapper.find( 'input' ).first().prop( 'max' ) )
                .to.equal( 20 );
        } )
    } );
} );
