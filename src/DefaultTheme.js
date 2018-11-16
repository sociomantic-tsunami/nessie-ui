/*
 * Copyright (c) 2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import button               from './Button/button.css';
import card                 from './Card/card.css';
import checkableGroup       from './CheckableGroup/checkableGroup.css';
import checkbox             from './Checkbox/checkbox.css';
import column               from './Column/column.css';
import datePicker           from './DatePicker/datePicker.css';
import datePickerHeader     from './DatePicker/datePickerHeader.css';
import datePickerItem       from './DatePicker/datePickerItem.css';
import timeInput            from './DatePicker/timeInput.css';
import dragNDrop            from './DragNDrop/dragNDrop.css';
import dropdown             from './Dropdown/dropdown.css';
import fieldset             from './Fieldset/fieldset.css';
import grid                 from './Grid/grid.css';
import h1                   from './H1/h1.css';
import h2                   from './H2/h2.css';
import h3                   from './H3/h3.css';
import h4                   from './H4/h4.css';
import icon                 from './Icon/icon.css';
import iconButton           from './IconButton/iconButton.css';
import iconWithTooltip      from './IconWithTooltip/iconWithTooltip.css';
import inputField           from './InputField/inputField.css';
import inputFrame           from './InputField/inputFrame.css';
import label                from './Label/label.css';
import listBox              from './ListBox/listBox.css';
import listBoxOption        from './ListBox/listBoxOption.css';
import listBoxOptionGroup   from './ListBox/listBoxOptionGroup.css';
import messageBox           from './MessageBox/messageBox.css';
import modalDialog          from './ModalDialog/modalDialog.css';
import module               from './Module/module.css';
import navBar               from './NavBar/navBar.css';
import navDropdown          from './NavDropdown/navDropdown.css';
import navItem              from './NavItem/navItem.css';
import navList              from './NavList/navList.css';
import nessieLogo           from './NessieLogo/nessieLogo.css';
import notificationBar      from './NotificationBar/notificationBar.css';
import page                 from './Page/page.css';
import pageContent          from './PageContent/pageContent.css';
import pageContentHeader    from './PageContentHeader/pageContentHeader.css';
import pageFooter           from './PageFooter/pageFooter.css';
import pageHeader           from './PageHeader/pageHeader.css';
import paginator            from './Paginator/paginator.css';
import progressBar          from './ProgressBar/progressBar.css';
import progressIndicator    from './ProgressIndicator/progressIndicator.css';
import checkable            from './proto/checkable.css';
import radio                from './Radio/radio.css';
import scrollBar            from './ScrollBar/scrollBar.css';
import scrollBox            from './ScrollBox/scrollBox.css';
import section              from './Section/section.css';
import slider               from './Slider/slider.css';
import sliderGroup          from './SliderGroup/sliderGroup.css';
import sorter               from './Sorter/sorter.css';
import spinner              from './Spinner/spinner.css';
import statusIndicator      from './StatusIndicator/statusIndicator.css';
import switchStyle          from './Switch/switch.css';
import tab                  from './Tab/tab.css';
import tabButton            from './TabButton/tabButton.css';
import table                from './Table/table.css';
import tableCell            from './TableCell/tableCell.css';
import tableRow             from './TableRow/tableRow.css';
import tabs                 from './Tabs/tabs.css';
import tag                  from './Tag/tag.css';
import tagInput             from './TagInput/tagInput.css';
import text                 from './Text/text.css';
import textArea             from './TextArea/textArea.css';
import textInputWithIcon    from './TextInputWithIcon/textInputWithIcon.css';
import toggleButton         from './ToggleButton/toggleButton.css';
import tooltip              from './Tooltip/tooltip.css';
import uploader             from './Uploader/uploader.css';
import valuedTextInput      from './ValuedTextInput/valuedTextInput.css';
import codeEditor           from './Addons/CodeEditor/codeEditor.css';
import flounderDropdown
    from './Addons/FlounderDropdown/flounderDropdown.css';

export default {
    Button         : button,
    Card           : card,
    CheckableGroup : checkableGroup,
    Checkbox       : checkbox,
    Column         : column,
    DatePicker     : {
        datePicker,
        datePickerHeader,
        datePickerItem,
        timeInput,
    },
    DragNDrop         : dragNDrop,
    Dropdown          : dropdown,
    Fieldset          : fieldset,
    Grid              : grid,
    H1                : h1,
    H2                : h2,
    H3                : h3,
    H4                : h4,
    Icon              : icon,
    IconButton        : iconButton,
    IconWithTooltip   : iconWithTooltip,
    InputField        : { inputField, inputFrame },
    Label             : label,
    ListBox           : { listBox, listBoxOption, listBoxOptionGroup },
    MessageBox        : messageBox,
    ModalDialog       : modalDialog,
    Module            : module,
    NavBar            : navBar,
    NavDropdown       : navDropdown,
    NavItem           : navItem,
    NavList           : navList,
    NessieLogo        : nessieLogo,
    NotificationBar   : notificationBar,
    Page              : page,
    PageContent       : pageContent,
    PageContentHeader : pageContentHeader,
    PageFooter        : pageFooter,
    PageHeader        : pageHeader,
    Paginator         : paginator,
    ProgressBar       : progressBar,
    ProgressIndicator : progressIndicator,
    Checkable         : checkable,
    Radio             : radio,
    ScrollBar         : scrollBar,
    ScrollBox         : scrollBox,
    Section           : section,
    Slider            : slider,
    SliderGroup       : sliderGroup,
    Sorter            : sorter,
    Spinner           : spinner,
    StatusIndicator   : statusIndicator,
    Switch            : switchStyle,
    Tab               : tab,
    TabButton         : tabButton,
    Table             : table,
    TableCell         : tableCell,
    TableRow          : tableRow,
    Tabs              : tabs,
    Tag               : tag,
    TagInput          : tagInput,
    Text              : text,
    TextArea          : textArea,
    TextInputWithIcon : textInputWithIcon,
    ToggleButton      : toggleButton,
    Tooltip           : tooltip,
    Uploader          : uploader,
    ValuedTextInput   : valuedTextInput,
    CodeEditor        : codeEditor,
    FlounderDropdown  : flounderDropdown,
};
