import React, { Component } from 'react';
import PropTypes            from 'prop-types';

import Css                  from '../hoc/Css';
import Icon                 from '../Icon';
import Tooltip              from '../Tooltip';
import Text                 from '../Text';

export default class IconWithTooltip extends Component
{
    static propTypes =
    {
        /**
        *  Node that the Tooltip wraps
        */
        children      : PropTypes.node,
        /**
         * Icon visibility
         */
        iconIsVisible : PropTypes.bool,
        /**
        *  Icon position relative to wrapped component
        */
        iconPosition  : PropTypes.oneOf( [
            'right',
            'left',
            'topRight',
            'topLeft' ] ),
        /**
        *  Icon to show
        */
        iconType : PropTypes.oneOf( [
            'info',
            'alert',
            'error',
            'approved',
            'declined',
            'pending',
            'ended',
            'validation' ] ),
        /**
         *  Icon size
         */
        iconSize         : PropTypes.oneOf( [ 'S', 'M', 'L', 'XL', 'XXL' ] ),
        /**
         * is disabled
         */
        isDisabled       : PropTypes.bool,
        /**
        *  Tooltip message text (string or JSX)
        */
        message          : PropTypes.node,
        /**
        *  Display the tooltip
        */
        tooltipIsVisible : PropTypes.bool,
        /**
        *  Tooltip position relative to the icon
        */
        tooltipPosition  : PropTypes.oneOf( [
            'left',
            'right',
            'top',
            'bottom',
            'topLeft',
            'topRight' ] ),
        /**
        *  onMouseOut callback function: ( e ) = { ... }
        */
        onMouseOut       : PropTypes.func,
        /**
        *  onMouseOver callback function: ( e ) = { ... }
        */
        onMouseOver      : PropTypes.func,
        /**
        *  Hides wrapped content overflow
        */
        overflowIsHidden : PropTypes.bool,
        /**
         *  Text won´t wrap to the next line.
         */
        noWrap           : PropTypes.bool
    };

    static defaultProps =
    {
        iconType         : 'info',
        iconSize         : 'M',
        iconIsVisible    : true,
        iconPosition     : 'right',
        isDisabled       : false,
        noWrap           : false,
        tooltipPosition  : 'top',
        tooltipIsVisible : false,
        overflowIsHidden : false,
        cssMap           : require( './iconWithTooltip.css' )
    };

    render()
    {
        const {
            children,
            className,
            cssMap,
            iconIsVisible,
            iconPosition,
            iconSize,
            iconType,
            isDisabled,
            message,
            noWrap,
            onMouseOut,
            onMouseOver,
            overflowIsHidden,
            tooltipIsVisible,
            tooltipPosition
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
            <Css
                cssMap   = { cssMap }
                cssProps = { {
                    iconVisible : iconIsVisible,
                    position    : !!children && iconPosition
                } }>
                <div className = { className }>
                    { children &&
                        <div className = { cssMap.content }>
                            { contentNode }
                        </div>
                    }
                    { iconIsVisible &&
                        <Tooltip
                            className   = { cssMap.iconWithTooltip }
                            message     = { message }
                            isVisible   = { tooltipIsVisible }
                            position    = { tooltipPosition }
                            onMouseOver = { onMouseOver }
                            onMouseOut  = { onMouseOut }>
                            <Icon
                                isDisabled = { isDisabled }
                                size       = { iconSize }
                                type       = { iconType }
                                variant    = "fill" />
                        </Tooltip>
                    }
                </div>
            </Css>
        );
    }
}
