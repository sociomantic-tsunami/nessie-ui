import React                          from 'react';
import PropTypes                      from 'prop-types';

import { generateId, buildClassName } from '../utils';
import IconButton                     from '../IconButton';
import Text                           from '../Text';
import styles                         from './tooltip.css';

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
    let messageText = message;

    if ( typeof messageText === 'string' )
    {
        const regexp = /([^\s].{1,49}(?=\s+|$))|([^\s]{1,50})/g;

        const matches = message.match( regexp ) || [];

        messageText = (
            <Text className = { cssMap.messageText } noWrap>
                { matches.map( line => [ line, <br /> ] ) }
            </Text> );
    }


    const tooltip = (
        <div
            className = { cssMap.tooltip }
            role      = "tooltip"
            id        = { id }>
            <div className = { cssMap.message }>
                { messageText }
            </div>
            { isDismissible &&
                <div className = { cssMap.iconContainer } >
                    <IconButton
                        iconType  = "close"
                        onClick   = { onClickClose }
                        iconTheme = "button"
                        iconSize  = "M" />
                </div>
            }
        </div>
    );

    let contentNode = children;

    if ( typeof children === 'string' )
    {
        contentNode = (
            <Text
                overflowIsHidden = { overflowIsHidden }
                noWrap           = { noWrap }>
                { children }
            </Text>
        );
    }

    return (

        <div
            className = { buildClassName( className, cssMap, {
                role,
                noWrap,
                position,
            } ) }
            onMouseEnter = { onMouseOver }
            onMouseLeave = { onMouseOut }>
            { contentNode &&
                <div
                    className        = { cssMap.content }
                    aria-describedby = { isVisible ? id : null }>
                    { contentNode }
                </div>
            }
            { isVisible && tooltip }
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
     * HTML id attribute (overwrite default)
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
        'bottomRight' ] ),
    /**
     *  Tooltip role/style
     */
    role : PropTypes.oneOf( [
        'default',
        'critical',
        'promoted',
        'warning',
    ] ),
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
