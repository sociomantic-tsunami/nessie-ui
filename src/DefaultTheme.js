/*
 * Copyright (c) 2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import { buildClassName }        from './utils';
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


export default {
    Button : {
        main : props => buildClassName( props.className, buttonClasses, {
            disabled     : props.isDisabled,
            fakeHovered  : props.forceHover,
            iconPosition : props.iconPosition,
            loading      : props.isLoading && !props.isDisabled,
            role         : props.role,
        } ),
        ...buttonClasses,
    },
    Card : {
        main : props => buildClassName( props.className, cardClasses, {
            alignX   : props.align,
            alignY   : props.verticalAlign,
            paddingX : Array.isArray( props.padding ) ?
                props.padding[ 0 ] : props.padding,
            paddingY : Array.isArray( props.padding ) ?
                props.padding[ 1 ] : props.padding,
        } ),
        ...cardClasses,
    },
    CheckableGroup : {
        main : props =>
            buildClassName( props.className, checkableGroupClasses, {
                layout : props.layout,
            } ),
        ...checkableGroupClasses,
    },
    Checkbox : {
        main : props =>
            buildClassName( props.className, checkboxClasses, {
                disabled    : props.isDisabled,
                error       : !props.isDisabled && props.hasError,
                fakeHovered : !props.isDisabled && props.forceHover,
            } ),
        ...checkboxClasses,
    },
    CodeEditor : {
        main : props => buildClassName( props.className, codeEditorClasses, {
            disabled    : props.isDisabled,
            error       : !props.isDisabled && props.hasError,
            fakeHovered : !props.isDisabled && props.forceHover,
        } ),
        ...codeEditorClasses,
    },
    Column : {
        main : props =>
            buildClassName( props.className, columnClasses, {
                alignX : props.align,
                alignY : props.verticalAlign,
                size   : props.size,
            } ),
        ...columnClasses,
    },
    DatePicker : {
        main : props => buildClassName( props.className, datePickerClasses ),
        ...datePickerClasses,
    },
    DatePickerHeader : {
        main : props =>
            buildClassName( props.className, datePickerHeaderClasses ),
        ...datePickerHeaderClasses,
    },
    DatePickerItem : {
        main : props =>
            buildClassName( props.className, datePickerItemClasses, {
                disabled    : props.isDisabled,
                fakeHovered : props.forceHover,
                selected    : props.isSelected,
                type        : props.type,
            } ),
        ...datePickerItemClasses,
    },
    TimeInput : {
        main : props =>
            buildClassName( props.className, timeInputClasses, {
                fakeHovered : props.forceHover,
            } ),
        ...timeInputClasses,
    },
    DragNDrop : {
        main : props =>
            buildClassName( props.className, dragNDropClasses, {
                dropzoneIsVisible : props.dropzoneIsVisible,
            } ),
        ...dragNDropClasses,
    },
    Dropdown : {
        main : props =>
            buildClassName( props.className, dropdownClasses, {
                error   : props.hasError,
                padding : props.padding,
                size    : props.size,
            } ),
        ...dropdownClasses,
    },
    Fieldset : {
        main : props => buildClassName( props.className, fieldsetClasses ),
        ...fieldsetClasses,
    },
    FlounderDropdown : {
        main : props => buildClassName(
            props.className,
            flounderDropdownClasses,
            {
                error       : !props.isDisabled && props.hasError,
                fakeHovered : !props.isDisabled && props.forceHover,
                headerLevel : props.headerLevel,
                headerMode  : props.isHeader,
                toggleIcon  : props.icon,
            },
        ),
        ...flounderDropdownClasses,
    },
    Grid : {
        main : props => buildClassName( props.className, gridClasses, {
            alignX       : props.align,
            alignY       : props.verticalAlign,
            gutters      : props.gutters !== 'none' && props.gutters,
            hasMinHeight : props.hasMinHeight,
            spacing      : props.spacing !== 'none' && props.spacing,
            wrap         : props.hasWrap,
        } ),
        ...gridClasses,
    },
    H1 : {
        main : props => buildClassName( props.className, h1Classes, {
            role : props.role,
        } ),
        ...h1Classes,
    },
    H2 : {
        main : props => buildClassName( props.className, h2Classes, {
            role : props.role,
        } ),
        ...h2Classes,
    },
    H3 : {
        main : props => buildClassName( props.className, h3Classes, {
            role : props.role,
        } ),
        ...h3Classes,
    },
    H4 : {
        main : props => buildClassName( props.className, h4Classes, {
            role : props.role,
        } ),
        ...h4Classes,
    },
    Icon : {
        main : props => buildClassName( props.className, iconClasses, {
            role : props.role,
            size : props.size,
        } ),
        ...iconClasses,
    },
    IconButton : {
        main : props => buildClassName( props.className, iconButtonClasses, {
            background  : props.hasBackground,
            disabled    : props.isDisabled,
            fakeHovered : props.forceHover,
            role        : props.role,
            size        : props.iconSize,
        } ),
        ...iconButtonClasses,
    },
    IconWithTooltip : {
        main : props => buildClassName(
            props.className,
            iconWithTooltipClasses,
            {
                iconVisible : props.iconIsVisible,
                position    : !!props.children && props.iconPosition,
            },
        ),
        ...iconWithTooltipClasses,
    },
    InputField : {
        main : props => buildClassName( props.className, inputFieldClasses, {
            align       : props.textAlign,
            disabled    : props.isDisabled,
            error       : !props.isDisabled && props.hasError,
            fakeHovered : !props.isDisabled && props.forceHover,
            resizable   : props.element === 'textarea' && props.isResizable,
        } ),
        ...inputFieldClasses,
    },
    Label : {
        main : props => buildClassName( props.className, labelClasses ),
        ...labelClasses,
    },
    ListBox : {
        main : props => buildClassName( props.className, listBoxClasses ),
        ...listBoxClasses,
    },
    ListBoxOption : {
        main : props => buildClassName( props.className, listBoxOptionClasses, {
            active          : props.isActive,
            disabled        : props.isDisabled,
            selected        : props.isSelected,
            withDescription : !!props.description,
        } ),
        ...listBoxOptionClasses,
    },
    ListBoxOptionGroup : {
        main : props => buildClassName(
            props.className,
            listBoxOptionGroupClasses,
        ),
        ...listBoxOptionGroupClasses,
    },
    MessageBox : {
        main : props => buildClassName( props.className, messageBoxClasses, {
            type : props.messageType,
        } ),
        ...messageBoxClasses,
    },
    ModalDialog : {
        main : props => buildClassName( props.className, modalDialogClasses, {
            showNav : props.hasNavigation,
            type    : props.type,
            wide    : props.isWide,
        } ),
        ...modalDialogClasses,
    },
    Module : {
        main : props => buildClassName( props.className, moduleClasses, {
            collapsed   : props.isCollapsible && props.isCollapsed,
            collapsible : props.isCollapsible,
            error       : props.hasError,
            level       : props.headerLevel,
            moduleError : props.hasModuleError,
        } ),
        ...moduleClasses,
    },
    NavBar : {
        main : props => buildClassName( props.className, navBarClasses ),
        ...navBarClasses,
    },
    NavDropdown : {
        main : props => buildClassName( props.className, navDropdownClasses ),
        ...navDropdownClasses,
    },
    NavItem : {
        main : props => buildClassName( props.className, navItemClasses, {
            current       : props.isCurrent || props.isCurrentPage,
            disabled      : props.isDisabled,
            dropdownAlign : props.dropdownAlign,
            fakeHovered   : props.forceHover,
            hasIcon       : props.iconType !== 'none',
            open          : props.isOpen,
            role          : props.props.role,
        } ),
        ...navItemClasses,
    },
    NavList : {
        main : props => buildClassName( props.className, navListClasses, {
            layout : props.layout,
        } ),
        ...navListClasses,
    },
    NessieLogo : {
        main : props => buildClassName( props.className, nessieLogoClasses ),
        ...nessieLogoClasses,
    },
    NotificationBar : {
        main : props => buildClassName(
            props.className,
            notificationBarClasses,
            {
                top  : props.isFixed,
                type : props.messageType,
            },
        ),
        ...notificationBarClasses,
    },
    Page : {
        main : props => buildClassName( props.className, pageClasses, {
            overflow : props.overflow,
        } ),
        ...pageClasses,
    },
    PageContent : {
        main : props => buildClassName( props.className, pageContentClasses ),
        ...pageContentClasses,
    },
    PageContentHeader : {
        main : props => buildClassName(
            props.className,
            pageContentHeaderClasses,
        ),
        ...pageContentHeaderClasses,
    },
    PageFooter : {
        main : props => buildClassName( props.className, pageFooterClasses ),
        ...pageFooterClasses,
    },
    PageHeader : {
        main : props => buildClassName( props.className, pageHeaderClasses ),
        ...pageHeaderClasses,
    },
    Paginator : {
        main : props => buildClassName( props.className, paginatorClasses ),
        ...paginatorClasses,
    },
    ProgressBar : {
        main : props => buildClassName( props.className, progressBarClasses ),
        ...progressBarClasses,
    },
    ProgressIndicator : {
        main : props => buildClassName(
            props.className,
            progressIndicatorClasses,
        ),
        ...progressIndicatorClasses,
    },
    Radio : {
        main : props => buildClassName( props.className, radioClasses, {
            disabled    : props.isDisabled,
            error       : !props.isDisabled && props.hasError,
            fakeHovered : !props.isDisabled && props.forceHover,
        }  ),
        ...checkboxClasses,
        ...radioClasses,
    },
    ScrollBar : {
        main : props => buildClassName( props.className, scrollBarClasses, {
            orientation : props.orientation,
        } ),
        ...scrollBarClasses,
    },
    ScrollBox : {
        main : props => buildClassName( props.className, scrollBoxClasses, {
            paddingX : Array.isArray( props.padding ) ?
                props.padding[ 0 ] : props.padding,
            paddingY : Array.isArray( props.padding ) ?
                props.padding[ 1 ] : props.padding,
            scroll                 : props.scroll,
            scrollBarsAreVisible   : props.scrollBarsAreVisible,
            scrollIndicatorVariant : props.scrollIndicatorVariant,
        } ),
        ...scrollBoxClasses,
    },
    Section : {
        main : props => buildClassName( props.className, sectionClasses, {
            level : props.level,
        } ),
        ...sectionClasses,
    },
    Slider : {
        main : props => buildClassName( props.className, sliderClasses, {
            disabled            : props.isDisabled,
            error               : !props.isDisabled && props.hasError,
            grabbing            : props.isGrabbing,
            handleLabelPosition : props.hasHandleLabels &&
                props.handleLabelPosition,
            hasHandleLabels : props.hasHandleLabels,
            orientation     : props.orientation,
        } ),
        ...sliderClasses,
    },
    SliderGroup : {
        main : props => buildClassName( props.className, sliderGroupClasses, {
            error    : !props.isDisabled && props.hasError,
            disabled : props.isDisabled,

        } ),
        ...sliderGroupClasses,
    },
    Sorter : {
        main : props => buildClassName( props.className, sorterClasses, {
            desc          : props.sort,
            fakeHovered   : props.forceHover,
            sort          : props.sort,
            sorterVisible : props.sorterIsVisible,
        } ),
        ...sorterClasses,
    },
    Spinner : {
        main : props => buildClassName( props.className, spinnerClasses, {
            size : props.size,
        } ),
        ...spinnerClasses,
    },
    StatusIndicator : {
        main : props => buildClassName(
            props.className,
            statusIndicatorClasses,
            { status: props.status },
        ),
        ...statusIndicatorClasses,
    },
    Switch : {
        main : props => buildClassName( props.className, switchClasses, {
            disabled    : props.isDisabled,
            fakeHovered : !props.isDisabled && props.forceHover,
        } ),
        ...switchClasses,
    },
    Tab : {
        main : props => buildClassName( props.className, tabClasses ),
        ...tabClasses,
    },
    TabButton : {
        main : props => buildClassName( props.className, tabButtonClasses, {
            active : props.isActive,
        } ),
        ...tabButtonClasses,
    },
    Table : {
        main : props => buildClassName( props.className, tableClasses, {
            borders : props.borders,
            zebra   : props.isZebra,
        } ),
        ...tableClasses,
    },
    TableCell : {
        main : props => buildClassName( props.className, tableCellClasses, {
            header    : props.isHeader,
            rowHeader : props.isRowHeader,
            sticky    : props.isSticky,
        } ),
        ...tableCellClasses,
    },
    TableRow : {
        main : props => buildClassName( props.className, tableRowClasses, {
            active    : props.isActive,
            clickable : props.isClickable,
            sticky    : props.isSticky,
        } ),
        ...tableRowClasses,
    },
    Tabs : {
        main : props => buildClassName( props.className, tabsClasses ),
        ...tabsClasses,
    },
    Tag : {
        main : props => buildClassName( props.className, tagClasses ),
        ...tagClasses,
    },
    TagInput : {
        main : props => buildClassName( props.className, tagInputClasses, {
            disabled    : props.isDisabled,
            error       : !props.isDisabled && props.hasError,
            fakeHovered : !props.isDisabled &&
                ( props.forceHover || props.isFocused ),
            resizable : props.isResizable,
        }  ),
        ...tagInputClasses,
    },
    Text : {
        main : props => buildClassName( props.className, textClasses, {
            allCaps        : props.allCaps,
            noWrap         : props.noWrap,
            overflowHidden : props.overflowIsHidden,
            role           : props.role,
            size           : props.size,
            textAlign      : props.textAlign,
            variant        : props.variant,
        } ),
        ...textClasses,
    },
    TextArea : {
        main : props => buildClassName( props.className, textAreaClasses ),
        ...textAreaClasses,
    },
    TextInputWithIcon : {
        main : props => buildClassName(
            props.className,
            textInputWithIconClasses,
            {
                disabled : props.isDisabled,
                error    : props.hasError,
                position : props.iconPosition,
            },
        ),
        ...textInputWithIconClasses,
    },
    ToggleButton : {
        main : props => buildClassName( props.className, toggleButtonClasses, {
            disabled     : props.isDisabled,
            pressed      : props.isPressed,
            iconPosition : props.iconPosition,
            role         : props.role,
        } ),
        ...toggleButtonClasses,
    },
    Tooltip : {
        main : props => buildClassName( props.className, tooltipClasses, {
            dismissible : props.isDismissible,
            position    : props.position,
            role        : props.role,
        } ),
        ...tooltipClasses,
    },
    Uploader : {
        main : props => buildClassName( props.className, uploaderClasses, {
            disabled        : props.isDisabled,
            loading         : props.isLoading,
            previewDisabled : props.previewIsDisabled,
            uploaded        : props.uploaded,
        } ),
        ...uploaderClasses,
    },
    ValuedTextInput : {
        main : props => buildClassName(
            props.className,
            valuedTextInputClasses,
            {
                disabled    : props.isDisabled,
                error       : props.hasError,
                fakeHovered : props.forceHover || props.isFocused,
                position    : props.valueLabelPosition,
            },
        ),
        ...valuedTextInputClasses,
    },
};
