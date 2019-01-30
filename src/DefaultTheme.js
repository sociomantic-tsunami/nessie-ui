/*
 * Copyright (c) 2018-2019 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import classNames                from 'classnames/bind';

import buttonClasses             from './Button/button.css';
import cardClasses               from './Card/card.css';
import checkboxClasses           from './Checkbox/checkbox.css';
import datePickerClasses         from './DatePicker/datePicker.css';
import datePickerHeaderClasses   from './DatePicker/datePickerHeader.css';
import datePickerItemClasses     from './DatePicker/datePickerItem.css';
import gridClasses               from './Grid/grid.css';
import gridItemClasses           from './GridItem/gridItem.css';
import iconButtonClasses         from './IconButton/iconButton.css';
import iconClasses               from './Icon/icon.css';
import listBoxClasses            from './ListBox/listBox.css';
import listBoxOptionClasses      from './ListBox/listBoxOption.css';
import listBoxOptionGroupClasses from './ListBox/listBoxOptionGroup.css';
import modalClasses              from './Modal/modal.css';
import popupClasses              from './Popup/popup.css';
import scrollBarClasses          from './ScrollBar/scrollBar.css';
import scrollBoxClasses          from './ScrollBox/scrollBox.css';
import spinnerClasses            from './Spinner/spinner.css';
import tabButtonClasses          from './TabButton/tabButton.css';
import tabClasses                from './Tab/tab.css';
import tabsClasses               from './Tabs/tabs.css';
import tagClasses                from './Tag/tag.css';
import tagInputClasses           from './TagInput/tagInput.css';
import textClasses               from './Text/text.css';
import textInputClasses          from './TextInput/textInput.css';
import textInputWithIconClasses  from './TextInputWithIcon/textInputWithIcon.css';
import timeInputClasses          from './DatePicker/timeInput.css';
import tooltipClasses            from './Tooltip/tooltip.css';
import withDropdownClasses       from './Addons/withDropdown/withDropdown.css';


export default {
    Button : props => ( {
        main : classNames.bind( buttonClasses )(
            'default',
            {
                disabled    : props.isDisabled,
                fakeHovered : props.forceHover,
                loading     : props.isLoading && !props.isDisabled,
            },
            `iconPosition__${props.iconPosition}`,
            `role__${props.role}`,
            props.className,
        ),
        ...buttonClasses,
    } ),
    Card : props => ( {
        main : classNames.bind( cardClasses )(
            'default',
            `paddingX__${Array.isArray( props.padding ) ?
                props.padding[ 0 ] : props.padding}`,
            `paddingY__${Array.isArray( props.padding ) ?
                props.padding[ 1 ] : props.padding}`,
            props.className,
        ),
        ...cardClasses,
    } ),
    Checkbox : props => ( {
        main : classNames.bind( checkboxClasses )(
            'default',
            {
                disabled    : props.isDisabled,
                error       : !props.isDisabled && props.hasError,
                fakeHovered : !props.isDisabled && props.forceHover,
            },
            props.className,
        ),
        ...checkboxClasses,
    } ),
    DatePicker : {
        main : classNames.bind( datePickerClasses )( 'default' ),
        ...datePickerClasses,
    },
    DatePickerHeader : {
        main : classNames.bind( datePickerHeaderClasses )( 'default' ),
        ...datePickerHeaderClasses,
    },
    DatePickerItem : props => ( {
        main : classNames.bind( datePickerItemClasses )(
            'default',
            {
                disabled    : props.isDisabled,
                fakeHovered : props.forceHover,
                selected    : props.isSelected,
            },
            `type__${props.type}`,
            props.className,
        ),
        ...datePickerItemClasses,
    } ),
    Grid : props => ( {
        main : classNames.bind( gridClasses )(
            'default',
            `align__${props.align}`,
            `columnGap__${props.columnGap}`,
            `flow__${props.autoFlow}`,
            `justify__${props.justify}`,
            `rowGap__${props.rowGap}`,
            props.className,
        ),
        ...gridClasses,
    } ),
    GridItem : props => ( {
        main : classNames.bind( gridItemClasses )(
            'default',
            `align__${props.align}`,
            `justify__${props.justify}`,
            props.className,
        ),
        ...gridItemClasses,
    } ),
    Icon : props => ( {
        main : classNames.bind( iconClasses )(
            'default',
            `role__${props.role}`,
            `size__${props.size}`,
            props.className,
        ),
        ...iconClasses,
    } ),
    IconButton : props => ( {
        main : classNames.bind( iconButtonClasses )(
            'default',
            {
                background  : props.hasBackground,
                disabled    : props.isDisabled,
                fakeHovered : props.forceHover,
            },
            `role__${props.role}`,
            `size__${props.size}`,
            props.className,
        ),
        ...iconButtonClasses,
    } ),
    ListBox : {
        main : classNames.bind( listBoxClasses )( 'default' ),
        ...listBoxClasses,
    },
    ListBoxOption : props => ( {
        main : classNames.bind( listBoxOptionClasses )(
            'default',
            {
                active          : props.isActive,
                disabled        : props.isDisabled,
                selected        : props.isSelected,
                withDescription : props.description,
            },
            props.className,
        ),
        ...listBoxOptionClasses,
    } ),
    ListBoxOptionGroup : {
        main : classNames.bind( listBoxOptionGroupClasses )( 'default' ),
        ...listBoxOptionGroupClasses,
    },
    Modal : props => ( {
        main : classNames.bind( modalClasses )( 'default', props.className ),
        ...modalClasses,
    } ),
    Popup : props => ( {
        main : classNames.bind( popupClasses )(
            'default',
            { error: props.hasError },
            `padding__${props.padding}`,
            `size__${props.size}`,
            props.className,
        ),
        ...popupClasses,
    } ),
    ScrollBar : props => ( {
        main : classNames.bind( scrollBarClasses )(
            'default',
            `orientation__${props.orientation}`,
            props.className,
        ),
        ...scrollBarClasses,
    } ),
    ScrollBox : props => ( {
        main : classNames.bind( scrollBoxClasses )(
            'default',
            {
                scrollBarsAreVisible   : props.scrollBarsAreVisible,
                scrollIndicatorVariant : props.scrollIndicatorVariant,
            },
            `paddingX__${Array.isArray( props.padding ) ?
                props.padding[ 0 ] : props.padding}`,
            `paddingY__${Array.isArray( props.padding ) ?
                props.padding[ 1 ] : props.padding}`,
            `scroll__${props.scroll}`,
            props.className,
        ),
        ...scrollBoxClasses,
    } ),
    Spinner : {
        main : classNames.bind( spinnerClasses )( 'default' ),
        ...spinnerClasses,
    },
    Tab : {
        main : classNames.bind( tabClasses )( 'default' ),
        ...tabClasses,
    },
    TabButton : props => ( {
        main : classNames.bind( tabButtonClasses )(
            'default',
            { active: props.isActive },
            props.className,
        ),
        ...tabButtonClasses,
    } ),
    Tabs : props =>  ( {
        main : classNames.bind( tabsClasses )(
            'default',
            `paddingX__${Array.isArray( props.padding ) ?
                props.padding[ 0 ] : props.padding}`,
            `paddingY__${Array.isArray( props.padding ) ?
                props.padding[ 1 ] : props.padding}`,
            props.className,
        ),
        ...tabsClasses,
    } ),
    Tag : props =>  ( {
        main : classNames.bind( tagClasses )(
            'default',
            { disabled: props.isDisabled },
            props.className,
        ),
        ...tagClasses,
    } ),
    TagInput : props =>  ( {
        main : classNames.bind( tagInputClasses )(
            'default',
            {
                disabled  : props.isDisabled,
                error     : !props.isDisabled && props.hasError,
                resizable : props.isResizable,
            },
            props.className,
        ),
        ...tagInputClasses,
    } ),
    Text : props => ( {
        main : classNames.bind( textClasses )(
            'default',
            {
                allCaps        : props.allCaps,
                noWrap         : props.noWrap,
                overflowHidden : props.overflowIsHidden,
            },
            `role__${props.role}`,
            `size__${props.size}`,
            `textAlign__${props.textAlign}`,
            `variant__${props.variant}`,
            props.className,
        ),
        ...textClasses,
    } ),
    TextInput : props => ( {
        main : classNames.bind( textInputClasses )(
            'default',
            {
                disabled : props.isDisabled,
                error    : !props.isDisabled && props.hasError,
            },
            `align__${props.textAlign}`,
            props.className,
        ),
        ...textInputClasses,
    } ),
    TextInputWithIcon : props => ( {
        main : classNames.bind( textInputWithIconClasses )(
            'default',
            {
                disabled : props.isDisabled,
                error    : props.hasError,
            },
            `position__${props.iconPosition}`,
            props.className,
        ),
        ...textInputWithIconClasses,
    } ),
    TimeInput : props => ( {
        main : classNames.bind( timeInputClasses )(
            'default',
            { fakeHovered: props.forceHover },
            props.className,
        ),
        ...timeInputClasses,
    } ),
    Tooltip : props => ( {
        main : classNames.bind( tooltipClasses )(
            'default',
            { dismissible: props.isDismissible },
            `arrowPosition__${props.arrowPosition}`,
            `role__${props.role}`,
            props.className,
        ),
        ...tooltipClasses,
    } ),
    withDropdown : props => ( {
        main : classNames.bind( withDropdownClasses )(
            'default',
            { open: props.dropdownIsOpen },
            `position__${props.dropdownPosition}`,
            props.className,
        ),
        ...withDropdownClasses,
    } ),
};
