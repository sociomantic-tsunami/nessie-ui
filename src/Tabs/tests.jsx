/* eslint-env node, mocha */
/* global expect */
/* eslint no-console: 0*/
/* eslint-disable no-magic-numbers, no-multi-str*/

import React              from 'react';
import { shallow, mount } from 'enzyme';

import { Tab, TabButton } from '../index';

import Tabs               from './index';


describe( 'Tabs', () =>
{
    let wrapper;
    // let instance;

    beforeEach( () =>
    {
        wrapper  = shallow( <Tabs /> );
        // instance = wrapper.instance();
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

xdescribe( 'TabsDriver', () =>
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
        it( 'should return TabButton instances in Tabs', () =>
        {
            wrapper.setProps( {
                children : [ <Tab label = "Tabity" />, <Tab label = "Taby" /> ]
            } );

            expect( driver.getTabButtons() ).to.have.length( 2 );
        } );
    } );

    describe( 'changeActiveTab()', () =>
    {
        beforeEach( () =>
        {
            const onChange = sinon.spy;
            wrapper.setProps( {
                children : [
                    <Tab label = "Tabity" />,
                    <Tab label = "Taby" />
                ],
                onChange,
                activeTabIndex : 0
            } );
        } );

        it( 'should trigger onChange', () =>
        {
            driver.changeActiveTab( 1 );

            expect( onChange.calledOnce ).to.be.true;
        } );
    } );
} );
