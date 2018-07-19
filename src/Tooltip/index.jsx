import React      from 'react';
import PropTypes  from 'prop-types';
import isEqual    from 'lodash.isequal';

import Component  from '../proto/Component';
import Css        from '../hoc/Css';
import IconButton from '../IconButton';
import Text       from '../Text';

export default class Tooltip extends Component
{
    static propTypes =
    {
        /**
         *  Node that the Tooltip wraps
         */
        children         : PropTypes.node,
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
        isVisible      : true,
        noWrap         : false,
        overflowHidden : false,
        cssMap         : require( './tooltip.css' ),
        role           : 'default'
    };

    constructor( props )
    {
        super( props );

        this.state = {
            ...this.state,
            width : 0
        };

        this.updateGhostRef = this.updateGhostRef.bind( this );
    }

    componentDidMount()
    {
        this.mounted = true;
        this.setFilledTextareaHeight();
    }

    componentDidUpdate( prevProps )
    {
        if ( !isEqual( this.props, prevProps ) )
        {
            this.setFilledTextareaHeight();
        }
    }

    componentWillUnmount()
    {
        this.mounted = false;
    }

    setFilledTextareaHeight()
    {
        if ( this.mounted )
        {
            const element = this.ghost.children[ 0 ];

            this.setState( {
                width : element.clientWidth + 1
            } );
        }
    }

    updateGhostRef( ref )
    {
        this.ghost = ref;
    }

    renderTooltip( tooltipOpts, useStateWidth = false )
    {
        const {
            cssMap,
            message,
            isDismissible,
            onClickClose
        } = tooltipOpts;
        const { id, width } = this.state;

        const style = useStateWidth ? { width } : {};

        return (
            <div
                style     = { style }
                className = { cssMap.tooltip }
                role      = "tooltip"
                id        = { id }>
                <div className = { cssMap.message }>
                    { message }
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
    }

    renderGhost( tooltipOpts )
    {
        const { cssMap } = tooltipOpts;

        return (
            <div
                className   = { cssMap.ghost }
                ref         = { this.updateGhostRef }
                aria-hidden = "true"
            >
                { this.renderTooltip( tooltipOpts ) }
            </div>
        );
    }

    render()
    {
        const {
            children,
            className,
            cssMap,
            position,
            isDismissible,
            isVisible,
            message,
            noWrap,
            onClickClose,
            onMouseOver,
            onMouseOut,
            overflowIsHidden,
            role
        } = this.props;

        const { id } = this.state;

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

        let messageText = message;

        if ( typeof messageText === 'string' )
        {
            messageText = (
                <Text className = { cssMap.messageText }>
                    { messageText }
                </Text> );
        }

        const tooltipOpts = {
            message : messageText,
            cssMap,
            isDismissible,
            onClickClose
        };

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
                    { isVisible && this.renderTooltip( tooltipOpts, true ) }
                    { this.renderGhost( tooltipOpts ) }
                </div>
            </Css>
        );
    }
}
