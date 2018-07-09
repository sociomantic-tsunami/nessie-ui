import React            from 'react';
import PropTypes        from 'prop-types';

import { generateId }   from '../utils';
              
import IconButton       from '../IconButton';
import Text             from '../Text';

export default class Tooltip extends React.PureComponent
{
    static propTypes =
    {
        /**
         *  Node that the Tooltip wraps
         */
        children         : PropTypes.node,
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
            'warning'
        ] )
    };

    static defaultProps =
    {
        position       : 'top',
        id             : undefined,
        isVisible      : true,
        noWrap         : false,
        overflowHidden : false,
        cssMap         : require( './tooltip.css' ),
        role           : 'default'
    };

    render()
    {
        const {
            children,
            className,
            cssMap,
            message,
            position,
            id = generateId( 'Tooltip' ),
            isDismissible,
            isVisible,
            noWrap,
            onClickClose,
            onMouseOver,
            onMouseOut,
            overflowIsHidden,
            role
        } = this.props;

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
            <Css
                cssMap   = { cssMap }
                cssProps = { { role, noWrap, position } }>
                <div
                    className    = { className }
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
            </Css>
        );
    }
}
