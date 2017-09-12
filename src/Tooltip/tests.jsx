/* eslint-env node, mocha */
/* global expect */
/* eslint no-console: 0*/
/* eslint-disable no-magic-numbers, no-multi-str, no-unused-expressions */


import React     from 'react';
import { mount } from 'enzyme';

import Tooltip   from './index';


describe( 'Tooltip', () =>
{
    it( 'should fire onMouseOver event', () =>
    {
        const onMouseOverHandler = sinon.spy();
        const onMouseOutHandler = sinon.spy();
        const props = {
            message     : 'Pikachu!',
            onMouseOver : onMouseOverHandler,
            onMouseOut  : onMouseOutHandler
        };

        const Wrapper = mount( <Tooltip { ...props }>
            <h2> Who am I?</h2>
        </Tooltip> );

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

        const wrapper = mount( <Tooltip { ...props }>
            <h2> Who am I?</h2>
        </Tooltip> );

        wrapper.driver().mouseOut();

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

            const wrapper = mount( <Tooltip { ...props } >
                <h1>Who am i?</h1>
            </Tooltip> );

            const content = wrapper.driver().getContent();
            expect( content.find( 'h1' ) ).to.have.length( 1 );
        } );

        it( 'getMessage', () =>
        {
            const props = {
                message : <h2>Pikachu!</h2>,
            };

            const wrapper = mount( <Tooltip { ...props } /> );

            const message = wrapper.driver().getMessage();
            expect( message.find( 'h2' ) ).to.have.length( 1 );
        } );

        describe( 'testing errors', () =>
        {
            let onMouseOverHandler;
            let onMouseOutHandler;
            let Wrapper;

            beforeEach( () =>
            {
                onMouseOverHandler = sinon.spy();
                onMouseOutHandler = sinon.spy();

                const props = {
                    message     : 'Pikachu!',
                    onMouseOver : onMouseOverHandler,
                    onMouseOut  : onMouseOutHandler
                };

                Wrapper = mount( <Tooltip { ...props } /> );
            } );

            it( 'mouseOver tooltip without content should throw an error', () =>
            {
                const expectedError = 'Cannot mouseover on tooltip. No content \
available';
                expect( () => Wrapper.driver().mouseOver() )
                    .to.throw( expectedError );
                expect( onMouseOverHandler.notCalled ).to.be.true;
                expect( onMouseOutHandler.notCalled ).to.be.true;
            } );

            it( 'mouseOut tooltip without content should throw an error', () =>
            {
                const expectedError = 'Cannot mouseout on tooltip. No content \
available';
                expect( () => Wrapper.driver().mouseOut() )
                    .to.throw( expectedError );
                expect( onMouseOverHandler.notCalled ).to.be.true;
                expect( onMouseOutHandler.notCalled ).to.be.true;
            } );
        } );
    } );

} );
