/* eslint-env node, mocha */
/* global expect */


import React              from 'react';
import { shallow, mount } from 'enzyme';

import Css                from '../hoc/Css';
import { Icon }           from '../index';

import IconButton         from './index';


describe( 'IconButton', () =>
{
    let wrapper;
    let instance;

    beforeEach(() =>
    {
        wrapper  = shallow( <IconButton /> );
        instance = wrapper.instance();
    });

    describe( 'constructor( props )', () =>
    {
        test('should have name IconButton', () =>
        {
            expect( instance.constructor.name ).toBe('IconButton');
        });
    } );

    describe( 'render()', () =>
    {
        test('should implement the Css higher-order component', () =>
        {
            expect( wrapper.find( Css ) ).toHaveLength(1);
        });

        test('should contain exactly one Icon', () =>
        {
            expect( wrapper.find( Icon ) ).toHaveLength(1);
        });
    } );

    describe( 'props', () =>
    {
        describe( 'iconTheme', () =>
        {
            test('should be "control" by default', () =>
            {
                expect( instance.props.iconTheme ).toBe('control');
            });

            test('should be passed to the Icon as theme', () =>
            {
                wrapper.setProps( { iconTheme: 'light' } );
                expect( wrapper.find( Icon ).prop( 'theme' ) ).toBe('light');
            });
        } );

        describe( 'iconSize', () =>
        {
            test('should be "S" by default', () =>
            {
                expect( instance.props.iconSize ).toBe('S');
            });

            test('should be passed to the Icon as size', () =>
            {
                wrapper.setProps( { iconSize: 'L' } );
                expect( wrapper.find( Icon ).prop( 'size' ) ).toBe('L');
            });
        } );

        describe( 'iconType', () =>
        {
            test('should be undefiend by default', () =>
            {
                expect( instance.props.iconType ).toBeUndefined();
            });

            test('should be passed to the Icon as type', () =>
            {
                wrapper.setProps( { iconType: 'add' } );
                expect( wrapper.find( Icon ).prop( 'type' ) ).toBe('add');
            });
        } );
    } );
} );

describe( 'IconButtonDriver', () =>
{
    let wrapper;
    let driver;

    beforeEach(() =>
    {
        wrapper = mount( <IconButton /> );
        driver  = wrapper.driver();
    });

    describe( 'click()', () =>
    {
        test('should fire the onClick callback prop', () =>
        {
            const clickSpy = sinon.spy();
            wrapper.setProps( { onClick: clickSpy } );

            driver.click();
            expect( clickSpy.calledOnce ).toBe(true);
        });
    } );

    describe( 'focus()', () =>
    {
        test('should fire the onFocus callback prop', () =>
        {
            const focusSpy = sinon.spy();
            wrapper.setProps( { onFocus: focusSpy } );

            driver.focus();
            expect( focusSpy.calledOnce ).toBe(true);
        });
    } );

    describe( 'blur()', () =>
    {
        test('should fire the onBlur callback prop', () =>
        {
            const blurSpy = sinon.spy();
            wrapper.setProps( { onBlur: blurSpy } );

            driver.blur();
            expect( blurSpy.calledOnce ).toBe(true);
        });
    } );
} );
