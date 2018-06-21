/* eslint-env node, mocha */
/* eslint-disable no-magic-numbers, no-multi-str, no-unused-expressions */
/* global expect */

import React              from 'react';
import { shallow, mount } from 'enzyme';

import Checkable          from '../proto/Checkable';

import Checkbox           from './index';

describe( 'Checkbox', () =>
{
    let wrapper;

    beforeEach(() =>
    {
        wrapper  = shallow( <Checkbox /> );
    });

    describe( 'render()', () =>
    {
        test('should contain exactly one Checkable', () =>
        {
            expect( wrapper.find( Checkable ) ).toHaveLength(1);
        });
    } );

    describe( 'props', () =>
    {
        describe( 'isDisabled', () =>
        {
            test('should be passed to the Checkable', () =>
            {
                wrapper.setProps( { isDisabled: true } );

                expect( wrapper.find( Checkable ).prop( 'isDisabled' ) ).toBe(true);
            });
        } );

        describe( 'isReadOnly', () =>
        {
            test('should be false by default', () =>
            {
                expect( wrapper.prop( 'isReadOnly' ) ).toBe(false);
            });

            test('should be passed to Checkable', () =>
            {
                const onChange = sinon.stub();
                wrapper.setProps( { isReadOnly: true, onChange } );

                expect( wrapper.find( Checkable ).prop( 'onChange' ) ).toBe(onChange);
            });
        } );

        describe( 'hasError', () =>
        {
            test('should be passed to the Checkable', () =>
            {
                wrapper.setProps( { hasError: true } );

                expect( wrapper.find( Checkable ).prop( 'hasError' ) ).toBe(true);
            });
        } );

        describe( 'forceHover', () =>
        {
            test('should be passed to the Checkable', () =>
            {
                wrapper.setProps( { forceHover: true } );

                expect( wrapper.find( Checkable ).prop( 'forceHover' ) ).toBe(true);
            });
        } );

        describe( 'onChange', () =>
        {
            test('should be undefined by default', () =>
            {
                expect( wrapper.prop( 'onChange' ) ).toBeUndefined();
            });

            test('should be passed to Checkable', () =>
            {
                const onChange = sinon.stub();
                wrapper.setProps( { isReadOnly: true, onChange } );

                expect( wrapper.find( Checkable ).prop( 'onChange' ) ).toBe(onChange);
            });
        } );
    } );
} );


describe( 'CheckboxDriver', () =>
{
    let wrapper;

    beforeEach(() =>
    {
        wrapper = mount( <Checkbox /> );
    });

    describe( 'focus()', () =>
    {
        test('should call onFocus once', () =>
        {
            const onFocus = jest.fn();
            wrapper.setProps( { onFocus } );

            wrapper.driver().focus();

            expect( onFocus.calledOnce ).toBe(true);
        });
    } );


    describe( 'blur()', () =>
    {
        test('should call onFocus once', () =>
        {
            const onBlur = jest.fn();
            wrapper.setProps( { onBlur } );

            wrapper.driver().blur();

            expect( onBlur.calledOnce ).toBe(true);
        });
    } );


    describe( 'setChecked()', () =>
    {
        test('should not call onChange when already checked', () =>
        {
            const onChange = jest.fn();
            wrapper.setProps( { isChecked: true, onChange } );

            wrapper.driver().setChecked();

            expect( onChange.calledOnce ).toBe(false);
        });

        test('should call onChange once when unchecked', () =>
        {
            const onChange = jest.fn();
            wrapper.setProps( { isChecked: false, onChange } );

            wrapper.driver().setChecked();

            expect( onChange.calledOnce ).toBe(true);
        });

        test('should set target.checked to true', () =>
        {
            let targetChecked;
            const onChange = sinon.stub().callsFake( e =>
                targetChecked = e.target.checked
            );
            wrapper.setProps( { isChecked: false, onChange } );

            wrapper.driver().setChecked();

            expect( targetChecked ).toBe(true);
        });
    } );


    describe( 'setUnchecked()', () =>
    {
        test('should not call onChange when already unchecked', () =>
        {
            const onChange = jest.fn();
            wrapper.setProps( { isChecked: false, onChange } );

            wrapper.driver().setUnchecked();

            expect( onChange.calledOnce ).toBe(false);
        });

        test('should call onChange once when checked', () =>
        {
            const onChange = jest.fn();
            wrapper.setProps( { isChecked: true, onChange } );

            wrapper.driver().setUnchecked();

            expect( onChange.calledOnce ).toBe(true);
        });

        test('should set target.checked to false', () =>
        {
            let targetChecked;
            const onChange = sinon.stub().callsFake( e =>
                targetChecked = e.target.checked
            );
            wrapper.setProps( { isChecked: true, onChange } );

            wrapper.driver().setUnchecked();

            expect( targetChecked ).toBe(false);
        });
    } );


    describe( 'toggleChecked()', () =>
    {
        test('should call onChange once', () =>
        {
            const onChange = jest.fn();
            wrapper.setProps( { onChange } );

            wrapper.driver().toggleChecked();

            expect( onChange.calledOnce ).toBe(true);
        });

        test('should toggle the value of target.checked', () =>
        {
            let targetChecked;
            const onChange = sinon.stub().callsFake( e =>
                targetChecked = e.target.checked
            );
            wrapper.setProps( { onChange, isChecked: true } );

            wrapper.driver().toggleChecked();

            expect( targetChecked ).toBe(false);
        });
    } );


    describe( 'click()', () =>
    {
        test('should call onClick once', () =>
        {
            const onClick = jest.fn();

            wrapper.setProps( { onClick } );
            wrapper.driver().click();

            expect( onClick.calledOnce ).toBe(true);
        });
    } );


    describe( 'mouseOver()', () =>
    {
        test('should call onMouseOver once', () =>
        {
            const onMouseOver = jest.fn();
            wrapper.setProps( { onMouseOver } );

            wrapper.driver().mouseOver();

            expect( onMouseOver.calledOnce ).toBe(true);
        });
    } );


    describe( 'mouseOut()', () =>
    {
        test('should call onMouseOut once', () =>
        {
            const onMouseOut = jest.fn();
            wrapper.setProps( { onMouseOut } );

            wrapper.driver().mouseOut();

            expect( onMouseOut.calledOnce ).toBe(true);
        });
    } );
} );
