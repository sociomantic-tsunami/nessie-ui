import React                          from 'react';
import PropTypes                      from 'prop-types';

import { generateId, buildClassName } from '../utils';
import styles                         from './tooltip.css';
import { IconButton, Text }           from '../index';

const Tooltip = ( {
    children,
    className,
    cssMap,
    id = generateId( 'Tooltip' ),
    isDismissible,
    isVisible,
    message,
    noWrap,
    onClickClose,
    onMouseOut,
    onMouseOver,
    overflowIsHidden,
    position,
    role,
} ) =>
{
    let contentNode = children;

    if ( typeof children === 'string' )
    {
        contentNode = (
            <Text
                noWrap           = { noWrap }
                overflowIsHidden = { overflowIsHidden }>
                { children }
            </Text>
        );
    }

    return (
        <div
            className = { buildClassName( className, cssMap, {
                dismissible : isDismissible,
                position,
                role,
            } ) }
            onMouseEnter = { onMouseOver }
            onMouseLeave = { onMouseOut }>
            { contentNode &&
                <div
                    aria-describedby = { isVisible ? id : null }
                    className        = { cssMap.content }>
                    { contentNode }
                </div>
            }
            { isVisible &&
                <div className = { cssMap.tooltipContainer }>
                    <div
                        className = { cssMap.tooltip }
                        id        = { id }
                        role      = "tooltip">
                        <div className = { cssMap.message }>
                            { typeof message === 'string' ?
                                <Text>{ message }</Text> : message
                            }
                        </div>
                        { isDismissible &&
                            <IconButton
                                className    = { cssMap.close }
                                iconSize     = "S"
                                iconType     = "close"
                                label        = "Close"
                                onClickClose = { onClickClose }
                                role         = "inverted" />
                        }
                    </div>
                </div>
            }
        </div>
    );
};

Tooltip.propTypes =
{
    /**
     *  Node that the Tooltip wraps
     */
    children         : PropTypes.node,
    /**
     * Extra CSS class name
     */
    className        : PropTypes.string,
    /**
     *  CSS class map
     */
    cssMap           : PropTypes.objectOf( PropTypes.string ),
    /**
     * HTML id attribute
     */
    id               : PropTypes.string,
    /**
     *  Display the tooltip as user dismissible
     */
    isDismissible    : PropTypes.bool,
    /**
     *  Display the tooltip
     */
    isVisible        : PropTypes.bool,
    /**
     *  Tooltip message text (string or JSX)
     */
    message          : PropTypes.node,
    /**
     *  Text won’t wrap to the next line
     */
    noWrap           : PropTypes.bool,
    /**
     *  Function to call on “Close” button click: ( e ) => { ... }
     */
    onClickClose     : PropTypes.func,
    /**
     *  onMouseOver callback function: ( e ) => { ... }
     */
    onMouseOver      : PropTypes.func,
    /**
     *  onMouseOut callback function: ( e ) => { ... }
     */
    onMouseOut       : PropTypes.func,
    /**
     *  Hides overflow of wrapped content
     */
    overflowIsHidden : PropTypes.bool,
    /**
     *  Tooltip position relative to wrapped component
     */
    position         : PropTypes.oneOf( [
        'left',
        'right',
        'top',
        'bottom',
        'topLeft',
        'topRight',
        'bottomLeft',
        'bottomRight',
    ] ),
    /**
     *  Tooltip role/style
     */
    role : PropTypes.oneOf( [ 'default', 'critical', 'promoted', 'warning' ] ),
};

Tooltip.defaultProps =
{
    children         : undefined,
    className        : undefined,
    cssMap           : styles,
    id               : undefined,
    isDismissible    : undefined,
    isVisible        : true,
    message          : undefined,
    noWrap           : false,
    onClickClose     : undefined,
    onMouseOut       : undefined,
    onMouseOver      : undefined,
    overflowIsHidden : false,
    position         : 'top',
    role             : 'default',
};

export default Tooltip;
