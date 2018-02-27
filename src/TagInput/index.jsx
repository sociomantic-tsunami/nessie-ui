import React            from 'react';
import PropTypes        from 'prop-types';

import Component        from '../proto/Component';
import Css              from '../hoc/Css';
import InputContainer   from '../proto/InputContainer';
import Tag              from '../Tag';


const createEventHandler = ( func, id ) => func && ( e => func( e, id ) );


const buildTagsFromStrings = ( values = [] ) =>
    values.map( value =>
    {
        let tag;

        if ( typeof value === 'string' )
        {
            tag = <Tag key = { value } label = { value } id = { value } />;
        }
        else
        {
            tag = ( <Tag
                key     = { value.label }
                label   = { value.label }
                id      = { value.id || value.label } /> );
        }

        return tag;
    } );


export default class TagInput extends Component
{
    static propTypes =
    {
        /**
         *  Label text string or JSX node
         */
        label                 : PropTypes.node,
        /**
         *  Label position
         */
        labelPosition         : PropTypes.oneOf( [ 'top', 'left', 'right' ] ),
        /**
         *  Placeholder text
         */
        placeholder           : PropTypes.string,
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
        *  specifies the height for the InputContainer
        */
        height                : PropTypes.number,
        /**
         *  Display as error/invalid
         */
        hasError              : PropTypes.bool,
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
         *  HTML id attribute (overwrite default)
         */
        id                    : PropTypes.string,
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
         *  Input mouseOver callback function
         */
        onMouseOver           : PropTypes.func,
        /**
         *  Input mouseOut callback function
         */
        onMouseOut            : PropTypes.func,
        /**
         * Display as hover when required from another component
         */
        forceHover            : PropTypes.bool,
        /**
         * Array of strings to build Tag components
         */
        tags                  : PropTypes.arrayOf(
            PropTypes.oneOfType( [
                PropTypes.string,
                PropTypes.object
            ] ) ),
        /**
         * Node containing Tag components ( overrides tags prop )
         */
        children              : PropTypes.node,
        /**
         * Callback that receives the native <input>: ( ref ) => { ... }
         */
        inputRef              : PropTypes.func,
    };

    static defaultProps =
    {
        labelPosition         : 'top',
        isDisabled            : false,
        isReadOnly            : false,
        hasError              : false,
        errorMessageIsVisible : false,
        errorMessagePosition  : 'top',
        forceHover            : false,
        cssMap                : require( './tagInput.css' ),
    };

    constructor( props )
    {
        super( props );

        this.state = {
            ...this.state,
            isFocused : false
        };

        this.toggleFocus = this.toggleFocus.bind( this );
    }

    toggleFocus()
    {
        this.setState( { isFocused: !this.state.isFocused  } );
    }


    render()
    {
        const { className, cssMap, ...props } = this.props;

        const {
            children,
            forceHover,
            hasError,
            inputRef,
            isDisabled,
            isReadOnly,
            name,
            onChange,
            onClickClose,
            onKeyPress,
            onMouseOver,
            onMouseOut,
            placeholder,
            tags,
            isResizable,
            height
        } = props;

        const minHeight = { height: `${height}rem` };

        const { id, isFocused } = this.state;

        const tagItems = children || buildTagsFromStrings( tags );

        const updatedTagItems = tagItems && tagItems.map( tag =>
            React.cloneElement( tag, {
                ...tag.props,
                onClick    : createEventHandler( onClickClose, tag.props.id ),
                isDisabled : isDisabled || tag.props.isDisabled,
                isReadOnly : isReadOnly || tag.props.isReadOnly
            } )
        );

        return (
            <Css
                cssMap   = { cssMap }
                cssProps = { {
                    fakeHovered : !isDisabled && ( forceHover || isFocused ),
                    disabled    : isDisabled,
                    error       : !isDisabled && hasError,
                    resizable   : isResizable
                } }>
                <InputContainer
                    { ...props }
                    id          = { id }
                    className   = { className }>
                    <label
                        className = { cssMap.container }
                        style     = { minHeight }
                        htmlFor   = { id }
                        onMouseOver = { onMouseOver }
                        onMouseOut  = { onMouseOut }>
                        { updatedTagItems }
                        <input
                            ref         = { inputRef }
                            className   = { cssMap.input }
                            id          = { id }
                            name        = { name }
                            type        = "text"
                            placeholder = { placeholder }
                            onFocus     = { this.toggleFocus }
                            onBlur      = { this.toggleFocus }
                            onKeyPress  = { onKeyPress }
                            onChange    = { onChange }
                            disabled    = { isDisabled }
                            readOnly    = { isReadOnly } />
                    </label>
                </InputContainer>
            </Css>
        );
    }
}
