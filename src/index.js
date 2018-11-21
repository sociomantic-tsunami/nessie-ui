/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import withTheme                from './Theming/withTheme';
import Button                   from './Button';
import Card                     from './Card';
import CheckableGroup           from './CheckableGroup';
import Checkbox                 from './Checkbox';
import CheckboxGroup            from './CheckboxGroup';
import Column                   from './Column';
import ComboBox                 from './ComboBox';
import DatePicker               from './DatePicker';
import DateTimeInput            from './DateTimeInput';
import DimensionsInput          from './DimensionsInput';
import DragNDrop                from './DragNDrop';
import Dropdown                 from './Dropdown';
import Fieldset                 from './Fieldset';
import Grid                     from './Grid';
import H1                       from './H1';
import H2                       from './H2';
import H3                       from './H3';
import H4                       from './H4';
import Icon                     from './Icon';
import IconButton               from './IconButton';
import IconWithTooltip          from './IconWithTooltip';
import InputField               from './InputField';
import Label                    from './Label';
import ListBox                  from './ListBox';
import MessageBox               from './MessageBox';
import ModalDialog              from './ModalDialog';
import Module                   from './Module';
import NavBar                   from './NavBar';
import NavDropdown              from './NavDropdown';
import NavItem                  from './NavItem';
import NavList                  from './NavList';
import NessieLogo               from './NessieLogo';
import NotificationBar          from './NotificationBar';
import Page                     from './Page';
import PageContent              from './PageContent';
import PageContentHeader        from './PageContentHeader';
import PageFooter               from './PageFooter';
import PageHeader               from './PageHeader';
import Paginator                from './Paginator';
import PasswordInput            from './PasswordInput';
import ProgressBar              from './ProgressBar';
import ProgressIndicator        from './ProgressIndicator';
import Radio                    from './Radio';
import RadioGroup               from './RadioGroup';
import Row                      from './Row';
import ScrollBar                from './ScrollBar';
import ScrollBox                from './ScrollBox';
import Section                  from './Section';
import Slider                   from './Slider';
import SliderGroup              from './SliderGroup';
import Sorter                   from './Sorter';
import Spinner                  from './Spinner';
import SpriteMap                from './SpriteMap';
import StatusIndicator          from './StatusIndicator';
import Switch                   from './Switch';
import Tab                      from './Tab';
import TabButton                from './TabButton';
import Table                    from './Table';
import TableCell                from './TableCell';
import TableRow                 from './TableRow';
import Tabs                     from './Tabs';
import Tag                      from './Tag';
import TagInput                 from './TagInput';
import Text                     from './Text';
import TextArea                 from './TextArea';
import TextInput                from './TextInput';
import TextInputWithIcon        from './TextInputWithIcon';
import ToggleButton             from './ToggleButton';
import Tooltip                  from './Tooltip';
import Uploader                 from './Uploader';
import ValuedTextInput          from './ValuedTextInput';


const styledButton              = withTheme( Button );
const styledCard                = withTheme( Card );
const styledCheckableGroup      = withTheme( CheckableGroup );
const styledCheckbox            = withTheme( Checkbox );
const styledColumn              = withTheme( Column );
const styledDatePicker          = withTheme( DatePicker );
const styledDragNDrop           = withTheme( DragNDrop );
const styledDropdown            = withTheme( Dropdown );
const styledFieldset            = withTheme( Fieldset );
const styledGrid                = withTheme( Grid );
const styledH1                  = withTheme( H1 );
const styledH2                  = withTheme( H2 );
const styledH3                  = withTheme( H3 );
const styledH4                  = withTheme( H4 );
const styledIcon                = withTheme( Icon );
const styledIconButton          = withTheme( IconButton );
const styledIconWithTooltip     = withTheme( IconWithTooltip );
const styledInputField          = withTheme( InputField );
const styledLabel               = withTheme( Label );
const styledListBox             = withTheme( ListBox );
const styledMessageBox          = withTheme( MessageBox );
const styledModalDialog         = withTheme( ModalDialog );
const styledModule              = withTheme( Module );
const styledNavBar              = withTheme( NavBar );
const styledNavDropdown         = withTheme( NavDropdown );
const styledNavItem             = withTheme( NavItem );
const styledNavList             = withTheme( NavList );
const styledNessieLogo          = withTheme( NessieLogo );
const styledNotificationBar     = withTheme( NotificationBar );
const styledPage                = withTheme( Page );
const styledPageContent         = withTheme( PageContent );
const styledPageContentHeader   = withTheme( PageContentHeader );
const styledPageFooter          = withTheme( PageFooter );
const styledPageHeader          = withTheme( PageHeader );
const styledPaginator           = withTheme( Paginator );
const styledProgressBar         = withTheme( ProgressBar );
const styledProgressIndicator   = withTheme( ProgressIndicator );
const styledRadio               = withTheme( Radio );
const styledScrollBar           = withTheme( ScrollBar );
const styledScrollBox           = withTheme( ScrollBox );
const styledSection             = withTheme( Section );
const styledSlider              = withTheme( Slider );
const styledSliderGroup         = withTheme( SliderGroup );
const styledSorter              = withTheme( Sorter );
const styledSpinner             = withTheme( Spinner );
const styledStatusIndicator     = withTheme( StatusIndicator );
const styledSwitch              = withTheme( Switch );
const styledTab                 = withTheme( Tab );
const styledTabButton           = withTheme( TabButton );
const styledTable               = withTheme( Table );
const styledTableCell           = withTheme( TableCell );
const styledTableRow            = withTheme( TableRow );
const styledTabs                = withTheme( Tabs );
const styledTag                 = withTheme( Tag );
const styledTagInput            = withTheme( TagInput );
const styledText                = withTheme( Text );
const styledTextArea            = withTheme( TextArea );
const styledTextInputWithIcon   = withTheme( TextInputWithIcon );
const styledToggleButton        = withTheme( ToggleButton );
const styledTooltip             = withTheme( Tooltip );
const styledUploader            = withTheme( Uploader );
const styledValuedTextInput     = withTheme( ValuedTextInput );


export {
    styledButton                as Button,
    styledCard                  as Card,
    styledCheckableGroup        as CheckableGroup,
    styledCheckbox              as Checkbox,
    CheckboxGroup,
    styledColumn                as Column,
    ComboBox,
    styledDatePicker            as DatePicker,
    DateTimeInput,
    DimensionsInput,
    styledDragNDrop             as DragNDrop,
    styledDropdown              as Dropdown,
    styledFieldset              as Fieldset,
    styledGrid                  as Grid,
    styledH1                    as H1,
    styledH2                    as H2,
    styledH3                    as H3,
    styledH4                    as H4,
    styledIcon                  as Icon,
    styledIconButton            as IconButton,
    styledIconWithTooltip       as IconWithTooltip,
    styledInputField            as InputField,
    styledLabel                 as Label,
    styledListBox               as ListBox,
    styledMessageBox            as MessageBox,
    styledModalDialog           as ModalDialog,
    styledModule                as Module,
    styledNavBar                as NavBar,
    styledNavDropdown           as NavDropdown,
    styledNavItem               as NavItem,
    styledNavList               as NavList,
    styledNessieLogo            as NessieLogo,
    styledNotificationBar       as NotificationBar,
    styledPage                  as Page,
    styledPageContent           as PageContent,
    styledPageContentHeader     as PageContentHeader,
    styledPageFooter            as PageFooter,
    styledPageHeader            as PageHeader,
    styledPaginator             as Paginator,
    styledProgressBar           as ProgressBar,
    styledProgressIndicator     as ProgressIndicator,
    styledRadio                 as Radio,
    RadioGroup,
    Row,
    styledScrollBar             as ScrollBar,
    styledScrollBox             as ScrollBox,
    styledSection               as Section,
    styledSlider                as Slider,
    styledSliderGroup           as SliderGroup,
    styledSorter                as Sorter,
    styledSpinner               as Spinner,
    SpriteMap,
    styledStatusIndicator       as StatusIndicator,
    styledSwitch                as Switch,
    styledTab                   as Tab,
    styledTabButton             as TabButton,
    styledTable                 as Table,
    styledTableCell             as TableCell,
    styledTableRow              as TableRow,
    styledTabs                  as Tabs,
    styledTag                   as Tag,
    styledTagInput              as TagInput,
    styledText                  as Text,
    styledTextArea              as TextArea,
    TextInput,
    styledTextInputWithIcon     as TextInputWithIcon,
    styledToggleButton          as ToggleButton,
    styledTooltip               as Tooltip,
    styledUploader              as Uploader,
    styledValuedTextInput       as ValuedTextInput,
};


export default {
    Button            : withTheme( Button ),
    Card              : withTheme( Card ),
    CheckableGroup    : withTheme( CheckableGroup ),
    Checkbox          : withTheme( Checkbox ),
    CheckboxGroup,
    Column            : withTheme( Column ),
    ComboBox,
    DatePicker        : withTheme( DatePicker ),
    DateTimeInput,
    DimensionsInput,
    DragNDrop         : withTheme( DragNDrop ),
    Dropdown          : withTheme( Dropdown ),
    Fieldset          : withTheme( Fieldset ),
    Grid              : withTheme( Grid ),
    H1                : withTheme( H1 ),
    H2                : withTheme( H2 ),
    H3                : withTheme( H3 ),
    H4                : withTheme( H4 ),
    Icon              : withTheme( Icon ),
    IconButton        : withTheme( IconButton ),
    IconWithTooltip   : withTheme( IconWithTooltip ),
    InputField        : withTheme( InputField ),
    Label             : withTheme( Label ),
    ListBox           : withTheme( ListBox ),
    MessageBox        : withTheme( MessageBox ),
    ModalDialog       : withTheme( ModalDialog ),
    Module            : withTheme( Module ),
    NavBar            : withTheme( NavBar ),
    NavDropdown       : withTheme( NavDropdown ),
    NavItem           : withTheme( NavItem ),
    NavList           : withTheme( NavList ),
    NessieLogo        : withTheme( NessieLogo ),
    NotificationBar   : withTheme( NotificationBar ),
    Page              : withTheme( Page ),
    PageContent       : withTheme( PageContent ),
    PageContentHeader : withTheme( PageContentHeader ),
    PageFooter        : withTheme( PageFooter ),
    PageHeader        : withTheme( PageHeader ),
    Paginator         : withTheme( Paginator ),
    PasswordInput,
    ProgressBar       : withTheme( ProgressBar ),
    ProgressIndicator : withTheme( ProgressIndicator ),
    Radio             : withTheme( Radio ),
    RadioGroup,
    Row,
    ScrollBar         : withTheme( ScrollBar ),
    ScrollBox         : withTheme( ScrollBox ),
    Section           : withTheme( Section ),
    Slider            : withTheme( Slider ),
    SliderGroup       : withTheme( SliderGroup ),
    Sorter            : withTheme( Sorter ),
    Spinner           : withTheme( Spinner ),
    SpriteMap,
    StatusIndicator   : withTheme( StatusIndicator ),
    Switch            : withTheme( Switch ),
    Tab               : withTheme( Tab ),
    TabButton         : withTheme( TabButton ),
    Table             : withTheme( Table ),
    TableCell         : withTheme( TableCell ),
    TableRow          : withTheme( TableRow ),
    Tabs              : withTheme( Tabs ),
    Tag               : withTheme( Tag ),
    TagInput          : withTheme( TagInput ),
    Text              : withTheme( Text ),
    TextArea          : withTheme( TextArea ),
    TextInput,
    TextInputWithIcon : withTheme( TextInputWithIcon ),
    ToggleButton      : withTheme( ToggleButton ),
    Tooltip           : withTheme( Tooltip ),
    Uploader          : withTheme( Uploader ),
    ValuedTextInput   : withTheme( ValuedTextInput ),
};


// Addons
export CodeEditor       from './Addons/CodeEditor';
export FlounderDropdown from './Addons/FlounderDropdown';
export withDropdown     from './Addons/withDropdown';
