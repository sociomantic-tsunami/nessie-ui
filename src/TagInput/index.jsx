import React            from 'react';
import PropTypes        from 'prop-types';

import Component        from '../proto/Component';
import Css              from '../hoc/Css';
import InputContainer   from '../proto/InputContainer';
import Tag              from '../Tag';


const isTag = node => React.isValidElement( node ) && node.type.name === 'Tag';

const filterTags = node => React.Children.toArray( node ).filter( isTag );


const buildTagsFromStrings = ( strings = [] ) =>
    strings.map( string => <Tag key = { string } label = { string } /> );


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
         * onKeyPress callback function
         */
        onKeyPress            : PropTypes.func,
        /**
         * Display as hover when required from another component
         */
        forceHover            : PropTypes.bool,
        /**
         * Array of strings to build Tag components
         */
        tags                  : PropTypes.arrayOf( PropTypes.string ),
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
            onKeyPress,
            placeholder,
            tags,
            isResizable,
            height
        } = props;

        const minHeight = { height: `${height}rem` };

        const { id, isFocused } = this.state;

        const tagItems = children ? filterTags( children ) :
            buildTagsFromStrings( tags );

        const updatedTagItems = tagItems.map( tag =>
            React.cloneElement( tag, {
                ...tag.props,
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
                    id        = { id }
                    className = { className }>
                    <div
                        className = { cssMap.container }
                        style     = { minHeight }>
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
                            disabled    = { isDisabled }
                            readOnly    = { isReadOnly } />
                    </div>
                </InputContainer>
            </Css>
        );
    }
}
