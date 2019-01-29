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

const NessiePopper = props =>
{
    const {
        children,
        container,
        popper,
        popperPosition,
    } = props;

    const setContainer = container ? document.querySelector( container ) :
        document.body;

    return (
        <Manager>
            <Reference>
                { ( { ref } ) => (
                    <div ref = { ref }>
                        { children }
                    </div>
                ) }
            </Reference>
            { ReactDOM.createPortal(
                <Popper placement = { popperPosition }>
                    { ( { ref, style } ) => (
                        <div
                            ref = { ref }
                            style = { style }>
                            { popper }
                        </div>
                    ) }
                </Popper>,
                setContainer,
            ) }
        </Manager>
    );
};

NessiePopper.propTypes =
{
    /**
     *  Dom element to attach popper
     */
    children       : PropTypes.node,
    /**
     *  id of the DOM element used as container
     */
    container      : PropTypes.string,
    /**
     *  popper element
     */
    popper         : PropTypes.node,
    /**
     *  Position of the popper
     */
    popperPosition : PropTypes.oneOf( [
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
};

NessiePopper.defaultProps =
{
    children       : undefined,
    container      : undefined,
    popper         : undefined,
    popperPosition : 'top',
};

NessiePopper.displayName = 'PopperTooltip';

export default NessiePopper;
