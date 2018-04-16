/* eslint-env node, mocha */
/* global expect */
/* eslint no-console: 0*/
/* eslint-disable no-magic-numbers, no-multi-str*/

import React              from 'react';
import { mount }          from 'enzyme';

import { Tab, TabButton } from '../index';

import Tabs               from './index';


describe( 'Tabs', () =>
{
    let wrapper;

    beforeEach( () =>
    {
        wrapper  = mount( <Tabs /> );
    } );

    describe( 'render()', () =>
    {
        it( 'should accept a single Tab as children', () =>
        {
            wrapper.setProps( { children: <Tab /> } );
            expect( wrapper.find( TabButton ) ).to.have.length( 1 );
        } );

        it( 'should accept an array of Tabs as children', () =>
        {
            wrapper.setProps( { children: [ <Tab />, <Tab /> ] } );
            expect( wrapper.find( TabButton ) ).to.have.length( 2 );
        } );
    } );
} );

describe( 'TabsDriver', () =>
{
    let wrapper;
    let driver;

    beforeEach( () =>
    {
        wrapper  = mount( <Tabs /> );
        driver   = wrapper.driver();
    } );

    describe( 'getTabButtons()', () =>
    {
        it( 'should return TabButton instances in Tabs when passed array of Tabs as children', () => // eslint-disable-line max-len
        {
            wrapper.setProps( {
                children : [
                    <Tab label = "Tabity" />,
                    <Tab label = "Taby" />
                ]
            } );

            expect( driver.getTabButtons() ).to.have.length( 2 );
        } );
    } );

    describe( 'getTabButtonsByIndex()', () =>
    {
        it( 'should return TabButton in given index', () =>
        {
            wrapper.setProps( {
                children : [
                    <Tab label = "Tabity" />,
                    <Tab label = "Taby" />
                ]
            } );

            expect( driver.getTabButtonsByIndex( 1 ).props().label )
                .to.equal( 'Taby' );
        } );
    } );

    describe( 'getTabButtonsByLabel()', () =>
    {
        it( 'should return TabButton with given label', () =>
        {
            wrapper.setProps( {
                children : [
                    <Tab label = "Tabity" />,
                    <Tab label = "Taby" />
                ]
            } );

            expect( driver.getTabButtonsByLabel( 'Tabity' ).props().label )
                .to.equal( 'Tabity' );
        } );
    } );
} );
