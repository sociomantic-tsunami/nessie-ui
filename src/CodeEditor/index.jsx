/* eslint-disable react/forbid-prop-types */

import React, { Component } from 'react';
import PropTypes            from 'prop-types';

import { buildClassName }   from '../utils';
import InputContainer       from '../proto/InputContainer';
import styles               from './codeEditor.css';


import 'codemirror/mode/jsx/jsx';

const defaultOptions = {
    lineNumbers  : true,
    lineWrapping : true,
    theme        : 'monokai',
};

const SCROLL_CLASS = 'CodeMirror-scroll';

export default class CodeEditor extends Component
{
    static propTypes =
    {
        /**
         *  callback ref to native CodeMirror object
         */
        codeMirrorRef         : PropTypes.func,
        /**
         *  Label text string or JSX node
         */
        label                 : PropTypes.node,
        /**
         *  Label position
         */
        labelPosition         : PropTypes.oneOf( [ 'top', 'left', 'right' ] ),
        /**
         *  Code editor height (CSS length value)
         */
        height                : PropTypes.string,
        /**
         *  Code editor max height (CSS length value)
         */
        maxHeight             : PropTypes.string,
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
        errorMessagePosition  : PropTypes.oneOf( [
            'top',
            'topLeft',
            'topRight',
            'bottom',
            'bottomLeft',
            'bottomRight',
            'left',
            'leftTop',
            'leftBottom',
            'right',
            'rightTop',
            'rightBottom',
        ] ),
        /**
         * Input string default value
         */
        defaultValue : PropTypes.string,
        /**
         * Input string value
         */
        value        : PropTypes.string,
        /**
         * HTML id attribute (overwrite default)
         */
        onChange     : PropTypes.func,
        /**
         * Handles CodeMirror focus event
         */
        onFocus      : PropTypes.func,
        /**
         * Handles CodeMirror blur event
         */
        onBlur       : PropTypes.func,
        /**
         * Handles component mouseover event
         */
        onMouseOver  : PropTypes.func,
        /**
         * Handles component mouseout event
         */
        onMouseOut   : PropTypes.func,
        /**
         * Codemirror options object
         */
        options      : PropTypes.object,
        /**
         * Display as hover when required from another component
         */
        forceHover   : PropTypes.bool,
        /**
         * cursor position: { line, ch }
         */
        cursor       : PropTypes.shape( {
            line : PropTypes.number,
            ch   : PropTypes.number,
        } ),
        /**
         * onCursorActivity callback function: ( cursor ) => { ... }
         */
        onCursorActivity : PropTypes.func,
    };

    static defaultProps =
    {
        cssMap                : styles,
        errorMessageIsVisible : false,
        errorMessagePosition  : 'top',
        forceHover            : false,
        hasError              : false,
        height                : undefined,
        isDisabled            : false,
        isReadOnly            : false,
        labelPosition         : 'top',
        maxHeight             : undefined,
    };

    constructor( props )
    {
        super( props );

        this.state = { ...this.state, isFocused: false };

        this.handleFocus          = this.handleFocus.bind( this );
        this.handleBlur           = this.handleBlur.bind( this );
        this.handleChange         = this.handleChange.bind( this );
        this.handleCursorActivity = this.handleCursorActivity.bind( this );
        this.handleTextareaRef    = this.handleTextareaRef.bind( this );
        this.handleWrapperRef     = this.handleWrapperRef.bind( this );
    }

    componentDidMount()
    {
        const {
            codeMirrorRef,
            cursor,
            defaultValue,
            isDisabled,
            isReadOnly,
            options,
            value = '',
        } = this.props;

        const combinedOptions = {
            ...defaultOptions,
            ...options,
            readOnly : ( isDisabled && 'nocursor' ) || isReadOnly,
        };

        const codeMirrorInstance = require( 'codemirror' );

        const codeMirror = codeMirrorInstance.fromTextArea( this.textarea, combinedOptions );

        codeMirror.setValue( defaultValue || value );

        codeMirror.on( 'change', this.handleChange );
        codeMirror.on( 'cursorActivity', this.handleCursorActivity );
        codeMirror.on( 'focus', this.handleFocus );
        codeMirror.on( 'blur', this.handleBlur );

        if ( cursor )
        {
            codeMirror.setCursor( cursor );
        }

        if ( codeMirrorRef )
        {
            codeMirrorRef( codeMirror );
        }

        this.codeMirror = codeMirror;

        this.setMaxHeight();
    }

    componentWillUpdate( nextProps )
    {
        const { codeMirror } = this;
        const { codeMirrorRef } = this.props;

        if ( nextProps.codeMirrorRef !== codeMirrorRef )
        {
            if ( codeMirrorRef )
            {
                codeMirrorRef( null );
            }

            if ( nextProps.codeMirrorRef )
            {
                nextProps.codeMirrorRef( codeMirror );
            }
        }
    }


    componentDidUpdate()
    {
        const {
            cursor,
            isDisabled,
            isReadOnly,
            options = {},
            value,
        } = this.props;

        const { codeMirror } = this;

        const combinedOptions = {
            ...defaultOptions,
            ...options,
            readOnly : ( isDisabled && 'nocursor' ) || isReadOnly,
        };

        Object.keys( combinedOptions ).forEach( option =>
            codeMirror.setOption( option, combinedOptions[ option ] ) );

        if ( typeof value !== 'undefined' && codeMirror.getValue() !== value )
        {
            codeMirror.setValue( value || '' );
            const that = this;
            setTimeout( () =>
            {
                that.codeMirror.refresh();
            }, 1 );
        }

        if ( cursor )
        {
            codeMirror.setCursor( cursor );
        }

        this.setMaxHeight();
    }

    componentWillUnmount()
    {
        const { codeMirror } = this;
        const { codeMirrorRef } = this.props;

        codeMirror.toTextArea();

        if ( codeMirrorRef )
        {
            codeMirrorRef( null );
        }
    }

    setMaxHeight()
    {
        const { wrapper }   = this;
        const { maxHeight } = this.props;

        if ( wrapper && maxHeight )
        {
            const scrollEl =
                wrapper.getElementsByClassName( SCROLL_CLASS )[ 0 ];

            scrollEl.style.maxHeight = String( maxHeight );
        }
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
            onCursorActivity( this.codeMirror.getCursor() );
        }
    }

    handleChange( cm, change )
    {
        const { onChange } = this.props;
        if ( onChange && change.origin !== 'setValue' )
        {
            onChange( cm.getValue() );
        }
    }

    handleTextareaRef( ref )
    {
        if ( ref )
        {
            this.textarea = ref;
        }
    }

    handleWrapperRef( ref )
    {
        if ( ref )
        {
            this.wrapper = ref;
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
            hasError,
            height,
            isDisabled,
            maxHeight,
            value,
        } = props;

        const { isFocused } = this.state;

        return (
            <InputContainer
                { ...props }
                className = { buildClassName( className, cssMap, {
                    error       : !isDisabled && hasError,
                    disabled    : isDisabled,
                    fakeHovered : !isDisabled && ( forceHover || isFocused ),
                } ) }>
                <div
                    className = { cssMap.editor }
                    ref       = { this.handleWrapperRef }
                    style     = { {
                        height    : String( height ),
                        maxHeight : String( maxHeight ),
                    } }>
                    <textarea
                        ref          = { this.handleTextareaRef }
                        defaultValue = { value }
                        autoComplete = "off" />
                </div>
            </InputContainer>
        );
    }
}
