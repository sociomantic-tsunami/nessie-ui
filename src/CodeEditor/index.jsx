/* eslint-disable react/forbid-prop-types */

import React, { Component } from 'react';
import PropTypes            from 'prop-types';

import Css                  from '../hoc/Css';
import InputContainer       from '../proto/InputContainer';


import 'codemirror/mode/jsx/jsx';

const defaultOptions = {
    lineNumbers  : true,
    lineWrapping : true,
    theme        : 'monokai'
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
         * Input string default value
         */
        defaultValue          : PropTypes.string,
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

        if ( typeof value !== 'undefined' && codeMirror.getValue() !== value )
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

    handleCursorActivity( cm )
    {
        const { onCursorActivity } = this.props;
        if ( onCursorActivity )
        {
            onCursorActivity( this.codeMirror.getCursor() );
        }
    }

    handleChange( cm )
    {
        const { onChange } = this.props;
        if ( onChange )
        {
            onChange( cm.getValue() );
        }
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
            hasError,
            onMouseOut,
            onMouseOver,
            value,
        } = props;

        const { isFocused } = this.state;

        return (
            <Css
                cssMap   = { cssMap }
                cssProps = { {
                    error       : !isDisabled && hasError,
                    disabled    : isDisabled,
                    fakeHovered : !isDisabled && !hasError &&
                                  ( forceHover || isFocused )
                } }>
                <InputContainer { ...props } className = { className }>
                    <div
                        className   = { cssMap.editor }
                        onMouseOver = { onMouseOver }
                        onMouseOut  = { onMouseOut }>
                        <textarea
                            ref          = { ref => this.textarea = ref }
                            defaultValue = { value }
                            autoComplete = "off" />
                    </div>
                </InputContainer>
            </Css>
        );
    }
}
