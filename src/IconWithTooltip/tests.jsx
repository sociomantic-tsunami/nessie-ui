/* eslint-env node, mocha */
/* global expect */
/* eslint no-console: 0*/
/* eslint-disable no-magic-numbers, no-multi-str, no-unused-expressions */


import React            from 'react';
import { mount }        from 'enzyme';

import IconWithTooltip  from './index';


describe( 'IconWithTooltip', () =>
{
    let Wrapper;

    beforeEach( () =>
    {
        Wrapper = mount( <IconWithTooltip /> );
    } );


    it( 'should have its component name as default className', () =>
    {
        expect( Wrapper.find( '.iconWithTooltip__default' ) )
            .to.have.length( 1 );
    } );

    it( 'should fire onMouseOver event', () =>
    {
        const onMouseOverHandler = sinon.spy();
        const onMouseOutHandler = sinon.spy();
        const props = {
            message     : 'Pikachu!',
            onMouseOver : onMouseOverHandler,
            onMouseOut  : onMouseOutHandler
        };

        Wrapper = mount( <IconWithTooltip { ...props } /> );

        Wrapper.driver().mouseOver();

        expect( onMouseOverHandler.calledOnce ).to.be.true;
        expect( onMouseOutHandler.notCalled ).to.be.true;
    } );

    it( 'should fire onMouseOut event', () =>
    {
        const onMouseOverHandler = sinon.spy();
        const onMouseOutHandler = sinon.spy();
        const props = {
            message     : 'Pikachu!',
            onMouseOver : onMouseOverHandler,
            onMouseOut  : onMouseOutHandler
        };

        Wrapper = mount( <IconWithTooltip { ...props } /> );

        Wrapper.driver().mouseOut();

        expect( onMouseOverHandler.notCalled ).to.be.true;
        expect( onMouseOutHandler.calledOnce ).to.be.true;
    } );

    describe( 'Driver self-test', () =>
    {
        it( 'getContent', () =>
        {
            const props = {
                message : 'Pikachu!',
            };

            Wrapper = mount( <IconWithTooltip { ...props } >
                <h1>Who am i?</h1>
            </IconWithTooltip> );

            const content = Wrapper.driver().getContent();
            expect( content.find( 'h1' ) ).to.have.length( 1 );
        } );

        it( 'getMessage', () =>
        {
            const props = {
                message          : <h2>Pikachu!</h2>,
                tooltipIsVisible : true
            };

            Wrapper = mount( <IconWithTooltip { ...props } /> );

            const message = Wrapper.driver().getMessage();
            expect( message.find( 'h2' ) ).to.have.length( 1 );
        } );
    } );
} );
