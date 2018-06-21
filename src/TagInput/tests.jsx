/* eslint-env node, mocha */
/* global expect */
/* eslint-disable no-magic-numbers, no-multi-str, no-unused-expressions */

import React              from 'react';
import { mount, shallow } from 'enzyme';

import { Tag }            from '../index';

import TagInput           from './index';


describe( 'TagInput', () =>
{
    let wrapper;
    let instance;
    let cssMap;

    beforeEach(() =>
    {
        wrapper  = shallow( <TagInput /> );
        instance = wrapper.instance();
        cssMap   = instance.props.cssMap;
    });

    describe( 'constructor( props )', () =>
    {
        test('should have name TagInput', () =>
        {
            expect( instance.constructor.name ).toBe('TagInput');
        });
    } );

    describe( 'render()', () =>
    {
        test('should contain exactly one input', () =>
        {
            expect( wrapper.find( `.${cssMap.input}` ) ).toHaveLength(1);
        });
    } );

    test('should have Tag components when passed as children', () =>
    {
        wrapper.setProps( {
            children : [
                <Tag label = "TagLabel 1" />,
                <Tag label = "TagLabel 2" />
            ]
        } );

        expect( wrapper.find( Tag ) ).toHaveLength(2);
    });

    test('should have Tag components when passed as tags prop', () =>
    {
        wrapper.setProps( {
            tags : [ 'TagLabelString 1', 'TagLabelString 2' ],
        } );

        expect( wrapper.find( Tag ) ).toHaveLength(2);
    });

    test('should trigger onKeyDown callbacks when key pressed', () =>
    {
        const onKeyDown = jest.fn();
        wrapper.setProps( { onKeyDown } );

        wrapper.find( `.${cssMap.input}` ).simulate( 'keyDown' );
        expect( onKeyDown.called ).toBe(true);
    });

    test('should trigger onKeyUp callbacks when key pressed', () =>
    {
        const onKeyUp = jest.fn();
        wrapper.setProps( { onKeyUp } );

        wrapper.find( `.${cssMap.input}` ).simulate( 'keyUp' );
        expect( onKeyUp.called ).toBe(true);
    });

    test('should trigger onKeyPress callbacks when key pressed', () =>
    {
        const onKeyPress = jest.fn();
        wrapper.setProps( { onKeyPress } );

        wrapper.find( `.${cssMap.input}` ).simulate( 'keyPress' );
        expect( onKeyPress.called ).toBe(true);
    });

    describe( 'readOnly state', () =>
    {
        beforeEach(() =>
        {
            wrapper.setProps( { isReadOnly: true } );
        });

        test('input should receive readonly', () =>
        {
            expect( wrapper.find( `.${cssMap.input}` ).prop( 'readOnly' ) ).toBe(true);
        });
    } );

    describe( 'disabled state', () =>
    {
        beforeEach(() =>
        {
            wrapper.setProps( { isDisabled: true } );
        });

        test('input should receive isDisabled as "disabled"', () =>
        {
            expect( wrapper.find( `.${cssMap.input}` ).prop( 'disabled' ) ).toBe(true);
        });
    } );
} );


describe( 'TagInputDriver', () =>
{
    let wrapper;

    beforeEach(() =>
    {
        wrapper  = mount( <TagInput /> );
    });

    describe( 'blur()', () =>
    {
        test('should call blur once', () =>
        {
            const onBlur = jest.fn();
            wrapper.setProps( {
                onBlur,
                children : [
                    <Tag label = "TagLabel 1" />,
                    <Tag label = "TagLabel 2" />
                ]
            } );

            wrapper.driver().blur();

            expect( onBlur.calledOnce ).toBe(true);
        });
    } );

    describe( 'focus()', () =>
    {
        test('should call focus once', () =>
        {
            const onFocus = jest.fn();
            wrapper.setProps( {
                onFocus,
                children : [
                    <Tag label = "TagLabel 1" />,
                    <Tag label = "TagLabel 2" />
                ]
            } );

            wrapper.driver().focus();

            expect( onFocus.calledOnce ).toBe(true);
        });
    } );

    describe( 'clickCloseTagByIndex()', () =>
    {
        test('should call onClickClose once', () =>
        {
            const onClickClose = jest.fn();
            wrapper.setProps( {
                onClickClose,
                children : [
                    <Tag label = "TagLabel 1" />,
                    <Tag label = "TagLabel 2" />
                ]
            } );

            wrapper.driver().clickCloseTagByIndex( 1 );

            expect( onClickClose.calledOnce ).toBe(true);
        });
    } );

    describe( 'clickCloseTagByLabel()', () =>
    {
        test('should call onClickClose once', () =>
        {
            const onClickClose = jest.fn();
            wrapper.setProps( {
                onClickClose,
                children : [
                    <Tag label = "TagLabel 1" />,
                    <Tag label = "TagLabel 2" />
                ]
            } );

            wrapper.driver().clickCloseTagByLabel( 'TagLabel 1' );

            expect( onClickClose.calledOnce ).toBe(true);
        });
    } );

    describe( 'mouseOut()', () =>
    {
        test('should call onMouseOut once', () =>
        {
            const onMouseOut = jest.fn();
            wrapper.setProps( {
                onMouseOut,
                children : [
                    <Tag label = "TagLabel 1" />,
                    <Tag label = "TagLabel 2" />
                ]
            } );

            wrapper.driver().mouseOut();

            expect( onMouseOut.calledOnce ).toBe(true);
        });
    } );

    describe( 'mouseOver()', () =>
    {
        test('should call onMouseOver once', () =>
        {
            const onMouseOver = jest.fn();
            wrapper.setProps( {
                onMouseOver,
                children : [
                    <Tag label = "TagLabel 1" />,
                    <Tag label = "TagLabel 2" />
                ]
            } );

            wrapper.driver().mouseOver();

            expect( onMouseOver.calledOnce ).toBe(true);
        });
    } );
} );
