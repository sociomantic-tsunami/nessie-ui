import React                       from 'react';
import PropTypes                   from 'prop-types';

import Component                   from '../proto/Component';
import { buildClassName }          from '../utils';
import Icon                        from '../Icon';
import Spinner                     from '../Spinner';

export default class Button extends Component
{
    static propTypes =
    {
        /**
        *  Label text
        */
        label : PropTypes.string,
        /**
        *  HTML type attribute
        */
        type  : PropTypes.oneOf( [ 'button', 'reset', 'submit' ] ),
        /**
        *  Button role/style
        */
        role  : PropTypes.oneOf( [
            'default',
            'secondary',
            'subtle',
            'promoted',
            'critical',
            'control'
        ] ),
        /**
        *  Icon type to display (overrides customIcon)
        */
        iconType : PropTypes.oneOf( [
            'account',
            'add',
            'add-circle',
            'alert',
            'approved',
            'arrow',
            'bell',
            'board',
            'calendar',
            'close',
            'close-circle',
            'close-thick',
            'dash',
            'dashboard',
            'declined',
            'delete',
            'down',
            'download',
            'duplicate',
            'edit',
            'edit-circle',
            'ended',
            'error',
            'file',
            'graph',
            'hide',
            'info',
            'inspect',
            'left',
            'lightbulb',
            'link',
            'megaphone',
            'options',
            'pending',
            'preview',
            'puzzle-piece',
            'reset',
            'right',
            'search',
            'show',
            'star',
            'star-stroke',
            'swap',
            'table',
            'up',
            'upload',
            'validation',
            'none',
        ] ),
        /**
         *  Icon position relative to Button text
         */
        iconPosition : PropTypes.oneOf( [ 'left', 'right' ] ),
        /**
        *  Display as disabled
        */
        isDisabled   : PropTypes.bool,
        /**
        *  Display as read-only
        */
        isReadOnly   : PropTypes.bool,
        /**
        *  Display loading state
        */
        isLoading    : PropTypes.bool,
        /**
        *  Initial HTML value attribute
        */
        defaultValue : PropTypes.string,
        /**
        *  HTML value attribute
        */
        value        : PropTypes.string,
        /**
         * HTML id attribute (overwrite default)
         */
        id           : PropTypes.string,
        /**
         *  Button click callback function: ( e ) => { ... }
         */
        onClick      : PropTypes.func,
        /**
         *  Mouse over callback function: ( e ) => { ... }
         */
        onMouseOver  : PropTypes.func,
        /**
         *  Mouse out callback function: ( e ) => { ... }
         */
        onMouseOut   : PropTypes.func,
        /**
         * Display as hover when required from another component
         */
        forceHover   : PropTypes.bool,
        /**
         * Callback that receives the native <button>: ( ref ) => { ... }
         */
        buttonRef    : PropTypes.func,
    };

    static defaultProps =
    {
        type         : 'button',
        role         : 'default',
        iconType     : 'none',
        iconPosition : 'left',
        isLoading    : false,
        isDisabled   : false,
        isReadOnly   : false,
        forceHover   : false,
        cssMap       : require( './button.css' )
    };

    constructor( props )
    {
        super( props );

        this.handleMouseOver = this.handleMouseOver.bind( this );
        this.handleMouseOut  = this.handleMouseOut.bind( this );
    }

    handleMouseOver( e )
    {
        const { onMouseOver } = this.props;
        if ( onMouseOver )
        {
            onMouseOver( e );
        }

        this.setState( { isHovered: true } );
    }

    handleMouseOut( e )
    {
        const { onMouseOut } = this.props;
        if ( onMouseOut )
        {
            onMouseOut( e );
        }

        this.setState( { isHovered: false } );
    }


    render()
    {
        const {
            buttonRef,
            children,
            className,
            cssMap,
            defaultValue,
            forceHover,
            iconPosition,
            iconType,
            isDisabled,
            isReadOnly,
            isLoading,
            label,
            onClick,
            role,
            type,
            value
        } = this.props;

        const { id, isHovered } = this.state;

        let iconMarkup;
        if ( iconType && iconType !== 'none' )
        {
            iconMarkup = (
                <div className = { cssMap.iconContainer }>
                    <Icon
                        className  = { cssMap.icon }
                        type       = { iconType }
                        size       = "S"
                        theme      = { role === 'control' ? role : 'button' }
                        variant    = "stroke"
                        forceHover = { isHovered }
                        isDisabled = { isDisabled } />
                </div>
            );
        }

        const content = (
            <div className = { cssMap.content }>
                { iconMarkup }
                <div className = { cssMap.label }>
                    { children || label }
                </div>
            </div>
        );

        return (
            <div>
                <button
                    className = { buildClassName( className, cssMap, {
                        role,
                        iconPosition,
                        loading     : isLoading && !isDisabled,
                        disabled    : isDisabled,
                        fakeHovered : forceHover
                    } ) }
                    ref            = { buttonRef }
                    type           = { type }
                    id             = { id }
                    defaultValue   = { defaultValue }
                    value          = { value }
                    disabled       = { isDisabled || isLoading || isReadOnly }
                    onClick        = { onClick }
                    onMouseEnter   = { this.handleMouseOver }
                    onMouseLeave   = { this.handleMouseOut }>
                    { content }
                    { ( isLoading && !isDisabled ) &&
                        <div className = { cssMap.loadingOverlay }>
                            <Spinner className = { cssMap.spinner } />
                        </div>
                    }
                </button>
            </div>
        );
    }
}
