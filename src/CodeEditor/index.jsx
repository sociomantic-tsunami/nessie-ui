/* eslint-disable react/forbid-prop-types */

import React, { Component } from 'react';
import PropTypes            from 'prop-types';
import CodeMirror           from 'react-codemirror';

import Css                  from '../hoc/Css';
import InputContainer       from '../proto/InputContainer';

import 'codemirror/mode/jsx/jsx';

const defaultOptions = {
    lineNumbers  : true,
    lineWrapping : true
};

export default class CodeEditor extends Component
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
         *  Display as disabled
         */
        isDisabled            : PropTypes.bool,
         /**
         *  Display as read-only
         */
        isReadOnly            : PropTypes.bool,
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
         * Input string value
         */
        value                 : PropTypes.string,
        /**
         * HTML id attribute (overwrite default)
         */
        onChange              : PropTypes.func,
        /**
         * Handles CodeMirror focus event
         */
        onFocus               : PropTypes.func,
        /**
         * Handles CodeMirror blur event
         */
        onBlur                : PropTypes.func,
        /**
         * Handles component mouseover event
         */
        onMouseOver           : PropTypes.func,
        /**
         * Handles component mouseout event
         */
        onMouseOut            : PropTypes.func,
        /**
         * Codemirror options object
         */
        options               : PropTypes.object,
        /**
         * Display as hover when required from another component
         */
        forceHover            : PropTypes.bool,
        /**
         * cursor position: { line, ch }
         */
        cursor                : PropTypes.shape( {
            line : PropTypes.number,
            ch   : PropTypes.number
        } ),
        /**
         * onCursorActivity callback function: ( cursor ) => { ... }
         */
        onCursorActivity : PropTypes.func,

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
        cssMap                : require( './codeEditor.css' )
    };

    constructor( props )
    {
        super( props );
        this.state = { ...this.state, isFocused: false };

        this.handleFocus          = this.handleFocus.bind( this );
        this.handleBlur           = this.handleBlur.bind( this );
        this.handleChange         = this.handleChange.bind( this );
        this.handleCursorActivity = this.handleCursorActivity.bind( this );

        this.handleRef = this.handleRef.bind( this );
    }

    componentDidMount()
    {
        const {
            cursor,
            defaultValue,
            isDisabled,
            isReadOnly,
            options,
            value = ''
        } = this.props;

        const combinedOptions = {
            ...defaultOptions,
            ...options,
            readOnly : ( isDisabled && 'nocursor' ) || isReadOnly
        };

        const codeMirrorInstance = require( 'codemirror' );

        const codeMirror = codeMirrorInstance.fromTextArea(
            this.textarea, combinedOptions );

        codeMirror.setValue( defaultValue || value );

        codeMirror.on( 'change', this.handleChange );
        codeMirror.on( 'cursorActivity', this.handleCursorActivity );
        codeMirror.on( 'focus', this.handleFocus );
        codeMirror.on( 'blur', this.handleBlur );

        if ( cursor )
        {
            codeMirror.setCursor( cursor );
        }

        this.codeMirror = codeMirror;
    }


    componentDidUpdate()
    {
        const {
            cursor,
            isDisabled,
            isReadOnly,
            options = {},
            value
        } = this.props;

        const { codeMirror } = this;

        const combinedOptions = {
            ...defaultOptions,
            ...options,
            readOnly : ( isDisabled && 'nocursor' ) || isReadOnly
        };

        Object.keys( combinedOptions ).forEach( option =>
            codeMirror.setOption( option, combinedOptions[ option ] ) );

        if ( typeof value !== 'undefined' )
        {
            codeMirror.setValue( value || '' );
        }

        if ( cursor )
        {
            codeMirror.setCursor( cursor );
        }
    }

    componentWillUnmount()
    {
        this.codeMirror.toTextArea();
    }

    handleRef( ref )
    {
        this.textarea = ref;
    }

    handleFocus( cm )
    {
        this.setState( { isFocused: true } );

        const { onFocus } = this.props;
        if ( onFocus )
        {
            onFocus( cm );
        }
    }

    handleBlur( cm )
    {
        this.setState( { isFocused: false } );

        const { onBlur } = this.props;
        if ( onBlur )
        {
            onBlur( cm );
        }
    }

    handleCursorActivity()
    {
        const { onCursorActivity } = this.props;
        if ( onCursorActivity )
        {
            codeMirror.on( 'cursorActivity', () =>
                onCursorActivity( codeMirror.getCursor() ) );
        }
    }

    handleFocusChange( f )
    {
        this.setState( { isFocused: f } );
    }


    render()
    {
        const {
            className,
            cssMap,
            options,
            ...props
        } = this.props;

        const {
            forceHover,
            isDisabled,
            isReadOnly,
            hasError,
            onMouseOut,
            onMouseOver
        } = props;

        const { isFocused } = this.state;

        const combinedOptions = {
            ...defaultOptions,
            ...options,
            readOnly : ( isDisabled && 'nocursor' ) || isReadOnly
        };

        return (
            <Css
                cssMap   = { cssMap }
                cssProps = { {
                    error       : !isDisabled && hasError,
                    disabled    : isDisabled,
                    fakeHovered : !isDisabled && !hasError &&
                                  ( forceHover || isFocused )
                } }>
                <InputContainer
                    { ...props }
                    className = { className }>
                    <div
                        className   = { cssMap.container }
                        onMouseOver = { onMouseOver }
                        onMouseOut  = { onMouseOut }>
                        <textarea
                            ref          = { this.handleRef }
                            defaultValue = { value }
                            autoComplete = "off" />
                    </div>
                </InputContainer>
            </Css>
        );
    }
}
