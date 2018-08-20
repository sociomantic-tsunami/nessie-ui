/* global document getComputedStyle */
import React                from 'react';

import ListBoxOption        from '../ListBox/ListBoxOption';
import ListBoxOptionGroup   from '../ListBox/ListBoxOptionGroup';
import { deepPure }         from '../utils';

const PureListBoxOption      = deepPure( ListBoxOption );
const PureListBoxOptionGroup = deepPure( ListBoxOptionGroup );

/**
 * ## addPrefix
 * Adds a prefix to a string or array of strings
 *
 * @param   {String|Array}  str     string or array to add the prefix to
 * @param   {String}        prefix  prefix to add
 *
 * @return  {String}
 *
 */
function addPrefix( str, prefix )
{
    if ( Array.isArray( str ) )
    {
        return str.map( s => addPrefix( s, prefix ) );
    }

    return ( str && prefix ) ? `${prefix}-${str}` : str;
}

/**
 * ## buildListBoxOptions
 * Builds ListBoxOptions (and ListBoxOptionGroups) as pure components from array
 * of objects. Adds a prefix to the id of each option.
 *
 * @param   {Array}     options     option objects
 * @param   {String}    [prefix]    prefix to add to id’s
 *
 * @return  {Array}
 *
 */
function buildListBoxOptions( options = [], prefix )
{
    return options.map( ( option = {} ) =>
    {
        if ( option.header )
        {
            const { options: groupOptions, ...groupProps } = option;

            return (
                <PureListBoxOptionGroup
                    { ...groupProps }
                    key = { option.header }>
                    { buildListBoxOptions( groupOptions, prefix ) }
                </PureListBoxOptionGroup>
            );
        }

        return (
            <PureListBoxOption
                { ...option }
                id  = { option.id && addPrefix( option.id, prefix ) }
                key = { option.id } />
        );
    } );
}

/**
 * ## getScrollParent
 * Gets the first scrollable DOM ancestor of the specified element
 *
 * @param   {HTMLElement}   el  element whose scroll parent to find
 *
 * @return  {HTMLElement}
 *
 */
function getScrollParent( el )
{
    if ( !el ) return null;

    const style = getComputedStyle( el );

    if ( [ document.body, document.documentElement ].includes( el ) ||
         !el.parentElement || style.position === 'fixed' )
    {
        return document.documentElement;
    }
    else if ( `${style.overflow} ${style.overflowX} ${style.overflowY}`.match( /(auto|scroll|hidden)/ ) )
    {
        return el;
    }

    return getScrollParent( el.parentElement );
}

/**
 * ## removePrefix
 * Removes a prefix from a string
 *
 * @param   {String}    str     string to remove the prefix from
 * @param   {String}    prefix  prefix to remove
 *
 * @return  {String}
 *
 */
function removePrefix( str, prefix )
{
    return ( str && prefix ) ? str.replace( `${prefix}-`, '' ) : str;
}

export { addPrefix, buildListBoxOptions, getScrollParent, removePrefix };
