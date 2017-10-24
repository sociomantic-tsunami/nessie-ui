import React, { isReactElement } from 'react';

import ListBoxOption             from './ListBoxOption';


const buildOptions = ( {
    activeOption,
    children,
    options = [],
    selectedOptions
} ) =>
    ( children || options ).map( ( opt = {} ) =>
    {
        const { isActive, isSelected, ...props } = isReactElement( opt ) ?
            opt.props : opt;

        return (
            <ListBoxOption
                { ...props }
                isActive   = { props.id === activeOption || isActive }
                isSelected = { selectedOptions.indexOf( props.id ) > -1 ||
                    isSelected } />
        );
    } );


const generateId = name =>
    `${name}-${Math.floor( ( Math.random() * 9e15 ) + 1e15 )}`;


const mapFocusable = isFocusable => ( isFocusable ? '0' : '-1' );


const mapToAria = val =>
{
    if ( typeof val === 'boolean' )
    {
        return val ? 'true' : 'false';
    }

    return val;
};


export { buildOptions, generateId, mapFocusable, mapToAria };
