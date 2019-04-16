/*
 * Copyright (c) 2019 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

/* global document, addEventListener, removeEventListener */

import React, {
    forwardRef,
    useCallback,
    useEffect,
    useMemo,
    useRef,
}                                         from 'react';
import ReactDOM                           from 'react-dom';
import { Manager, Reference, Popper }     from 'react-popper';
import PropTypes                          from 'prop-types';

const componentName = 'PopperWrapper';

const PopperWrapper = forwardRef( ( props, forwardedRef ) =>
{
    const {
        children,
        container,
        isVisible,
        matchRefWidth,
        onClickOutside,
        popper,
        popperOffset,
        popperPosition,
        style,
    } = props;

    const referenceRef      = useRef();
    const popperRef         = useRef();
    const scheduleUpdateRef = useRef();

    const containerEl = useMemo( () => document.getElementById( container ),
        [ container ] );

    const offset = useMemo( () =>
        (
            {
                'S'    : '8px',
                'M'    : '16px',
                'L'    : '24px',
                'XL'   : '32px',
                'none' : undefined,
            }[ popperOffset ]
        ), [ popperOffset ] );

    useEffect( () =>
    {
        if ( isVisible && scheduleUpdateRef.current )
        {
            scheduleUpdateRef.current();
        }
    }, [ isVisible, popperOffset ] );

    useEffect( () =>
    {
        if ( isVisible && onClickOutside )
        {
            addEventListener( 'mousedown', handleClickOutSide );

            return () =>
            {
                removeEventListener( 'mousedown', handleClickOutSide );
            };
        }
    }, [ isVisible, onClickOutside, handleClickOutSide ] );

    const handleClickOutSide = useCallback( ( e ) =>
    {
        if ( !( referenceRef.current.contains( e.target ) ||
                popperRef.current.contains( e.target ) ) )
        {
            onClickOutside();
        }
    }, [ onClickOutside ] );

    let popup = popper && (
        <Popper
            key       = { offset }
            placement = { popperPosition }
            innerRef  = { ref =>
            {
                popperRef.current = ref;
            } }
            modifiers = { offset ? {
                offset : {
                    offset : `0, ${offset}`,
                },
            } : offset }>
            { ( { style : popperStyle, scheduleUpdate, ...rest } ) =>
            {
                scheduleUpdateRef.current = scheduleUpdate;
                return popper( {
                    style : matchRefWidth ?
                        {
                            'width' : referenceRef.current.clientWidth,
                            ...popperStyle,
                        } : popperStyle,
                    ...rest,
                } );
            } }
        </Popper>
    );

    popup = containerEl ? ReactDOM.createPortal( popup, containerEl ) : popup;

    return (
        <Manager>
            <Reference
                innerRef = { ref =>
                {
                    referenceRef.current = ref;
                    if ( forwardedRef )
                    {
                        forwardedRef.current = ref;
                    }
                } }>
                { refProps => typeof children === 'function' &&
                  children( { ...refProps, style } )
                }
            </Reference>
            { isVisible && popup }
        </Manager>
    );
} );

PopperWrapper.propTypes =
{
    /**
     *  Reference node render function
     */
    children       : PropTypes.func,
    /**
     *  id of the DOM element used as container
     */
    container      : PropTypes.string,
    /**
     *  Show / Hide popper
     */
    isVisible      : PropTypes.bool,
    /**
     *  pop up width matches reference width
     */
    matchRefWidth  : PropTypes.bool,
    /**
     *  Click Outside callback: ( e ) => ...
     */
    onClickOutside : PropTypes.func,
    /**
     *  Popper content render function
     */
    popper         : PropTypes.func,
    /**
     *  Popper offset
     */
    popperOffset   : PropTypes.oneOf( [ 'S', 'M', 'L', 'XL', 'none' ] ),
    /**
     *  Popper position
     */
    popperPosition : PropTypes.oneOf( [
        'auto',
        'auto-start',
        'auto-end',
        'top',
        'top-start',
        'top-end',
        'bottom',
        'bottom-start',
        'bottom-end',
        'left',
        'left-start',
        'left-end',
        'right',
        'right-start',
        'right-end',
    ] ),
    /**
     *  Style overrides
     */
    style : PropTypes.objectOf( PropTypes.string ),
};

PopperWrapper.defaultProps =
{
    children       : undefined,
    container      : 'nessie-overlay',
    isVisible      : false,
    matchRefWidth  : undefined,
    onClickOutside : undefined,
    popper         : undefined,
    popperOffset   : 'none',
    popperPosition : 'auto',
    style          : undefined,
};

PopperWrapper.displayComponent = componentName;

export default PopperWrapper;
