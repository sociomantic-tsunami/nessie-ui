/*
 * Copyright (c) 2019 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

/* global document */

import React                                      from 'react';
import ReactDOM                                   from 'react-dom';
import { Manager, Reference, Popper }             from 'react-popper';
import PropTypes                                  from 'prop-types';

const PopperWrapper = props =>
{
    const {
        children,
        container,
        isVisible,
        popper,
        popperOffset,
        popperPosition,
        popperWidth,
    } = props;

    const offset = {
        'S'    : '8px',
        'M'    : '16px',
        'L'    : '24px',
        'XL'   : '32px',
        'none' : undefined,
    }[ popperOffset ];

    return (
        <Manager>
            <Reference>
                { ( { ref } ) => (
                    <div ref = { ref }>
                        { children }
                    </div>
                ) }
            </Reference>
            { isVisible && ReactDOM.createPortal(
                <Popper
                    placement = { popperPosition }
                    modifiers = { offset ? {
                        offset : {
                            offset : `0, ${offset}`,
                        },
                    } : offset }>
                    { ( { ref, style } ) =>
                        (
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
};

PopperWrapper.propTypes =
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
};

PopperWrapper.defaultProps =
{
    children       : undefined,
    container      : undefined,
    isVisible      : false,
    popper         : undefined,
    popperOffset   : 'none',
    popperPosition : 'auto',
    popperWidth    : undefined,
};

PopperWrapper.displayName = 'PopperWrapper';

export default PopperWrapper;
