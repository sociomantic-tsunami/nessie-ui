/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import React, { Component } from 'react';
import isEqual              from 'lodash.isequal';


const buildDisplayName = ( WrapperComponent, WrappedComponent ) =>
{
    const wrapperComponentName = getComponentName( WrapperComponent );
    const wrappedComponentName = getComponentName( WrappedComponent );

    return `${wrapperComponentName}(${wrappedComponentName})`;
};

const clamp = ( val, min, max ) => Math.min( Math.max( val, min ), max );

const deepPure = Comp => class DeepPure extends Component
{
    shouldComponentUpdate( nextProps )
    {
        return !isEqual( this.props, nextProps );
    }
    render()
    {
        return <Comp { ...this.props } />;
    }
};

const eventHandler = ( func, ...rest ) => func && ( e => func( e, ...rest ) );


const getComponentName = Comp =>
    Comp.displayName || Comp.name || 'Component';


const generateId = componentName =>
    `${componentName}${Math.floor( ( Math.random() * 9e15 ) + 1e15 )}`;

const killFocus = e => e.preventDefault();

const mapAria = ( ariaObj = {} ) =>
{
    const res = { role: ariaObj.role };

    Object.keys( ariaObj ).forEach( key =>
    {
        const value = ariaObj[ key ];
        if ( key !== 'role' && value )
        {
            res[ `aria-${key.toLowerCase()}` ] = ariaObj[ key ].toString();
        }
    } );

    return res;
};


export {
    buildDisplayName,
    clamp,
    deepPure,
    eventHandler,
    generateId,
    killFocus,
    mapAria,
};

export default {
    buildDisplayName,
    clamp,
    deepPure,
    eventHandler,
    generateId,
    killFocus,
    mapAria,
};
