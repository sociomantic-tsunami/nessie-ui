/* eslint-env node, mocha */
/* global expect */
/* eslint no-console: 0*/


import React                      from 'react';
import { shallow, render, mount } from 'enzyme';
// import sinon from 'sinon';


import Sorter                     from './index';


describe( 'Sorter', () =>
{
    let Wrapper;

    beforeEach( () =>
{
        Wrapper = mount( <Sorter /> );
    } );


    it( 'should render <Sorter/>', () =>
{
        expect( Wrapper.find( Sorter ) ).to.have.length( 1 );
    } );

  // it('should have its component name and hash as default className', () => {
  //     expect(Wrapper.find('.sorter__default') ).to.have.length(1);
  // });
} );
