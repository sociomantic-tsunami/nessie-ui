/*
 * Copyright (c) 2019 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

/* global document, addEventListener, removeEventListener */

import React, { Component }                       from 'react';
import ReactDOM                                   from 'react-dom';
import { Manager, Reference, Popper }             from 'react-popper';
import PropTypes                                  from 'prop-types';

export default class PopperWrapper extends Component
{
    static propTypes =
    {
        /**
         *  Reference node to attach popper
         */
        children       : PropTypes.node,
        /**
         *  id of the DOM element used as container
         */
        container      : PropTypes.string,
        /**
         *  Show / Hide popper
         */
        isVisible      : PropTypes.bool,
        /**
         *  Click Outside callback: ( e ) => ...
         */
        onClickOutside : PropTypes.func,
        /**
         *  Popper content node
         */
        popper         : PropTypes.node,
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
         *  Popper width
         */
        popperWidth : PropTypes.number,
    }

    static defaultProps =
    {
        children       : undefined,
        container      : undefined,
        isVisible      : false,
        onClickOutside : undefined,
        popper         : undefined,
        popperOffset   : 'none',
        popperPosition : 'auto',
        popperWidth    : undefined,
    }

    static displayName = 'PopperWrapper'

    referenceRef = React.createRef();
    popperRef    = React.createRef();

    constructor()
    {
        super();

        this.handleClickOutSide = this.handleClickOutSide.bind( this );
    }

    componentDidMount()
    {
        if ( this.props.onClickOutside )
        {
            addEventListener( 'mousedown', this.handleClickOutSide, false );
        }
    }

    componentDidUpdate( prevProps )
    {
        if ( prevProps.onClickOutside !== this.props.onClickOutside )
        {
            removeEventListener( 'mousedown', this.handleClickOutSide, false );

            if ( this.props.onClickOutside )
            {
                addEventListener( 'mousedown', this.handleClickOutSide, false );
            }
        }
    }

    componentWillUnmount()
    {
        if ( this.props.onClickOutside )
        {
            removeEventListener( 'mousedown', this.handleClickOutSide, false );
        }
    }

    handleClickOutSide( e )
    {
        if ( this.props.isVisible )
        {
            if ( !( this.referenceRef.current.contains(  e.target ) ||
                    this.popperRef.current.contains( e.target ) ) )
            {
                this.props.onClickOutside();
            }
        }
    }

    render()
    {
        const {
            children,
            container,
            isVisible,
            popper,
            popperOffset,
            popperPosition,
            popperWidth,
        } = this.props;

        const offset = {
            'S'    : '8px',
            'M'    : '16px',
            'L'    : '24px',
            'XL'   : '32px',
            'none' : undefined,
        }[ popperOffset ];

        return (
            <Manager>
                <Reference
                    innerRef  = { ( ref ) => this.referenceRef.current = ref } >
                    { ( { ref } ) => (
                        <div ref = { ref }>
                            { children }
                        </div>
                    ) }
                </Reference>
                { isVisible && ReactDOM.createPortal(
                    <Popper
                        placement = { popperPosition }
                        innerRef  = { ( ref ) => this.popperRef.current = ref }
                        modifiers = { offset ? {
                            offset : {
                                offset : `0, ${offset}`,
                            },
                        } : offset }>
                        { ( { ref, style } ) => (
                            <div
                                ref   = { ref }
                                style = { popperWidth ? {
                                    'width' : `${popperWidth}px`,
                                    ...style,
                                } : style }>
                                { popper }
                            </div>
                        ) }
                    </Popper>,
                    container ? document.querySelector( container ) :
                        document.body,
                ) }
            </Manager>
        );
    }
}
