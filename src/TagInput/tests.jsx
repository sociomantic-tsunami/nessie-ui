/* eslint-env node, mocha */
/* global expect */
/* eslint-disable no-magic-numbers, no-multi-str, no-unused-expressions */

import React       from 'react';
import { shallow } from 'enzyme';

import { Tag }     from '../index';
import Css         from '../hoc/Css';

import TagInput    from './index';


describe( 'TagInput', () =>
{
    let wrapper;
    let instance;
    let cssMap;

    beforeEach( () =>
    {
        wrapper  = shallow( <TagInput /> );
        instance = wrapper.instance();
        cssMap   = instance.props.cssMap;
    } );

    describe( 'constructor( props )', () =>
    {
        it( 'should have name TagInput', () =>
        {
            expect( instance.constructor.name ).to.equal( 'TagInput' );
        } );
    } );

    describe( 'render()', () =>
    {
        it( 'should implement the Css injector component', () =>
        {
            expect( wrapper.find( Css ) ).to.have.length( 1 );
        } );

        it( 'should contain exactly one input', () =>
        {
            expect( wrapper.find( `.${cssMap.input}` ) ).to.have.length( 1 );
        } );
    } );

    it( 'should have Tag components when passed as children', () =>
    {
        wrapper.setProps( { children : [
            <Tag label = "TagLabel 1" />,
            <Tag label = "TagLabel 2" />
        ] } );

        expect( wrapper.find( Tag ) ).to.have.length( 2 );
    } );

    it( 'should have Tag components when passed as tags prop )', () =>
    {
        wrapper.setProps( {
            tags : [ 'TagLabelString 1', 'TagLabelString 2' ]
        } );

        expect( wrapper.find( Tag ) ).to.have.length( 2 );
    } );

    it( 'should only render Tag components as a children', () =>
    {
        wrapper.setProps( { children : [
            <Tag label = "TagLabel 1" />,
            <div className = "boo" />
        ] } );

        expect( wrapper.find( '.boo' ) ).to.have.length( 0 );
    } );

    it( 'should trigger onKeyPress callbacks when key pressed', () =>
    {
        const onKeyPress = sinon.spy();
        wrapper.setProps( { onKeyPress } );

        wrapper.find( `.${cssMap.input}` ).simulate( 'keyPress' );
        expect( onKeyPress.called ).to.be.true;
    } );

    describe( 'readOnly state', () =>
    {
        beforeEach( () =>
        {
            wrapper.setProps( { isReadOnly: true } );
        } );

        it( 'input should receive readonly', () =>
        {
            expect( wrapper.find( `.${cssMap.input}` ).prop( 'readOnly' ) )
                .to.be.true;
        } );
    } );
} );
