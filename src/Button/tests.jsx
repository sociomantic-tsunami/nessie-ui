/* eslint-env node, mocha */
/* eslint-disable no-magic-numbers, no-multi-str, no-unused-expressions */
/* global expect */

import React              from 'react';
import { mount, shallow } from 'enzyme';

import Css                from '../hoc/Css';
import Icon               from '../Icon';
import Spinner            from '../Spinner';

import Button             from './index';


describe.only( 'Button', () =>
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
        it( 'has name Button', () =>
        {
            expect( instance.constructor.name ).to.equal( 'Button' );
        } );
    } );

    describe( 'handleMouseOver( e )', () =>
    {
        it( 'calls the onMouseOver callback prop', () =>
        {
            const onMouseOver = sinon.spy();
            wrapper.setProps( { onMouseOver } );

            instance.handleMouseOver();

            expect( onMouseOver.calledOnce ).to.be.true;
        } );

        it( 'sets isHovered state to true', () =>
        {
            const onMouseOver = sinon.spy();
            wrapper.setProps( { onMouseOver } );

            instance.handleMouseOver();

            expect( instance.state.isHovered ).to.be.true;
        } );
    } );

    describe( 'handleMouseOut( e )', () =>
    {
        it( 'calls the onMouseOver callback prop', () =>
        {
            const onMouseOut = sinon.spy();
            wrapper.setProps( { onMouseOut } );

            instance.handleMouseOut();

            expect( onMouseOut.calledOnce ).to.be.true;
        } );

        it( 'sets isHovered state to false', () =>
        {
            const onMouseOut = sinon.spy();
            wrapper.setProps( { onMouseOut } );

            instance.handleMouseOut();

            expect( instance.state.isHovered ).to.be.false;
        } );
    } );

    describe( 'render()', () =>
    {
        it( 'implements the Css injector component', () =>
        {
            expect( wrapper.find( Css ) ).to.have.length( 1 );
        } );

        it( 'renders exactly one <button>', () =>
        {
            expect( wrapper.find( 'button' ) ).to.have.length( 1 );
        } );

        it( 'renders exactly one Icon when configured', () =>
        {
            wrapper.setProps( { iconType: 'add' } );
            expect( wrapper.find( Icon ) ).to.have.length( 1 );
        } );

        it( 'renders exactly one Spinner when isLoading', () =>
        {
            wrapper.setProps( { isLoading: true } );
            expect( wrapper.find( Spinner ) ).to.have.length( 1 );
        } );
    } );

    describe( 'props', () =>
    {
        describe( 'iconType', () =>
        {
            it( 'is "none" by default', () =>
            {
                expect( instance.props.iconType ).to.equal( 'none' );
            } );

            it( 'is passed to the Icon as type', () =>
            {
                wrapper.setProps( { iconType: 'add' } );

                expect( wrapper.find( Icon ).prop( 'type' ) )
                    .to.equal( 'add' );
            } );
        } );

        describe( 'iconPosition', () =>
        {
            it( 'is "left" by default', () =>
            {
                expect( instance.props.iconPosition ).to.equal( 'left' );
            } );
        } );

        describe( 'role', () =>
        {
            it( 'is "default" by default', () =>
            {
                expect( instance.props.role ).to.equal( 'default' );
            } );

            it( 'is passed to Icon as theme when "control"', () =>
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
            it( 'is false by default', () =>
            {
                expect( instance.props.isLoading ).to.be.false;
            } );

            it( 'is passed to Icon as theme when "control"', () =>
            {
                wrapper.setProps( {
                    iconType : 'add',
                    role     : 'control'
                } );

                expect( wrapper.find( Icon ).prop( 'theme' ) )
                    .to.equal( 'control' );
            } );
        } );

        describe( 'onClick', () =>
        {
            it( 'is undefined by default', () =>
            {
                expect( instance.props.onClick ).to.be.undefined;
            } );

            it( 'is passed to <button>', () =>
            {
                const onClick = sinon.spy();
                wrapper.setProps( { onClick } );

                expect( wrapper.find( 'button' ).prop( 'onClick' ) )
                    .to.equal( onClick );
            } );
        } );

        describe( 'onMouseOver', () =>
        {
            it( 'is undefined by default', () =>
            {
                expect( instance.props.onMouseOver ).to.be.undefined;
            } );
        } );

        describe( 'onMouseOut', () =>
        {
            it( 'is undefined by default', () =>
            {
                expect( instance.props.onMouseOut ).to.be.undefined;
            } );
        } );

        describe( 'buttonRef', () =>
        {
            it( 'is undefined by default', () =>
            {
                expect( instance.props.buttonRef ).to.be.undefined;
            } );
        } );
    } );
} );


describe.only( 'ButtonDriver', () =>
{
    let wrapper;
    let driver;
    let button;
    let simulate;

    beforeEach( () =>
    {
        wrapper  = mount( <Button /> );
        driver   = wrapper.driver();
        button   = wrapper.find( 'button' ).first();
        simulate = sinon.spy( driver.button, 'simulate' );
    } );

    describe( 'constructor', () =>
    {
        it( 'assigns the <button> to this.button', () =>
        {
            expect( driver.button.getNode() ).to.equal( button.getNode() );
        } );
    } );

    describe( 'click', () =>
    {
        it( 'calls simulate( event ) exactly once on the <button>', () =>
        {
            driver.click();
            expect( simulate.calledOnce ).to.be.true;
        } );

        it( 'calls simulate( event ) with event \'click\'', () =>
        {
            driver.click();
            expect( simulate.lastCall.args[ 0 ] ).to.equal( 'click' );
        } );

        it( 'returns the driver instance', () =>
        {
            expect( driver.click() ).to.equal( driver );
        } );

        it( 'throws the expected error when isDisabled', () =>
        {
            wrapper.setProps( { isDisabled: true, label: 'Pikaboo' } );

            const expectedError =
                'Button \'Pikaboo\' cannot be clicked since it is disabled';

            expect( () => driver.click() ).to.throw( expectedError );
        } );

        it( 'does not call simulate( event ) when isDisabled', () =>
        {
            wrapper.setProps( { isDisabled: true, label: 'Pikaboo' } );

            expect( () => driver.click() );
            expect( simulate.notCalled ).to.be.true;
        } );

        it( 'throws the expected error when isLoading', () =>
        {
            wrapper.setProps( { isLoading: true, label: 'Pikaboo'  } );

            const expectedError =
                'Button \'Pikaboo\' cannot be clicked since it is loading';

            expect( () => driver.click() ).to.throw( expectedError );
        } );

        it( 'does not call simulate( event ) when isLoading', () =>
        {
            wrapper.setProps( { isLoading: true, label: 'Pikaboo'  } );

            expect( () => driver.click() );
            expect( simulate.notCalled ).to.be.true;
        } );
    } );

    describe( 'mouseOver', () =>
    {
        it( 'calls simulate( event ) exactly once on the <button>', () =>
        {
            driver.mouseOver();
            expect( simulate.calledOnce ).to.be.true;
        } );

        it( 'calls simulate( event ) with event \'mouseEnter\'', () =>
        {
            driver.mouseOver();
            expect( simulate.lastCall.args[ 0 ] ).to.equal( 'mouseEnter' );
        } );

        it( 'returns the driver instance', () =>
        {
            expect( driver.click() ).to.equal( driver );
        } );
    } );

    describe( 'mouseOut', () =>
    {
        it( 'calls simulate( event ) exactly once on the <button>', () =>
        {
            driver.mouseOut();
            expect( simulate.calledOnce ).to.be.true;
        } );

        it( 'calls simulate( event ) with event \'mouseLeave\'', () =>
        {
            driver.mouseOut();
            expect( simulate.lastCall.args[ 0 ] ).to.equal( 'mouseLeave' );
        } );

        it( 'returns the driver instance', () =>
        {
            expect( driver.click() ).to.equal( driver );
        } );
    } );
} );
