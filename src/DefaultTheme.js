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
    Button : props => ( {
        main : buildClassName( props.className, buttonClasses, {
            disabled     : props.isDisabled,
            fakeHovered  : props.forceHover,
            iconPosition : props.iconPosition,
            loading      : props.isLoading && !props.isDisabled,
            role         : props.role,
        } ),
        ...buttonClasses,
    } ),
    Card : props => ( {
        main : buildClassName( props.className, cardClasses, {
            alignX   : props.align,
            alignY   : props.verticalAlign,
            paddingX : Array.isArray( props.padding ) ?
                props.padding[ 0 ] : props.padding,
            paddingY : Array.isArray( props.padding ) ?
                props.padding[ 1 ] : props.padding,
        } ),
        ...cardClasses,
    } ),
    CheckableGroup : props => ( {
        main : buildClassName( props.className, checkableGroupClasses, {
            layout : props.layout,
        } ),
        ...checkableGroupClasses,
    } ),
    Checkbox : props => ( {
        main : buildClassName( props.className, checkboxClasses, {
            disabled    : props.isDisabled,
            error       : !props.isDisabled && props.hasError,
            fakeHovered : !props.isDisabled && props.forceHover,
        } ),
        ...checkboxClasses,
    } ),
    CodeEditor : props => ( {
        main : buildClassName( props.className, codeEditorClasses, {
            disabled    : props.isDisabled,
            error       : !props.isDisabled && props.hasError,
            fakeHovered : !props.isDisabled && props.forceHover,
        } ),
        ...codeEditorClasses,
    } ),
    Column : props => ( {
        main : buildClassName( props.className, columnClasses, {
            alignX : props.align,
            alignY : props.verticalAlign,
            size   : props.size,
        } ),
        ...columnClasses,
    } ),
    DatePicker : props => ( {
        main : buildClassName( props.className, datePickerClasses ),
        ...datePickerClasses,
    } ),
    DatePickerHeader : props => ( {
        main : buildClassName( props.className, datePickerHeaderClasses ),
        ...datePickerHeaderClasses,
    } ),
    DatePickerItem : props => ( {
        main : buildClassName( props.className, datePickerItemClasses, {
            disabled    : props.isDisabled,
            fakeHovered : props.forceHover,
            selected    : props.isSelected,
            type        : props.type,
        } ),
        ...datePickerItemClasses,
    } ),
    TimeInput : props => ( {
        main : buildClassName( props.className, timeInputClasses, {
            fakeHovered : props.forceHover,
        } ),
        ...timeInputClasses,
    } ),
    DragNDrop : props => ( {
        main : buildClassName( props.className, dragNDropClasses, {
            dropzoneIsVisible : props.dropzoneIsVisible,
        } ),
        ...dragNDropClasses,
    } ),
    Dropdown : props => ( {
        main : buildClassName( props.className, dropdownClasses, {
            error   : props.hasError,
            padding : props.padding,
            size    : props.size,
        } ),
        ...dropdownClasses,
    } ),
    Fieldset : props => ( {
        main : buildClassName( props.className, fieldsetClasses ),
        ...fieldsetClasses,
    } ),
    FlounderDropdown : props => ( {
        main : buildClassName( props.className, flounderDropdownClasses, {
            error       : !props.isDisabled && props.hasError,
            fakeHovered : !props.isDisabled && props.forceHover,
            headerLevel : props.headerLevel,
            headerMode  : props.isHeader,
            toggleIcon  : props.icon,
        } ),
        ...flounderDropdownClasses,
    } ),
    Grid : props => ( {
        main : buildClassName( props.className, gridClasses, {
            alignX       : props.align,
            alignY       : props.verticalAlign,
            gutters      : props.gutters !== 'none' && props.gutters,
            hasMinHeight : props.hasMinHeight,
            spacing      : props.spacing !== 'none' && props.spacing,
            wrap         : props.hasWrap,
        } ),
        ...gridClasses,
    } ),
    H1 : props => ( {
        main : buildClassName( props.className, h1Classes, {
            role : props.role,
        } ),
        ...h1Classes,
    } ),
    H2 : props => ( {
        main : buildClassName( props.className, h2Classes, {
            role : props.role,
        } ),
        ...h2Classes,
    } ),
    H3 : props => ( {
        main : buildClassName( props.className, h3Classes, {
            role : props.role,
        } ),
        ...h3Classes,
    } ),
    H4 : props => ( {
        main : buildClassName( props.className, h4Classes, {
            role : props.role,
        } ),
        ...h4Classes,
    } ),
    Icon : props => ( {
        main : buildClassName( props.className, iconClasses, {
            role : props.role,
            size : props.size,
        } ),
        ...iconClasses,
    } ),
    IconButton : props => ( {
        main : buildClassName( props.className, iconButtonClasses, {
            background  : props.hasBackground,
            disabled    : props.isDisabled,
            fakeHovered : props.forceHover,
            role        : props.role,
            size        : props.iconSize,
        } ),
        ...iconButtonClasses,
    } ),
    IconWithTooltip : props => ( {
        main : buildClassName( props.className, iconWithTooltipClasses, {
            iconVisible : props.iconIsVisible,
            position    : !!props.children && props.iconPosition,
        } ),
        ...iconWithTooltipClasses,
    } ),
    InputField : props => ( {
        main : buildClassName( props.className, inputFieldClasses, {
            align       : props.textAlign,
            disabled    : props.isDisabled,
            error       : !props.isDisabled && props.hasError,
            fakeHovered : !props.isDisabled && props.forceHover,
            resizable   : props.element === 'textarea' && props.isResizable,
        } ),
        ...inputFieldClasses,
    } ),
    Label : props => ( {
        main : buildClassName( props.className, labelClasses ),
        ...labelClasses,
    } ),
    ListBox : props => ( {
        main : buildClassName( props.className, listBoxClasses ),
        ...listBoxClasses,
    } ),
    ListBoxOption : props => ( {
        main : buildClassName( props.className, listBoxOptionClasses, {
            active          : props.isActive,
            disabled        : props.isDisabled,
            selected        : props.isSelected,
            withDescription : !!props.description,
        } ),
        ...listBoxOptionClasses,
    } ),
    ListBoxOptionGroup : props => ( {
        main : buildClassName(
            props.className,
            listBoxOptionGroupClasses,
        ),
        ...listBoxOptionGroupClasses,
    } ),
    MessageBox : props => ( {
        main : buildClassName( props.className, messageBoxClasses, {
            type : props.messageType,
        } ),
        ...messageBoxClasses,
    } ),
    ModalDialog : props => ( {
        main : buildClassName( props.className, modalDialogClasses, {
            showNav : props.hasNavigation,
            type    : props.type,
            wide    : props.isWide,
        } ),
        ...modalDialogClasses,
    } ),
    Module : props => ( {
        main : buildClassName( props.className, moduleClasses, {
            collapsed   : props.isCollapsible && props.isCollapsed,
            collapsible : props.isCollapsible,
            error       : props.hasError,
            level       : props.headerLevel,
            moduleError : props.hasModuleError,
        } ),
        ...moduleClasses,
    } ),
    NavBar : props => ( {
        main : buildClassName( props.className, navBarClasses ),
        ...navBarClasses,
    } ),
    NavDropdown : props => ( {
        main : buildClassName( props.className, navDropdownClasses ),
        ...navDropdownClasses,
    } ),
    NavItem : props => ( {
        main : buildClassName( props.className, navItemClasses, {
            current       : props.isCurrent || props.isCurrentPage,
            disabled      : props.isDisabled,
            dropdownAlign : props.dropdownAlign,
            fakeHovered   : props.forceHover,
            hasIcon       : props.iconType !== 'none',
            open          : props.isOpen,
            role          : props.role,
        } ),
        ...navItemClasses,
    } ),
    NavList : props => ( {
        main : buildClassName( props.className, navListClasses, {
            layout : props.layout,
        } ),
        ...navListClasses,
    } ),
    NessieLogo : props => ( {
        main : buildClassName( props.className, nessieLogoClasses ),
        ...nessieLogoClasses,
    } ),
    NotificationBar : props => ( {
        main : buildClassName( props.className, notificationBarClasses, {
            top  : props.isFixed,
            type : props.messageType,
        } ),
        ...notificationBarClasses,
    } ),
    Page : props => ( {
        main : buildClassName( props.className, pageClasses, {
            overflow : props.overflow,
        } ),
        ...pageClasses,
    } ),
    PageContent : props => ( {
        main : buildClassName( props.className, pageContentClasses ),
        ...pageContentClasses,
    } ),
    PageContentHeader : props => ( {
        main : buildClassName( props.className, pageContentHeaderClasses ),
        ...pageContentHeaderClasses,
    } ),
    PageFooter : props => ( {
        main : buildClassName( props.className, pageFooterClasses ),
        ...pageFooterClasses,
    } ),
    PageHeader : props => ( {
        main : buildClassName( props.className, pageHeaderClasses ),
        ...pageHeaderClasses,
    } ),
    Paginator : props => ( {
        main : buildClassName( props.className, paginatorClasses ),
        ...paginatorClasses,
    } ),
    ProgressBar : props => ( {
        main : buildClassName( props.className, progressBarClasses ),
        ...progressBarClasses,
    } ),
    ProgressIndicator : props => ( {
        main : buildClassName( props.className, progressIndicatorClasses ),
        ...progressIndicatorClasses,
    } ),
    Radio : props => ( {
        main : buildClassName( props.className, radioClasses, {
            disabled    : props.isDisabled,
            error       : !props.isDisabled && props.hasError,
            fakeHovered : !props.isDisabled && props.forceHover,
        }  ),
        ...radioClasses,
    } ),
    ScrollBar : props => ( {
        main : buildClassName( props.className, scrollBarClasses, {
            orientation : props.orientation,
        } ),
        ...scrollBarClasses,
    } ),
    ScrollBox : props => ( {
        main : buildClassName( props.className, scrollBoxClasses, {
            paddingX : Array.isArray( props.padding ) ?
                props.padding[ 0 ] : props.padding,
            paddingY : Array.isArray( props.padding ) ?
                props.padding[ 1 ] : props.padding,
            scroll                 : props.scroll,
            scrollBarsAreVisible   : props.scrollBarsAreVisible,
            scrollIndicatorVariant : props.scrollIndicatorVariant,
        } ),
        ...scrollBoxClasses,
    } ),
    Section : props => ( {
        main : buildClassName( props.className, sectionClasses, {
            level : props.level,
        } ),
        ...sectionClasses,
    } ),
    Slider : props => ( {
        main : buildClassName( props.className, sliderClasses, {
            disabled            : props.isDisabled,
            error               : !props.isDisabled && props.hasError,
            grabbing            : props.isGrabbing,
            handleLabelPosition : props.hasHandleLabels &&
                props.handleLabelPosition,
            hasHandleLabels : props.hasHandleLabels,
            orientation     : props.orientation,
        } ),
        ...sliderClasses,
    } ),
    SliderGroup : props => ( {
        main : buildClassName( props.className, sliderGroupClasses, {
            error    : !props.isDisabled && props.hasError,
            disabled : props.isDisabled,
        } ),
        ...sliderGroupClasses,
    } ),
    Sorter : props => ( {
        main : buildClassName( props.className, sorterClasses, {
            fakeHovered   : props.forceHover,
            sort          : props.sort,
            sorterVisible : props.sorterIsVisible,
        } ),
        ...sorterClasses,
    } ),
    Spinner : props => ( {
        main : buildClassName( props.className, spinnerClasses, {
            size : props.size,
        } ),
        ...spinnerClasses,
    } ),
    StatusIndicator : props => ( {
        main : buildClassName( props.className, statusIndicatorClasses, {
            status : props.status,
        } ),
        ...statusIndicatorClasses,
    } ),
    Switch : props => ( {
        main : buildClassName( props.className, switchClasses, {
            disabled    : props.isDisabled,
            fakeHovered : !props.isDisabled && props.forceHover,
        } ),
        ...switchClasses,
    } ),
    Tab : props => ( {
        main : buildClassName( props.className, tabClasses ),
        ...tabClasses,
    } ),
    TabButton : props => ( {
        main : buildClassName( props.className, tabButtonClasses, {
            active : props.isActive,
        } ),
        ...tabButtonClasses,
    } ),
    Table : props => ( {
        main : buildClassName( props.className, tableClasses, {
            borders : props.borders,
            zebra   : props.isZebra,
        } ),
        ...tableClasses,
    } ),
    TableCell : props => ( {
        main : buildClassName( props.className, tableCellClasses, {
            header    : props.isHeader,
            rowHeader : props.isRowHeader,
            sticky    : props.isSticky,
        } ),
        ...tableCellClasses,
    } ),
    TableRow : props => ( {
        main : buildClassName( props.className, tableRowClasses, {
            active    : props.isActive,
            clickable : props.isClickable,
            sticky    : props.isSticky,
        } ),
        ...tableRowClasses,
    } ),
    Tabs : props => ( {
        main : buildClassName( props.className, tabsClasses ),
        ...tabsClasses,
    } ),
    Tag : props => ( {
        main : buildClassName( props.className, tagClasses ),
        ...tagClasses,
    } ),
    TagInput : props => ( {
        main : buildClassName( props.className, tagInputClasses, {
            disabled    : props.isDisabled,
            error       : !props.isDisabled && props.hasError,
            fakeHovered : !props.isDisabled &&
                ( props.forceHover || props.isFocused ),
            resizable : props.isResizable,
        } ),
        ...tagInputClasses,
    } ),
    Text : props => ( {
        main : buildClassName( props.className, textClasses, {
            allCaps        : props.allCaps,
            noWrap         : props.noWrap,
            overflowHidden : props.overflowIsHidden,
            role           : props.role,
            size           : props.size,
            textAlign      : props.textAlign,
            variant        : props.variant,
        } ),
        ...textClasses,
    } ),
    TextArea : props => ( {
        main : buildClassName( props.className, textAreaClasses ),
        ...textAreaClasses,
    } ),
    TextInputWithIcon : props => ( {
        main : buildClassName( props.className, textInputWithIconClasses, {
            disabled : props.isDisabled,
            error    : props.hasError,
            position : props.iconPosition,
        } ),
        ...textInputWithIconClasses,
    } ),
    ToggleButton : props => ( {
        main : buildClassName( props.className, toggleButtonClasses, {
            disabled     : props.isDisabled,
            pressed      : props.isPressed,
            iconPosition : props.iconPosition,
            role         : props.role,
        } ),
        ...toggleButtonClasses,
    } ),
    Tooltip : props => ( {
        main : buildClassName( props.className, tooltipClasses, {
            dismissible : props.isDismissible,
            position    : props.position,
            role        : props.role,
        } ),
        ...tooltipClasses,
    } ),
    Uploader : props => ( {
        main : buildClassName( props.className, uploaderClasses, {
            disabled        : props.isDisabled,
            loading         : props.isLoading,
            previewDisabled : props.previewIsDisabled,
            uploaded        : props.uploaded,
        } ),
        ...uploaderClasses,
    } ),
    ValuedTextInput : props => ( {
        main : buildClassName( props.className, valuedTextInputClasses, {
            disabled    : props.isDisabled,
            error       : props.hasError,
            fakeHovered : props.forceHover || props.isFocused,
            position    : props.valueLabelPosition,
        } ),
        ...valuedTextInputClasses,
    } ),
};
