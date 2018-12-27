/*
 * Copyright (c) 2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import classNames                from 'classnames/bind';

import buttonClasses             from './Button/button.css';
import cardClasses               from './Card/card.css';
import checkableGroupClasses     from './CheckableGroup/checkableGroup.css';
import checkboxClasses           from './Checkbox/checkbox.css';
import codeEditorClasses         from './Addons/CodeEditor/codeEditor.css';
import columnClasses             from './Column/column.css';
import datePickerClasses         from './DatePicker/datePicker.css';
import datePickerHeaderClasses   from './DatePicker/datePickerHeader.css';
import datePickerItemClasses     from './DatePicker/datePickerItem.css';
import dragNDropClasses          from './DragNDrop/dragNDrop.css';
import dropdownClasses           from './Dropdown/dropdown.css';
import fieldsetClasses           from './Fieldset/fieldset.css';
import flounderDropdownClasses   from './Addons/FlounderDropdown/flounderDropdown.css';
import gridClasses               from './Grid/grid.css';
import h1Classes                 from './H1/h1.css';
import h2Classes                 from './H2/h2.css';
import h3Classes                 from './H3/h3.css';
import h4Classes                 from './H4/h4.css';
import iconButtonClasses         from './IconButton/iconButton.css';
import iconClasses               from './Icon/icon.css';
import iconWithTooltipClasses    from './IconWithTooltip/iconWithTooltip.css';
import inputFieldClasses         from './InputField/inputField.css';
import labelClasses              from './Label/label.css';
import listBoxClasses            from './ListBox/listBox.css';
import listBoxOptionClasses      from './ListBox/listBoxOption.css';
import listBoxOptionGroupClasses from './ListBox/listBoxOptionGroup.css';
import messageBoxClasses         from './MessageBox/messageBox.css';
import modalDialogClasses        from './ModalDialog/modalDialog.css';
import moduleClasses             from './Module/module.css';
import navBarClasses             from './NavBar/navBar.css';
import navDropdownClasses        from './NavDropdown/navDropdown.css';
import navItemClasses            from './NavItem/navItem.css';
import navListClasses            from './NavList/navList.css';
import nessieLogoClasses         from './NessieLogo/nessieLogo.css';
import notificationBarClasses    from './NotificationBar/notificationBar.css';
import pageClasses               from './Page/page.css';
import pageContentClasses        from './PageContent/pageContent.css';
import pageContentHeaderClasses  from './PageContentHeader/pageContentHeader.css';
import pageFooterClasses         from './PageFooter/pageFooter.css';
import pageHeaderClasses         from './PageHeader/pageHeader.css';
import paginatorClasses          from './Paginator/paginator.css';
import progressBarClasses        from './ProgressBar/progressBar.css';
import progressIndicatorClasses  from './ProgressIndicator/progressIndicator.css';
import radioClasses              from './Radio/radio.css';
import scrollBarClasses          from './ScrollBar/scrollBar.css';
import scrollBoxClasses          from './ScrollBox/scrollBox.css';
import sectionClasses            from './Section/section.css';
import sliderClasses             from './Slider/slider.css';
import sliderGroupClasses        from './SliderGroup/sliderGroup.css';
import sorterClasses             from './Sorter/sorter.css';
import spinnerClasses            from './Spinner/spinner.css';
import statusIndicatorClasses    from './StatusIndicator/statusIndicator.css';
import switchClasses             from './Switch/switch.css';
import tabClasses                from './Tab/tab.css';
import tabButtonClasses          from './TabButton/tabButton.css';
import tableClasses              from './Table/table.css';
import tableCellClasses          from './TableCell/tableCell.css';
import tableRowClasses           from './TableRow/tableRow.css';
import tabsClasses               from './Tabs/tabs.css';
import tagClasses                from './Tag/tag.css';
import tagInputClasses           from './TagInput/tagInput.css';
import textClasses               from './Text/text.css';
import textAreaClasses           from './TextArea/textArea.css';
import textInputWithIconClasses  from './TextInputWithIcon/textInputWithIcon.css';
import timeInputClasses          from './DatePicker/timeInput.css';
import toggleButtonClasses       from './ToggleButton/toggleButton.css';
import tooltipClasses            from './Tooltip/tooltip.css';
import uploaderClasses           from './Uploader/uploader.css';
import valuedTextInputClasses    from './ValuedTextInput/valuedTextInput.css';
import withDropdownClasses       from './Addons/withDropdown/withDropdown.css';
import withStickyClasses         from './Addons/withSticky/withSticky.css';

export default {
    Button : props => ( {
        main : classNames.bind( buttonClasses )(
            'default',
            {
                disabled    : props.isDisabled,
                fakeHovered : props.forceHover,
                loading     : props.isLoading,
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
            `alignX__${props.align}`,
            `alignY__${props.verticalAlign}`,
            `paddingX__${Array.isArray( props.padding ) ?
                props.padding[ 0 ] : props.padding}`,
            `paddingY__${Array.isArray( props.padding ) ?
                props.padding[ 1 ] : props.padding}`,
                props.className,
        ),
        ...cardClasses,
    } ),
    CheckableGroup : props => ( {
        main : classNames.bind( checkableGroupClasses )(
            'default',
            `layout__${props.layout}`,
            props.className,
        ),
        ...checkableGroupClasses,
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
    CodeEditor : props => ( {
        main : classNames.bind( codeEditorClasses )(
            'default',
            {
                disabled    : props.isDisabled,
                error       : !props.isDisabled && props.hasError,
                fakeHovered : !props.isDisabled && props.forceHover,
            },
            props.className,
        ),
        ...codeEditorClasses,
    } ),
    Column : props => ( {
        main : classNames.bind( columnClasses )(
            'default',
            `alignX__${props.align}`,
            `alignY__${props.verticalAlign}`,
            `size__${props.size}`,
            props.className,
        ),
        ...columnClasses,
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
    TimeInput : props => ( {
        main : classNames.bind( datePickerItemClasses )(
            'default',
            { fakeHovered: props.forceHover },
            props.className,
        ),
        ...timeInputClasses,
    } ),
    DragNDrop : props => ( {
        main : classNames.bind( dragNDropClasses )(
            'default',
            { dropzoneIsVisible: props.dropzoneIsVisible },
            props.className,
        ),
        ...dragNDropClasses,
    } ),
    Dropdown : props => ( {
        main : classNames.bind( dropdownClasses )(
            'default',
            { error: props.hasError },
            `padding__${props.padding}`,
            `size__${props.size}`,
            props.className,
        ),
        ...dropdownClasses,
    } ),
    Fieldset : {
        main : classNames.bind( dropdownClasses )( 'default' ),
        ...fieldsetClasses,
    },
    FlounderDropdown : props => ( {
        main : classNames.bind( flounderDropdownClasses )(
            'default',
            {
                error       : !props.isDisabled && props.hasError,
                fakeHovered : !props.isDisabled && props.forceHover,
                headerMode  : props.isHeader,
            },
            `headerLevel__${props.headerLevel}`,
            `toggleIcon__${props.icon}`,
            props.className,
        ),
        ...flounderDropdownClasses,
    } ),
    Grid : props => ( {
        main : classNames.bind( gridClasses )(
            'default',
            {
                [ `gutters__${props.gutters}` ] : props.gutters !== 'none',
                [ `spacing__${props.spacing}` ] : props.spacing !== 'none',
                hasMinHeight                    : props.hasMinHeight,
                wrap                            : props.hasWrap,
            },
            `alignX__${props.align}`,
            `alignY__${props.verticalAlign}`,
            props.className,
        ),
        ...gridClasses,
    } ),
    H1 : props => ( {
        main : classNames.bind( h1Classes )(
            'default',
            `role__${props.role}`,
            props.className,
        ),
        ...h1Classes,
    } ),
    H2 : props => ( {
        main : classNames.bind( h2Classes )(
            'default',
            `role__${props.role}`,
            props.className,
        ),
        ...h2Classes,
    } ),
    H3 : props => ( {
        main : classNames.bind( h3Classes )(
            'default',
            `role__${props.role}`,
            props.className,
        ),
        ...h3Classes,
    } ),
    H4 : props => ( {
        main : classNames.bind( h4Classes )(
            'default',
            `role__${props.role}`,
            props.className,
        ),
        ...h4Classes,
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
    IconWithTooltip : props => ( {
        main : classNames.bind( iconWithTooltipClasses )(
            'default',
            {
                [ `position__${props.iconPosition}` ] : props.children,
                iconVisible                           : props.iconIsVisible,
            },
            props.className,
        ),
        ...iconWithTooltipClasses,
    } ),
    InputField : props => ( {
        main : classNames.bind( inputFieldClasses )(
            'default',
            {
                disabled    : props.isDisabled,
                error       : !props.isDisabled && props.hasError,
                fakeHovered : !props.isDisabled && props.forceHover,
                resizable   : props.element === 'textarea' && props.isResizable,
            },
            `align__${props.textAlign}`,
            props.className,
        ),
        ...inputFieldClasses,
    } ),
    Label : {
        main : classNames.bind( labelClasses )( 'default' ),
        ...labelClasses,
    },
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
    MessageBox : props => ( {
        main : classNames.bind( messageBoxClasses )(
            'default',
            `type__${props.messageType}`,
            props.className,
        ),
        ...messageBoxClasses,
    } ),
    ModalDialog : props => ( {
        main : classNames.bind( modalDialogClasses )(
            'default',
            {
                showNav : props.hasNavigation,
                wide    : props.isWide,
            },
            `type__${props.type}`,
            props.className,
        ),
        ...modalDialogClasses,
    } ),
    Module : props => ( {
        main : classNames.bind( moduleClasses )(
            'default',
            {
                collapsed   : props.isCollapsible && props.isCollapsed,
                collapsible : props.isCollapsible,
                error       : props.hasError,
                moduleError : props.hasModuleError,
            },
            `level__${props.headerLevel}`,
            props.className,
        ),
        ...moduleClasses,
    } ),
    NavBar : {
        main : classNames.bind( navBarClasses )( 'default' ),
        ...navBarClasses,
    },
    NavDropdown : {
        main : classNames.bind( navDropdownClasses )( 'default' ),
        ...navDropdownClasses,
    },
    NavItem : props => ( {
        main : classNames.bind( navItemClasses )(
            'default',
            {
                current     : props.isCurrent || props.isCurrentPage,
                disabled    : props.isDisabled,
                fakeHovered : props.forceHover,
                hasIcon     : props.iconType !== 'none',
                open        : props.isOpen,
            },
            `dropdownAlign__${props.dropdownAlign}`,
            `role__${props.role}`,
            props.className,
        ),
        ...navItemClasses,
    } ),
    NavList : props => ( {
        main : classNames.bind( navListClasses )(
            'default',
            `layout__${props.layout}`,
            props.className,
        ),
        ...navListClasses,
    } ),
    NessieLogo : {
        main : classNames.bind( nessieLogoClasses )( 'default' ),
        ...nessieLogoClasses,
    },
    NotificationBar : props => ( {
        main : classNames.bind( notificationBarClasses )(
            'default',
            { top: props.isFixed },
            `type__${props.messageType}`,
            props.className,
        ),
        ...notificationBarClasses,
    } ),
    Page : props => ( {
        main : classNames.bind( pageClasses )(
            'default',
            `overflow__${props.overflow}`,
            props.className,
        ),
        ...pageClasses,
    } ),
    PageContent : {
        main : classNames.bind( pageContentClasses )( 'default' ),
        ...pageContentClasses,
    },
    PageContentHeader : {
        main : classNames.bind( pageContentHeaderClasses )( 'default' ),
        ...pageContentHeaderClasses,
    },
    PageFooter : {
        main : classNames.bind( pageFooterClasses )( 'default' ),
        ...pageFooterClasses,
    },
    PageHeader : {
        main : classNames.bind( pageHeaderClasses )( 'default' ),
        ...pageHeaderClasses,
    },
    Paginator : {
        main : classNames.bind( paginatorClasses )( 'default' ),
        ...paginatorClasses,
    },
    ProgressBar : {
        main : classNames.bind( progressBarClasses )( 'default' ),
        ...progressBarClasses,
    },
    ProgressIndicator : {
        main : classNames.bind( progressIndicatorClasses )( 'default' ),
        ...progressIndicatorClasses,
    },
    Radio : props => ( {
        main : classNames.bind( radioClasses )(
            'default',
            {
                disabled    : props.isDisabled,
                error       : !props.isDisabled && props.hasError,
                fakeHovered : !props.isDisabled && props.forceHover,
            },
            props.className,
        ),
        ...radioClasses,
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
    Section : props => ( {
        main : classNames.bind( sectionClasses )(
            'default',
            `level__${props.level}`,
            props.className,
        ),
        ...sectionClasses,
    } ),
    Slider : props => ( {
        main : classNames.bind( sliderClasses )(
            'default',
            {
                [ `handleLabelPosition__${props.handleLabelPosition}` ] :
                    props.hasHandleLabels,
                disabled        : props.isDisabled,
                error           : !props.isDisabled && props.hasError,
                grabbing        : props.isGrabbing,
                hasHandleLabels : props.hasHandleLabels,
            },
            `orientation__${props.orientation}`,
            props.className,
        ),
        ...sliderClasses,
    } ),
    SliderGroup : {
        main : classNames.bind( sliderGroupClasses )( 'default' ),
        ...sliderGroupClasses,
    },
    Sorter : props => ( {
        main : classNames.bind( sorterClasses )(
            'default',
            {
                fakeHovered   : props.forceHover,
                sorterVisible : props.sorterIsVisible,
            },
            `sort__${props.sort}`,
            props.className,
        ),
        ...sorterClasses,
    } ),
    Spinner : props => ( {
        main : classNames.bind( spinnerClasses )(
            'default',
            `sort__${props.sort}`,
            props.className,
        ),
        ...spinnerClasses,
    } ),
    StatusIndicator : props => ( {
        main : classNames.bind( statusIndicatorClasses )(
            'default',
            `status__${props.status}`,
            props.className,
        ),
        ...statusIndicatorClasses,
    } ),
    Switch : props => ( {
        main : classNames.bind( switchClasses )(
            'default',
            {
                disabled    : props.isDisabled,
                fakeHovered : !props.isDisabled && props.forceHover,
            },
            props.className,
        ),
        ...switchClasses,
    } ),
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
    Table : props => ( {
        main : classNames.bind( tableClasses )(
            'default',
            { zebra: props.isZebra },
            `borders__${props.borders}`,
            props.className,
        ),
        ...tableClasses,
    } ),
    TableCell : props => ( {
        main : classNames.bind( tableCellClasses )(
            'default',
            {
                header    : props.isHeader,
                rowHeader : props.isRowHeader,
                sticky    : props.isSticky,
            },
            props.className,
        ),
        ...tableCellClasses,
    } ),
    TableRow : props => ( {
        main : classNames.bind( tableRowClasses )(
            'default',
            {
                active    : props.isActive,
                clickable : props.isClickable,
                sticky    : props.isSticky,
            },
            props.className,
        ),
        ...tableRowClasses,
    } ),
    Tabs : {
        main : classNames.bind( tabsClasses )( 'default' ),
        ...tabsClasses,
    },
    Tag : {
        main : classNames.bind( tagClasses )( 'default' ),
        ...tagClasses,
    },
    TagInput : props => ( {
        main : classNames.bind( tagInputClasses )(
            'default',
            {
                disabled    : props.isDisabled,
                error       : !props.isDisabled && props.hasError,
                fakeHovered : !props.isDisabled && props.forceHover,
                resizable   : props.isResizable,
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
    TextArea : {
        main : classNames.bind( textAreaClasses )( 'default' ),
        ...textAreaClasses,
    },
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
    ToggleButton : props => ( {
        main : classNames.bind( toggleButtonClasses )(
            'default',
            {
                disabled : props.isDisabled,
                pressed  : props.isPressed,
            },
            `iconPosition__${props.iconPosition}`,
            `role__${props.role}`,
            props.className,
        ),
        ...toggleButtonClasses,
    } ),
    Tooltip : props => ( {
        main : classNames.bind( tooltipClasses )(
            'default',
            { dismissible: props.isDismissible },
            `position__${props.position}`,
            `role__${props.role}`,
            props.className,
        ),
        ...tooltipClasses,
    } ),
    Uploader : props => ( {
        main : classNames.bind( uploaderClasses )(
            'default',
            {
                disabled        : props.isDisabled,
                loading         : props.isLoading,
                previewDisabled : props.previewIsDisabled,
                uploaded        : props.uploaded,
            },
            props.className,
        ),
        ...uploaderClasses,
    } ),
    ValuedTextInput : props => ( {
        main : classNames.bind( valuedTextInputClasses )(
            'default',
            {
                disabled    : props.isDisabled,
                error       : props.hasError,
                fakeHovered : props.forceHover,
            },
            `position__${props.valueLabelPosition}`,
            props.className,
        ),
        ...valuedTextInputClasses,
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
    withSticky : props => ( {
        main : classNames.bind( withStickyClasses )(
            'default',
            { sticky: props.isSticky },
            `position__${props.stickyPosition}`,
            props.className,
        ),
        ...withStickyClasses,
    } ),
};
