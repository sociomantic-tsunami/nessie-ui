/* eslint-env node, mocha */
/* eslint-disable no-magic-numbers, no-multi-str, no-unused-expressions */
/* global expect */
/* eslint no-console: 0*/

import React       from 'react';
import { shallow } from 'enzyme';

import Css         from '../hoc/Css';

import CodeEditor  from './index';


describe( 'CodeEditor', () =>
{
    let wrapper;
    let instance;
    let cssMap;

    beforeEach( () =>
    {
        wrapper  = shallow( <CodeEditor /> );
        instance = wrapper.instance();
        cssMap   = instance.props.cssMap;
    } );

    describe( 'render()', () =>
    {
        it( 'should implement the Css injector component', () =>
        {
            expect( wrapper.find( Css ) ).to.have.length( 1 );
        } );

        it( 'should contain exactly one textArea', () =>
        {
            expect( wrapper.find( 'textarea' ).length ).to.equal( 1 );
        } );
    } );

    describe( 'props', () =>
    {
        it( 'should pass value to CodeEditor', () =>
        {
            wrapper.setProps( { value: 'code!' } );

            expect( wrapper.find( 'textarea' ).prop( 'defaultValue' ) )
                .to.equal( 'code!' );
        } );

        it( 'should pass onMouseOver to the container div', () =>
        {
            const onMouseOver = sinon.spy();
            wrapper.setProps( { onMouseOver } );

            expect( wrapper.find( `.${cssMap.editor}` )
                .prop( 'onMouseOver' ) ).to.equal( onMouseOver );
        } );

        it( 'should pass onMouseOut to the container div', () =>
        {
            const onMouseOut = sinon.spy();
            wrapper.setProps( { onMouseOut } );

            expect( wrapper.find( `.${cssMap.editor}` )
                .prop( 'onMouseOut' ) ).to.equal( onMouseOut );
        } );
    } );
} );
