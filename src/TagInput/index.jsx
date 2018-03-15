import React, { Children, Component } from 'react';
import PropTypes                      from 'prop-types';

import { buildClassName, generateId } from '../utils';
import { buildTagsFromValues }        from './utils';
import styles                         from './tagInput.css';
import InputContainer                 from '../proto/InputContainer';


export default class TagInput extends Component
{
    static propTypes =
    {
        /**
         * Node containing Tag components ( overrides tags prop )
         */
        children              : PropTypes.node,
        /**
         *  CSS class name
         */
        className             : PropTypes.string,
        /**
         *  CSS class map
         */
        cssMap                : PropTypes.objectOf( PropTypes.string ),
        /**
         *  Tooltip message text (string or JSX)
         */
        errorMessage          : PropTypes.node,
        /**
         *  Error Tooltip is displayed
         */
        errorMessageIsVisible : PropTypes.bool,
        /**
        *  Error message position relative to the icon
        */
        errorMessagePosition  : PropTypes.oneOf( [ 'top', 'topLeft' ] ),
        /**
         * Display as hover when required from another component
         */
        forceHover            : PropTypes.bool,
        /**
        *  specifies the height for the InputContainer (CSS length value)
        */
        height                : PropTypes.string,
        /**
         *  Display as error/invalid
         */
        hasError              : PropTypes.bool,
        /**
         *  HTML id attribute (overwrite default)
         */
        id                    : PropTypes.string,
        /**
         * Callback that receives the native <input>: ( ref ) => { ... }
         */
        inputRef              : PropTypes.func,
        /**
         *  Display as disabled
         */
        isDisabled            : PropTypes.bool,
        /**
         *  Display as read-only
         */
        isReadOnly            : PropTypes.bool,
        /**
        *  Allows container to be resize by the user
        */
        isResizable           : PropTypes.bool,
        /**
         *  Label text string or JSX node
         */
        label                 : PropTypes.node,
        /**
         *  Label position
         */
        labelPosition         : PropTypes.oneOf( [ 'top', 'left', 'right' ] ),
        /**
         *  HTML name attribute
         */
        name                  : PropTypes.string,
        /**
         *  Input change callback function
         */
        onChange              : PropTypes.func,
        /**
         *  Button click callback function: ( e ) => { ... }
         */
        onClickClose          : PropTypes.func,
        /**
         * onKeyPress callback function
         */
        onKeyPress            : PropTypes.func,
        /**
         *  Input mouseOut callback function
         */
        onMouseOut            : PropTypes.func,
        /**
         *  Input mouseOver callback function
         */
        onMouseOver           : PropTypes.func,
        /**
         *  Placeholder text
         */
        placeholder           : PropTypes.string,
        /**
         * Array of strings to build Tag components
         */
        tags                  : PropTypes.arrayOf( PropTypes.oneOfType( [
            PropTypes.string,
            PropTypes.object,
        ] ) ),
    };

    static defaultProps =
    {
        children              : undefined,
        className             : undefined,
        cssMap                : styles,
        errorMessage          : undefined,
        errorMessageIsVisible : false,
        errorMessagePosition  : 'top',
        forceHover            : false,
        height                : undefined,
        hasError              : false,
        id                    : undefined,
        inputRef              : undefined,
        isDisabled            : false,
        isReadOnly            : false,
        isResizable           : false,
        label                 : undefined,
        labelPosition         : 'top',
        name                  : undefined,
        onChange              : undefined,
        onClickClose          : undefined,
        onKeyPress            : undefined,
        onMouseOut            : undefined,
        onMouseOver           : undefined,
        placeholder           : undefined,
        tags                  : undefined,
    };

    constructor()
    {
        super();
        this.state = { isFocused: false };
        this.toggleFocus = this.toggleFocus.bind( this );
    }

    toggleFocus()
    {
        this.setState( { isFocused: !this.state.isFocused  } );
    }

    render()
    {
        const {
            children,
            className,
            cssMap,
            errorMessage,
            errorMessageIsVisible,
            errorMessagePosition,
            forceHover,
            hasError,
            height,
            id = generateId( 'TagInput' ),
            inputRef,
            isDisabled,
            isReadOnly,
            isResizable,
            label,
            labelPosition,
            name,
            onChange,
            onClickClose,
            onKeyPress,
            onMouseOut,
            onMouseOver,
            placeholder,
            tags,
        } = this.props;

        const { isFocused } = this.state;

        let items = children ?
            Children.toArray( children ) : buildTagsFromValues( tags );

        items = items.map( tag =>
        {
            let handleClick;

            if ( !onClickClose )
            {
                handleClick = tag.props.onClick;
            }
            else if ( !tag.props.onClick )
            {
                handleClick =  onClickClose;
            }
            else
            {
                handleClick = ( ...args ) =>
                {
                    onClickClose( args );
                    tag.props.onClick( args );
                };
            }

            return React.cloneElement( tag, {
                ...tag.props,
                isDisabled : isDisabled || tag.props.isDisabled,
                isReadOnly : isReadOnly || tag.props.isReadOnly,
                onClick    : handleClick,
            } );
        } );

        return (
            <InputContainer
                className = { buildClassName( className, cssMap, {
                    disabled    : isDisabled,
                    error       : !isDisabled && hasError,
                    fakeHovered : !isDisabled && ( forceHover || isFocused ),
                    resizable   : isResizable,
                } ) }
                errorMessage          = { errorMessage }
                errorMessageIsVisible = { errorMessageIsVisible }
                errorMessagePosition  = { errorMessagePosition }
                hasError              = { hasError }
                id                    = { id }
                isDisabled            = { isDisabled }
                label                 = { label }
                labelPosition         = { labelPosition }
                onMouseLeave          = { onMouseOut }
                onMouseEnter          = { onMouseOver }>
                <label
                    className    = { cssMap.container }
                    htmlFor      = { id }
                    onMouseLeave = { onMouseOut }
                    onMouseEnter = { onMouseOver }
                    style        = { { height } }>
                    { items }
                    <input
                        className   = { cssMap.input }
                        disabled    = { isDisabled }
                        id          = { id }
                        name        = { name }
                        onBlur      = { this.toggleFocus }
                        onChange    = { onChange }
                        onFocus     = { this.toggleFocus }
                        onKeyPress  = { onKeyPress }
                        placeholder = { placeholder }
                        readOnly    = { isReadOnly }
                        ref         = { inputRef }
                        type        = "text" />
                </label>
            </InputContainer>
        );
    }
}
