/*
 * Copyright (c) 2017-2019 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import React                        from 'react';
import PropTypes                    from 'prop-types';

import { IconButton, Text }         from '..';

import { attachEvents, useTheme }   from '../utils';


const componentName = 'Tooltip';

const Tooltip = props =>
{
    const {
        children,
        id,
        isDismissible,
        message,
        onClickClose,
    } = props;

    const cssMap = useTheme( componentName, props );

    return (
        <div
            { ...attachEvents( props ) }
            className = { cssMap.main }
            id        = { id }
            role      = "tooltip">
            <div className = { cssMap.message }>
                { children || ( typeof message === 'string' ?
                    <Text>{ message }</Text> : message )
                }
            </div>
            { isDismissible &&
                <IconButton
                    className = { cssMap.close }
                    iconSize  = "S"
                    iconTheme = "button"
                    iconType  = "x"
                    label     = "Close"
                    onClick   = { onClickClose }
                    role      = "inverted" />
            }
        </div>
    );
};

Tooltip.propTypes =
{
    /**
     *  Position of the tooltip’s arrow
     */
    arrowPosition : PropTypes.oneOf( [
        'top',
        'topLeft',
        'topRight',
        'bottom',
        'bottomLeft',
        'bottomRight',
        'left',
        'leftTop',
        'leftBottom',
        'right',
        'rightTop',
        'rightBottom',
    ] ),
    /**
     *  Tooltip message (JSX node; overrides message prop)
     */
    children      : PropTypes.node,
    /**
     * Extra CSS class name
     */
    className     : PropTypes.string,
    /**
     *  CSS class map
     */
    cssMap        : PropTypes.objectOf( PropTypes.string ),
    /**
     * Component id
     */
    id            : PropTypes.string,
    /**
     *  Display the tooltip as user dismissible
     */
    isDismissible : PropTypes.bool,
    /**
     *  Tooltip message (string)
     */
    message       : PropTypes.string,
    /**
     *  Function to call on “Close” button click: ( e ) => { ... }
     */
    onClickClose  : PropTypes.func,
    /**
     *  onMouseOver callback function: ( e ) => { ... }
     */
    onMouseOver   : PropTypes.func,
    /**
     *  onMouseOut callback function: ( e ) => { ... }
     */
    onMouseOut    : PropTypes.func,
    /**
     *  Tooltip role/style
     */
    role          : PropTypes.oneOf( [
        'default',
        'critical',
        'promoted',
        'warning',
    ] ),
};

Tooltip.defaultProps =
{
    arrowPosition : 'bottom',
    children      : undefined,
    className     : undefined,
    cssMap        : undefined,
    id            : undefined,
    isDismissible : undefined,
    message       : undefined,
    onClickClose  : undefined,
    onMouseOut    : undefined,
    onMouseOver   : undefined,
    role          : 'default',
};

Tooltip.displayName = componentName;

export default Tooltip;
