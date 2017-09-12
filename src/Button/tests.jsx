/* eslint-env node, mocha */
/* eslint-disable no-magic-numbers, no-multi-str, no-unused-expressions */
/* global expect */

import React              from 'react';
import { mount, shallow } from 'enzyme';

import Css                from '../hoc/Css';
import Icon               from '../Icon';
import Spinner            from '../Spinner';

import Button             from './index';


describe( 'Button', () =>
{
    let wrapper;
    let instance;

    beforeEach( () =>
    {
        wrapper  = shallow( <Button /> );
        instance = wrapper.instance();
    } );

    describe( 'constructor( props )', () =>
    {
        it( 'should have name Button', () =>
        {
            expect( instance.constructor.name ).to.equal( 'Button' );
        } );
    } );

    describe( 'render()', () =>
    {
        it( 'should implement the Css injector component', () =>
        {
            expect( wrapper.find( Css ) ).to.have.length( 1 );
        } );

        it( 'should contain exactly one <button>', () =>
        {
            expect( wrapper.find( 'button' ) ).to.have.length( 1 );
        } );

        it( 'should have a exactly one Icon when configured', () =>
        {
            wrapper.setProps( { iconType: 'add' } );
            expect( wrapper.find( Icon ) ).to.have.length( 1 );
        } );

        it( 'should have a exactly one Spinner when loading', () =>
        {
            wrapper.setProps( { isLoading: true } );
            expect( wrapper.find( Spinner ) ).to.have.length( 1 );
        } );
    } );

    describe( 'props', () =>
    {
        describe( 'iconType', () =>
        {
            it( 'should be "none" by default', () =>
            {
                expect( instance.props.iconType ).to.equal( 'none' );
            } );

            it( 'should be passed to the Icon as type', () =>
            {
                wrapper.setProps( { iconType: 'add' } );

                expect( wrapper.find( Icon ).prop( 'type' ) )
                    .to.equal( 'add' );
            } );
        } );

        describe( 'iconPosition', () =>
        {
            it( 'should be "left" by default', () =>
            {
                expect( instance.props.iconPosition ).to.equal( 'left' );
            } );
        } );

        describe( 'role', () =>
        {
            it( 'should be "default" by default', () =>
            {
                expect( instance.props.role ).to.equal( 'default' );
            } );

            it( 'should be passed to Icon as theme when "control"', () =>
            {
                wrapper.setProps( {
                    iconType : 'add',
                    role     : 'control'
                } );

                expect( wrapper.find( Icon ).prop( 'theme' ) )
                    .to.equal( 'control' );
            } );
        } );

        describe( 'isLoading', () =>
        {
            it( 'should be false by default', () =>
            {
                expect( instance.props.isLoading ).to.be.false;
            } );

            it( 'should be passed to Icon as theme when "control"', () =>
            {
                wrapper.setProps( {
                    iconType : 'add',
                    role     : 'control'
                } );

                expect( wrapper.find( Icon ).prop( 'theme' ) )
                    .to.equal( 'control' );
            } );
        } );

        describe( 'buttonRef', () =>
        {
            it( 'should be undefined by default', () =>
            {
                expect( instance.props.buttonRef ).to.be.undefined;
            } );
        } );
    } );
} );


describe( 'ButtonDriver', () =>
{
    let wrapper;
    let driver;

    beforeEach( () =>
    {
        wrapper = mount( <Button /> );
        driver  = wrapper.driver();
    } );

    describe( 'click', () =>
    {
        let clickSpy;

        beforeEach( () =>
        {
            clickSpy = sinon.spy();
        } );

        it( 'should have the button clicked', () =>
        {
            wrapper.setProps( { onClick: clickSpy } );
            driver.click();
            expect( clickSpy.calledOnce ).to.be.true;
        } );

        it( 'click on a disabled button should produce an error', () =>
        {
            wrapper.setProps( {
                label      : 'Pikaboo',
                isDisabled : true,
                onClick    : clickSpy
            } );

            const expectedError =
                'Button \'Pikaboo\' cannot be clicked since it is disabled';

            expect( () => driver.click() ).to.throw( expectedError );
            expect( clickSpy.notCalled ).to.be.true;
        } );

        it( 'click on a loading button should produce an error', () =>
        {
            wrapper.setProps( {
                label     : 'Pikaboo',
                isLoading : true,
                onClick   : clickSpy
            } );

            const expectedError =
                'Button \'Pikaboo\' cannot be clicked since it is loading';

            expect( () => driver.click() ).to.throw( expectedError );
            expect( clickSpy.notCalled ).to.be.true;
        } );
    } );
} );
