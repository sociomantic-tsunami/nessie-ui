/*
 * Copyright (c) 2017-2019 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import eventsList from './eventsList';


/**
 * attachEvents( props )
 *
 * Returns a set of Nessie standardized event handlers based on props provided
 *
 * @param   {Object}    props       component props
 * @param   {Object}    customizers explicitly defined payloads and/or actions
 *
 * @return  {Object}    event handlers
 */
function attachEvents( props, customizers = {} )
{
    const handlers = {};
    Object.entries( props ).forEach( ( [ propName, propValue ] ) => {
        if ( eventsList.includes( propName ) )
        {
            handlers[ propName ] =
                createEventHandler( propValue, customizers[ propName ] );
        }
    } );
    return handlers;
}

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
 * @param   {Function}  func        consumer event handler
 * @param   {Object}    customizer  explicitly defined payload and/or action
 *
 * @return  {Function}
 */
function createEventHandler( func, customizer )
{
    if ( customizer === false )
    {
        return; // explicitly disabled; do nothing!
    }

    let payload = null;
    let defaultAction = null;

    if ( Array.isArray( customizer ) ) // custom payload *and* default action
    {
        ( [ payload, defaultAction ] = customizer );
    }
    else if ( typeof customizer === 'object' ) // custom payload only
    {
        payload = customizer;
    }
    else if ( typeof customizer === 'function' ) // default action only
    {
        defaultAction = customizer;
    }

    if ( typeof func !== 'function' ) // no consumer event handler
    {
        return defaultAction;
    }

    // construct standardized payload for consumer’s handler...
    return function eventHandler( e )
    {
        const { currentTarget, relatedTarget, target, type } = e;

        const eventPayload = {
            preventNessieDefault()
            {
                e.preventDefault();
            }
        };

        e.stopPropagation(); // (TODO: find a way to flag event as “handled” without stopping propagation!)

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
            if ( typeof target.checked === 'boolean' )
            {
                eventPayload.isChecked = target.checked;
            }
            else if ( target.value )
            {
                eventPayload.value = target.value;
            }
        }
        else if ( type === 'scroll' )
        {
            if ( currentTarget !== target )
            {
                return; // only fire for current target
            }

            eventPayload.scroll = [ target.scrollLeft, target.scrollTop ];
        }

        // invoke consumer’s event handler
        func( { ...eventPayload, ...payload }, ...arguments );

        if ( defaultAction && !e.defaultPrevented )
        {
            defaultAction( e ); // perform default action
        }
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
    attachEvents,
    buildDisplayName,
    clamp,
    createEventHandler,
    generateId,
    killFocus,
    mapAria,
};

export default {
    attachEvents,
    buildDisplayName,
    clamp,
    createEventHandler,
    generateId,
    killFocus,
    mapAria,
};
