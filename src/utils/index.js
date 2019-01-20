/*
 * Copyright (c) 2017-2019 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import React, { Component } from 'react';


const buildDisplayName = ( WrapperComponent, WrappedComponent ) =>
{
    const wrapperComponentName = getComponentName( WrapperComponent );
    const wrappedComponentName = getComponentName( WrappedComponent );

    return `${wrapperComponentName}(${wrappedComponentName})`;
};

const clamp = ( val, min, max ) => Math.min( Math.max( val, min ), max );


/**
 * createEventHandler( func, payload )
 *
 * Creates an function that invokes an event handler with a payload object.
 *  - Keyboard events include the pressed key as part of payload by default
 *  - Change events include the changed value as part of payload by default
 *  - Scroll events include the updated scroll position as part of payload by
 *    default
 *  - Mouse and focus events only fire when entering or leaving the current
 *    target; not when moving between descendent elements.
 *  - Stops propagation of all handled events
 *
 * @param {Function} func - consumer event handler
 * @param {Object} payload - values to include in payload
 *
 * @return {Function}
 */
function createEventHandler( func, payload )
{
    if ( typeof func !== 'function' )
    {
        return; // event is not handled
    }

    return function eventHandler( e )
    {
        const { currentTarget, relatedTarget, target, type } = e;

        const eventPayload = { preventNessieDefault() { e.preventDefault(); } };

        e.stopPropagation(); // (TODO: find a way to flag event as “handled” without stopping propagation)

        if ( [ 'blur', 'focus', 'mouseout', 'mouseover' ].includes( type ) &&
            currentTarget.contains( relatedTarget ) )
        {
            return; // don't fire when mouse/focus moves between descendants
        }
        if ( [ 'keyup', 'keydown', 'keypress' ].includes( type ) )
        {
            eventPayload.key = e.key;
        }
        else if ( type === 'change' )
        {
            eventPayload.value = target.value;
        }
        else if ( type === 'scroll' )
        {
            if ( currentTarget !== target )
            {
                return; // only fire for current target
            }

            eventPayload.scroll = [ target.scrollLeft, target.scrollTop ];
        }

        func( { ...eventPayload, ...payload }, ...arguments );
    };
}

const getComponentName = Comp => Comp.displayName || Comp.name || 'Component';

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
    createEventHandler,
    generateId,
    killFocus,
    mapAria,
};

export default {
    buildDisplayName,
    clamp,
    createEventHandler,
    generateId,
    killFocus,
    mapAria,
};
