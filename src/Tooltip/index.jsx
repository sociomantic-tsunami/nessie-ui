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
    const hasChildren = children !== undefined;

    if ( !Tooltip.didWarn.children && hasChildren )
    {
        console.warn( 'Tooltip: Using Tooltip as a wrapper is deprecated and \
‘children’ will become the tooltip content in a future major release. Please \
position the tooltip using a library such as Popper.js instead.' );
        Tooltip.didWarn.children = true;
    }

    if ( !Tooltip.didWarn.isVisible && isVisible !== undefined )
    {
        console.warn( 'Tooltip: prop ‘isVisible’ is deprecated and will be \
removed in a future major release.' );
        Tooltip.didWarn.isVisible = true;
    }

    if ( !Tooltip.didWarn.noWrap && noWrap !== undefined )
    {
        console.warn( 'Tooltip: prop ‘noWrap’ is deprecated and will be \
removed in a future major release.' );
        Tooltip.didWarn.noWrap = true;
    }

    if ( !Tooltip.didWarn.overflowIsHidden && overflowIsHidden !== undefined )
    {
        console.warn( 'Tooltip: prop ‘overflowIsHidden’ is deprecated and will \
be removed in a future major release.' );
        Tooltip.didWarn.overflowIsHidden = true;
    }


    const tooltip = (
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
                    iconTheme    = "button"
                    iconType     = "close"
                    label        = "Close"
                    onClickClose = { onClickClose } />
            }
        </div>
    );

    if ( hasChildren )
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
                { ( isVisible !== false ) &&
                    <div className = { cssMap.tooltipContainer }>
                        { tooltip }
                    </div>
                }
            </div>
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
            { tooltip }
        </div>
    );
};

Tooltip.propTypes =
{
    /**
     * Extra CSS class name
     */
    className     : PropTypes.string,
    /**
     *  CSS class map
     */
    cssMap        : PropTypes.objectOf( PropTypes.string ),
    /**
     * HTML id attribute (overwrite default)
     */
    id            : PropTypes.string,
    /**
     *  Display the tooltip as user dismissible
     */
    isDismissible : PropTypes.bool,
    /**
     *  Tooltip message text (string or JSX)
     */
    message       : PropTypes.node,
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
     *  Tooltip position relative to wrapped component
     */
    position      : PropTypes.oneOf( [
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
     *  Tooltip role/style
     */
    role : PropTypes.oneOf( [ 'default', 'critical', 'promoted', 'warning' ] ),
};

Tooltip.defaultProps =
{
    className     : undefined,
    cssMap        : styles,
    id            : undefined,
    isDismissible : undefined,
    message       : undefined,
    onClickClose  : undefined,
    onMouseOut    : undefined,
    onMouseOver   : undefined,
    position      : 'top',
    role          : 'default',
};

Tooltip.didWarn = {};

export default Tooltip;
