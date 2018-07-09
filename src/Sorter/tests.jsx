/* eslint-env node, mocha */
/* global expect */
/* eslint no-console: 0*/


import React        from 'react';
import { mount }    from 'enzyme';

import Sorter       from './index';

describe( 'Sorter', () =>
{
    let wrapper;

    beforeEach( () =>
    {
        wrapper = mount( <Sorter /> );
    } );


    it( 'should render <Sorter/>', () =>
    {
        expect( wrapper.find( Sorter ) ).to.have.length( 1 );
    } );

    it( 'should have its component name and hash as default className', () =>
    {
        expect( wrapper.find( '.sorter__default' ) ).to.have.length( 1 );
    } );
} );

describe( 'SorterDriver', () =>
{
    let wrapper;

    beforeEach( () =>
    {
        wrapper = mount( <Sorter /> );
    } );

    it( 'should call onToggle callback function', () =>
    {
        const onToggle = sinon.spy();
        wrapper.setProps( {
            onToggle
        } );

        wrapper.driver().toggle();

        expect( onToggle.calledOnce ).to.be.true;
    } );
} );
