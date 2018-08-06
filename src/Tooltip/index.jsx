import React                          from 'react';
import PropTypes                      from 'prop-types';

import { generateId, buildClassName } from '../utils';
import styles                         from './tooltip.css';
import { IconButton, Text }           from '../index';

export default class Tooltip extends React.PureComponent
{
    static propTypes =
    {
        /**
         *  Node that the Tooltip wraps
         */
        children         : PropTypes.node,
        /**
         *  Extra CSS class name
         */
        className        : PropTypes.string,
        /**
         *  CSS class map
         */
        cssMap           : PropTypes.objectOf( PropTypes.string ),
        /**
         *  HTML id attribute
         */
        id               : PropTypes.string,
        /**
         *  Display a “close” button
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
         *  Wrapped content’s text won’t wrap to the next line
         */
        noWrap           : PropTypes.bool,
        /**
         *  “Close” button click callback function: ( e ) => { ... }
         */
        onClickClose     : PropTypes.func,
        /**
         *  Mouse out callback function: ( e ) => { ... }
         */
        onMouseOut       : PropTypes.func,
        /**
         *  Mouse over callback function: ( e ) => { ... }
         */
        onMouseOver      : PropTypes.func,
        /**
         *  Hides overflow of wrapped content
         */
        overflowIsHidden : PropTypes.bool,
        /**
         *  Tooltip position relative to wrapped content
         */
        position         : PropTypes.oneOf( [
            'top',
            'bottom',
            'left',
            'right',
            'topLeft',
            'topRight',
            'bottomLeft',
            'bottomRight',
            'leftTop',
            'leftBottom',
            'rightTop',
            'rightBottom',
        ] ),
        /**
         *  Tooltip role (style)
         */
        role : PropTypes.oneOf( [
            'default',
            'critical',
            'promoted',
            'warning',
        ] ),
    };

    static defaultProps =
    {
        children         : undefined,
        className        : undefined,
        cssMap           : styles,
        id               : undefined,
        isDismissible    : false,
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

    render()
    {
        const {
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
        } = this.props;

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
                                    iconTheme    = "button"
                                    iconType     = "close"
                                    label        = "Close"
                                    onClickClose = { onClickClose } />
                            }
                        </div>
                    </div>
                }
            </div>
        );
    }
}
