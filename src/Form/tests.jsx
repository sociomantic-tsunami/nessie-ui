/* eslint-env node, mocha */
/* eslint-disable no-magic-numbers, no-multi-str, no-unused-expressions */
/* global expect */

import React                            from 'react';
import { mount, shallow, ReactWrapper } from 'enzyme';

import Css                              from '../hoc/Css';

import Form                             from './index';

describe( 'Form', () =>
{
    let wrapper;

    beforeEach(() =>
    {
        wrapper  = shallow( <Form /> );
    });

    describe( 'render()', () =>
    {
        test('should implement the Css higher-order component', () =>
        {
            expect( wrapper.find( Css ) ).toHaveLength(1);
        });

        test('should contain exactly one <form>', () =>
        {
            expect( wrapper.find( 'form' ) ).toHaveLength(1);
        });
    } );

    describe( 'props', () =>
    {
        describe( 'onSubmit', () =>
        {
            test('should be passed to the <form>', () =>
            {
                const onSubmit = () => undefined;
                wrapper.setProps( { onSubmit } );
                expect( wrapper.find( 'form' ).prop( 'onSubmit' ) ).toBe(onSubmit);
            });
        } );
    } );
} );


describe( 'FormDriver', () =>
{
    let wrapper;

    beforeEach(() =>
    {
        wrapper = mount( <Form /> );
    });

    describe( 'getContent()', () =>
    {
        test('should return a ReactWrapper', () =>
        {
            const content = wrapper.driver().getContent();
            expect( content ).toBeInstanceOf(ReactWrapper);
        });

        test('should contain the content node', () =>
        {
            wrapper.setProps( { children: <h2>Pikachu</h2> } );
            const content = wrapper.driver().getContent();
            expect( content.find( 'h2' ) ).toHaveLength(1);
        });
    } );

    describe( 'submit()', () =>
    {
        test('should fire the onSubmit callback prop', () =>
        {
            const onSubmit = sinon.spy();

            wrapper.setProps( { onSubmit } );
            wrapper.driver().submit();

            expect( onSubmit.calledOnce ).toBe(true);
        });
    } );
} );
