import React, { Component } from 'react';
import isEqual              from 'lodash.isequal';

const CSS_MODIFIER  = '__';
const CSS_SEPARATOR = '  ';


const buildClassName = ( className, cssMap = {}, cssProps = {} ) =>
{
    if ( cssMap )
    {
        const defaultString = cssMap.default;

        let cssString = defaultString || '';

        Object.keys( cssProps ).forEach( prop =>
        {
            const propValue = cssProps[ prop ];

            if ( propValue )
            {
                let cssMapClass = '';

                if ( propValue === true )
                {
                    cssMapClass = cssMap[ prop ];
                }
                else
                {
                    cssMapClass = cssMap[ prop + CSS_MODIFIER + propValue ];
                }

                if ( cssMapClass )
                {
                    cssString += CSS_SEPARATOR + cssMapClass;
                }
            }
        } );

        cssString += className ? ( CSS_SEPARATOR + className ) : '';

        return cssString || undefined;
    }
};


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
    buildClassName,
    buildDisplayName,
    clamp,
    deepPure,
    eventHandler,
    generateId,
    killFocus,
    mapAria,
};

export default {
    buildClassName,
    buildDisplayName,
    clamp,
    deepPure,
    eventHandler,
    generateId,
    killFocus,
    mapAria,
};
