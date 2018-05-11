/* global document */

import React, { Component }           from 'react';
import PropTypes                      from 'prop-types';

import { ScrollBox, Text }            from '../index';
import ListBox                        from '../ListBox';
import TextInputWithIcon              from '../TextInputWithIcon';
import withDropdown                   from '../Dropdown/withDropdown';
import { generateId }                 from '../utils';
import styles                         from './comboBox.css';
import {
    addPrefix,
    buildListBoxOptions,
    getScrollParent,
    removePrefix,
} from './utils';


const InputWithDropdown = withDropdown( TextInputWithIcon );


export default class ComboBox extends Component
{
    static propTypes =
    {
        /*
         * Active option in dropdown list
         */
        activeOption          : PropTypes.string,
        /**
         * Placeholder text to show when no dropdown list options
         */
        dropdownPlaceholder   : PropTypes.string,
        /**
         * Position of the dropdown relative to the text input
         */
        dropdownPosition      : PropTypes.oneOf( [ 'top', 'bottom', 'auto' ] ),
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
         *  Input has autocomplete
         */
        hasAutocomplete       : PropTypes.bool,
        /**
         *  Display as error/invalid
         */
        hasError              : PropTypes.bool,
        /**
         *  Icon type to display
         */
        iconType              : PropTypes.oneOf( [
            'account',
            'add',
            'calendar',
            'close',
            'delete',
            'down',
            'download',
            'duplicate',
            'edit',
            'info',
            'hide',
            'inspect',
            'left',
            'link',
            'preview',
            'reset',
            'right',
            'search',
            'show',
            'up',
            'upload',
            'validation',
            'none',
        ] ),
        /**
         *  HTML id attribute (overwrite default)
         */
        id                : PropTypes.string,
        /**
         *  Dropdown list allows multiple selection
         */
        isMultiselect     : PropTypes.bool,
        /**
         *  Display as read-only
         */
        inputIsReadOnly   : PropTypes.bool,
        /**
         * Callback that receives the native <input>: ( ref ) => { ... }
         */
        inputRef          : PropTypes.func,
        /**
         * HTML type attribute for input
         */
        inputType         : PropTypes.string,
        /*
         * Input field value
         */
        inputValue        : PropTypes.string,
        /**
         *  Display as disabled
         */
        isDisabled        : PropTypes.bool,
        /*
         * Dropdown is open
         */
        isOpen            : PropTypes.bool,
        /**
         *  Label text (string or JSX node)
         */
        label             : PropTypes.node,
        /**
         *  Label position
         */
        labelPosition     : PropTypes.oneOf( [ 'top', 'left', 'right' ] ),
        /**
         *  HTML name attribute
         */
        name              : PropTypes.string,
        /**
         *  blur callback function
         */
        onBlur            : PropTypes.func,
        /**
         *  Input change callback function
         */
        onChangeInput     : PropTypes.func,
        /**
         * key down callback function
         */
        onKeyDown         : PropTypes.func,
        /**
         * key press callback function
         */
        onKeyPress        : PropTypes.func,
        /**
         * key up callback function
         */
        onKeyUp           : PropTypes.func,
        /**
         *  focus callback function
         */
        onFocus           : PropTypes.func,
        /**
         *  mouseOver callback function
         */
        onMouseOver       : PropTypes.func,
        /**
         *  mouseOut callback function
         */
        onMouseOut        : PropTypes.func,
        /**
         *  Placeholder text
         */
        inputPlaceholder  : PropTypes.string,
        /*
         * On click callback function for input
         */
        onClickInput      : PropTypes.func,
        /*
         * On click callback function for dropdown option
         */
        onClickOption     : PropTypes.func,
        /*
         * On mouse out callback function for dropdown option
         */
        onMouseOutOption  : PropTypes.func,
        /*
         * On mouse over callback function for dropdown option
         */
        onMouseOverOption : PropTypes.func,
        /*
         * On scroll dropdown list
         */
        onScroll          : PropTypes.func,
        /*
         * Dropdown list options
         */
        options           : PropTypes.arrayOf( PropTypes.object ),
        /*
         * Selected option(s) from dropdown list
         */
        selection         : PropTypes.oneOfType( [
            PropTypes.string,
            PropTypes.objectOf( PropTypes.string ),
        ] ),
    };

    static defaultProps = {
        activeOption          : undefined,
        dropdownPlaceholder   : undefined,
        dropdownPosition      : 'auto',
        errorMessageIsVisible : false,
        errorMessagePosition  : 'top',
        forceHover            : false,
        hasAutocomplete       : false,
        hasError              : false,
        iconType              : 'none',
        id                    : generateId( 'ComboBox' ),
        inputIsReadOnly       : false,
        inputPlaceholder      : undefined,
        inputRef              : undefined,
        inputType             : 'text',
        inputValue            : undefined,
        isDisabled            : false,
        isMultiselect         : false,
        isOpen                : false,
        label                 : undefined,
        labelPosition         : 'top',
        name                  : undefined,
        noOptiosText          : undefined,
        onBlur                : undefined,
        onChangeInput         : undefined,
        onClickInput          : undefined,
        onClickOption         : undefined,
        onFocus               : undefined,
        onKeyDown             : undefined,
        onKeyPress            : undefined,
        onKeyUp               : undefined,
        onMouseOut            : undefined,
        onMouseOutOption      : undefined,
        onMouseOver           : undefined,
        onMouseOverOption     : undefined,
        onScroll              : undefined,
        options               : undefined,
        selection             : undefined,
    };

    constructor( props )
    {
        super();

        const dropdownPosition = props.dropdownPosition !== 'auto' ?
            props.dropdownPosition : 'bottom';

        this.state = { dropdownPosition };

        this.handleClickOption     = this.handleClickOption.bind( this );
        this.handleMouseOutOption  = this.handleMouseOutOption.bind( this );
        this.handleMouseOverOption = this.handleMouseOverOption.bind( this );
        this.setScrollBoxRef       = this.setScrollBoxRef( this );
        this.setWrapperRef         = this.setWrapperRef.bind( this );
    }

    componentDidMount()
    {
        this.setDropdownPosition();
    }

    componentWillReceiveProps( newProps )
    {
        this.setDropdownPosition( newProps );
    }

    componentDidUpdate()
    {
        const { scrollBox } = this;
        const { activeOption, id } = this.props;

        if ( scrollBox && activeOption )
        {
            const activeEl =
                document.getElementById( addPrefix( activeOption, id ) );

            if ( activeEl && scrollBox.scrollHeight > scrollBox.offsetHeight )
            {
                const pos        = activeEl.offsetTop;
                const elHeight   = activeEl.offsetHeight;
                const contHeight = scrollBox.offsetHeight;

                const min = scrollBox.scrollTop;
                const max = min + ( scrollBox.offsetHeight - elHeight );

                if ( pos < min )
                {
                    scrollBox.scrollTop = pos;
                }
                else if ( pos > max )
                {
                    scrollBox.scrollTop = pos - ( contHeight - elHeight );
                }
            }
        }
    }

    setScrollBoxRef( ref )
    {
        if ( ref )
        {
            this.scrollBox = ref;
        }
    }

    setWrapperRef( ref )
    {
        if ( ref )
        {
            this.wrapperRef = ref;
        }
    }

    setDropdownPosition( props = this.props )
    {
        let dropdownPosition = props.dropdownPosition;

        if ( props.dropdownPosition === 'auto' )
        {
            const { wrapperRef } = this;

            if ( wrapperRef )
            {
                const scrollParent = getScrollParent( wrapperRef );
                const wrapperBox   = wrapperRef.getBoundingClientRect();
                const parentBox    = scrollParent.getBoundingClientRect();
                const { height }   = parentBox;

                const offset =
                    wrapperBox.top - parentBox.top - scrollParent.scrollTop;

                dropdownPosition = offset > height / 2 ? 'top' : 'bottom';
            }
            else
            {
                dropdownPosition = 'bottom';
            }
        }

        this.setState( { dropdownPosition } );
    }

    handleClickOption( e, optId )
    {
        const { id, onClickOption } = this.props;
        if ( onClickOption )
        {
            onClickOption( e, removePrefix( optId, id ) );
        }
    }

    handleMouseOutOption( e, optId )
    {
        const { id, onMouseOutOption } = this.props;
        if ( onMouseOutOption )
        {
            onMouseOutOption( e, removePrefix( optId, id ) );
        }
    }

    handleMouseOverOption( e, optId )
    {
        const { id, onMouseOverOption } = this.props;
        if ( onMouseOverOption )
        {
            onMouseOverOption( e, removePrefix( optId, id ) );
        }
    }


    render()
    {
        const {
            activeOption,
            dropdownPlaceholder,
            errorMessage,
            errorMessageIsVisible,
            errorMessagePosition,
            forceHover,
            hasAutocomplete,
            hasError,
            iconType,
            id,
            inputIsReadOnly,
            inputPlaceholder,
            inputRef,
            inputType,
            inputValue,
            isDisabled,
            isMultiselect,
            isOpen,
            label,
            labelPosition,
            name,
            onBlur,
            onChangeInput,
            onClickInput,
            onFocus,
            onKeyDown,
            onKeyPress,
            onKeyUp,
            onMouseOut,
            onMouseOver,
            onScroll,
            options = [],
            selection,
        } = this.props;

        const { dropdownPosition } = this.state;

        let dropdownContent;

        if ( options.length )
        {
            dropdownContent = (
                <ScrollBox
                    height       = "50vh"
                    onScroll     = { onScroll }
                    scroll       = "vertical"
                    scrollBoxRef = { this.setScrollBoxRef }>
                    <ListBox
                        activeOption      = { addPrefix( activeOption, id ) }
                        id                = { addPrefix( 'listbox', id ) }
                        isMultiselect     = { isMultiselect }
                        isFocusable       = { false }
                        onClickOption     = { this.handleClickOption }
                        onMouseOutOption  = { this.handleMouseOutOption }
                        onMouseOverOption = { this.handleMouseOverOption }
                        selection         = { addPrefix( selection, id ) }>
                        { buildListBoxOptions( options, id ) }
                    </ListBox>
                </ScrollBox>
            );
        }
        else
        {
            dropdownContent = (
                <Text
                    className = { styles.dropdownPlaceholder }
                    noWrap
                    overflowIsHidden
                    role = "subtle">
                    { dropdownPlaceholder }
                </Text>
            );
        }

        return (
            <InputWithDropdown
                aria = { {
                    autocomplete     : hasAutocomplete ? 'both' : 'list',
                    activeDescendant :
                        activeOption && addPrefix( activeOption, id ),
                    expanded : isOpen,
                    hasPopup : 'listbox',
                    owns     : addPrefix( 'listbox', id ),
                    role     : 'combobox',
                } }
                forceHover       = { forceHover || isOpen }
                hasError         = { hasError }
                iconType         = { iconType }
                id               = { id }
                inputRef         = { inputRef }
                inputType        = { inputType }
                isDisabled       = { isDisabled }
                isReadOnly       = { inputIsReadOnly }
                dropdownIsOpen   = { isOpen }
                dropdownPosition = { dropdownPosition }
                dropdownProps    = { {
                    children : dropdownContent,
                    hasError,
                    padding  : options.length ? 'none' : 'S',
                } }
                errorMessage          = { errorMessage }
                errorMessageIsVisible = { errorMessageIsVisible }
                errorMessagePosition  = { errorMessagePosition }
                label                 = { label }
                labelPosition         = { labelPosition }
                name                  = { name }
                onBlur                = { onBlur }
                onChange              = { onChangeInput }
                onClick               = { onClickInput }
                onFocus               = { onFocus }
                onKeyDown             = { onKeyDown }
                onKeyPress            = { onKeyPress }
                onKeyUp               = { onKeyUp }
                onMouseOut            = { onMouseOut }
                onMouseOver           = { onMouseOver }
                placeholder           = { inputPlaceholder }
                value                 = { inputValue }
                wrapperRef            = { this.setWrapperRef } />
        );
    }
}
