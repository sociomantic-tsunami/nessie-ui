import { ComponentDriver } from 'componentDriver';
import {
    Button,
    CheckableGroup,
    Checkbox,
    CheckboxGroup,
    CodeEditor,
    Column,
    ComboBox,
    DatePicker,
    DateTimeInput,
    DragNDrop,
    Dropdown,
    Fieldset,
    FlounderDropdown,
    Form,
    Grid,
    H1,
    H2,
    H3,
    H4,
    Icon,
    IconButton,
    IconWithTooltip,
    InputField,
    Label,
    ListBox,
    MessageBox,
    ModalDialog,
    Module,
    NavBar,
    NavDropdown,
    NavItem,
    NavList,
    NotificationBar,
    Page,
    PageContent,
    PageContentHeader,
    PageFooter,
    PageHeader,
    Paginator,
    PasswordInput,
    Radio,
    RadioGroup,
    Required,
    Row,
    ScrollBar,
    ScrollBox,
    Section,
    Slider,
    SliderGroup,
    Sorter,
    StatusIndicator,
    Switch,
    Tab,
    TabButton,
    Tabs,
    Table,
    TableCell,
    TableRow,
    Tag,
    TagInput,
    Text,
    TextArea,
    TextInput,
    TextInputWithDropdown,
    TextInputWithIcon,
    Tooltip,
    Uploader,
    ValuedTextInput,
} from 'nessie-ui';

import ButtonDriver         from './Button/driver';
import CheckableGroupDriver from './CheckableGroup/driver';
import CheckboxDriver       from './Checkbox/driver';
import ClickableComponentDriver
    from './Testing/CommonDrivers/clickableComponentDriver';
import CodeEditorDriver       from './CodeEditor/driver';
import ComboBoxDriver         from './ComboBox/driver';
import DatePickerDriver       from './DatePicker/driver';
import DateTimeInputDriver    from './DateTimeInput/driver';
import FlounderDropdownDriver from './FlounderDropdown/driver';
import FormDriver             from './Form/driver';
import GridColumnDriver       from './Grid/driver';
import IconDriver             from './Icon/driver';
import IconWithTooltipDriver  from './IconWithTooltip/driver';
import InputComponentDriver
    from './Testing/CommonDrivers/inputComponentDriver';
import ListBoxDriver         from './ListBox/driver';
import ModalDialogDriver     from './ModalDialog/driver';
import ModuleDriver          from './Module/driver';
import NavItemDriver         from './NavItem/driver';
import NotificationBarDriver from './NotificationBar/driver';
import PaginatorDriver       from './Paginator/driver';
import PasswordInputDriver   from './PasswordInput/driver';
import RadioGroupDriver      from './RadioGroup/driver';
import ScrollBarDriver       from './ScrollBar/driver';
import ScrollBoxDriver       from './ScrollBox/driver';
import SectionDriver         from './Section/driver';
import SimpleComponentDriver
    from './Testing/CommonDrivers/simpleComponentDriver';
import SliderDriver            from './Slider/driver';
import SliderGroupDriver       from './SliderGroup/driver';
import SorterDriver            from './Sorter/driver';
import SwitchDriver            from './Switch/driver';
import TabButtonDriver         from './TabButton/driver';
import TabsDriver              from './Tabs/driver';
import TagDriver               from './Tag/driver';
import TagInputDriver          from './TagInput/driver';
import TextAreaDriver          from './TextArea/driver';
import TextDriver              from './Text/driver';
import TextInputWithIconDriver from './TextInputWithIcon/driver';
import TooltipDriver           from './Tooltip/driver';
import UploaderDriver          from './Uploader/driver';
import WrapperDriver           from './Testing/CommonDrivers/wrapperDriver';


const drivers =
[
    {
        Component : Button,
        Driver    : ButtonDriver,
    },
    {
        Component : CheckableGroup,
        Driver    : CheckableGroupDriver,
    },
    {
        Component : Checkbox,
        Driver    : CheckboxDriver,
    },
    {
        Component : CheckboxGroup,
        Driver    : CheckableGroupDriver,
    },
    {
        Component : CodeEditor,
        Driver    : CodeEditorDriver,
    },
    {
        Component : Column,
        Driver    : GridColumnDriver,
    },
    {
        Component : ComboBox,
        Driver    : ComboBoxDriver,
    },
    {
        Component : DatePicker,
        Driver    : DatePickerDriver
    },
    {
        Component : DateTimeInput,
        Driver    : DateTimeInputDriver
    },
    {
        Component : DragNDrop,
        Driver    : WrapperDriver
    },
    {
        Component : Dropdown,
        Driver    : WrapperDriver
    },
    {
        Component : Fieldset,
        Driver    : WrapperDriver
    },
    {
        Component : FlounderDropdown,
        Driver    : FlounderDropdownDriver,
    },
    {
        Component : Form,
        Driver    : FormDriver,
    },
    {
        Component : Grid,
        Driver    : GridColumnDriver,
    },
    {
        Component : H1,
        Driver    : WrapperDriver,
    },
    {
        Component : H2,
        Driver    : WrapperDriver,
    },
    {
        Component : H3,
        Driver    : WrapperDriver,
    },
    {
        Component : H4,
        Driver    : WrapperDriver,
    },
    {
        Component : Icon,
        Driver    : IconDriver,
    },
    {
        Component : IconButton,
        Driver    : ButtonDriver,
    },
    {
        Component : IconWithTooltip,
        Driver    : IconWithTooltipDriver,
    },
    {
        Component : InputField,
        Driver    : InputComponentDriver,
    },
    {
        Component : Label,
        Driver    : WrapperDriver,
    },
    {
        Component : ListBox,
        Driver    : ListBoxDriver,
    },
    {
        Component : MessageBox,
        Driver    : WrapperDriver,
    },
    {
        Component : ModalDialog,
        Driver    : ModalDialogDriver,
    },
    {
        Component : Module,
        Driver    : ModuleDriver,
    },
    {
        Component : NavBar,
        Driver    : WrapperDriver,
    },
    {
        Component : NavDropdown,
        Driver    : WrapperDriver,
    },
    {
        Component : NavItem,
        Driver    : NavItemDriver,
    },
    {
        Component : NavList,
        Driver    : WrapperDriver,
    },
    {
        Component : NotificationBar,
        Driver    : NotificationBarDriver,
    },
    {
        Component : Page,
        Driver    : WrapperDriver,
    },
    {
        Component : PageContent,
        Driver    : WrapperDriver,
    },
    {
        Component : PageContentHeader,
        Driver    : WrapperDriver,
    },
    {
        Component : PageFooter,
        Driver    : WrapperDriver,
    },
    {
        Component : PageHeader,
        Driver    : WrapperDriver,
    },
    {
        Component : Paginator,
        Driver    : PaginatorDriver,
    },
    {
        Component : PasswordInput,
        Driver    : PasswordInputDriver,
    },
    {
        Component : Radio,
        Driver    : CheckboxDriver,
    },
    {
        Component : RadioGroup,
        Driver    : RadioGroupDriver,
    },
    {
        Component : Required,
        Driver    : WrapperDriver,
    },
    {
        Component : Row,
        Driver    : GridColumnDriver,
    },
    {
        Component : ScrollBar,
        Driver    : ScrollBarDriver
    },
    {
        Component : ScrollBox,
        Driver    : ScrollBoxDriver
    },
    {
        Component : Section,
        Driver    : SectionDriver
    },
    {
        Component : Slider,
        Driver    : SliderDriver,
    },
    {
        Component : SliderGroup,
        Driver    : SliderGroupDriver,
    },
    {
        Component : Sorter,
        Driver    : SorterDriver,
    },
    {
        Component : StatusIndicator,
        Driver    : WrapperDriver,
    },
    {
        Component : Switch,
        Driver    : SwitchDriver,
    },
    {
        Component : Tab,
        Driver    : WrapperDriver,
    },
    {
        Component : TabButton,
        Driver    : TabButtonDriver,
    },
    {
        Component : Tabs,
        Driver    : TabsDriver,
    },
    {
        Component : Table,
        Driver    : WrapperDriver,
    },
    {
        Component : TableCell,
        Driver    : WrapperDriver,
    },
    {
        Component : TableRow,
        Driver    : WrapperDriver,
    },
    {
        Component : Tag,
        Driver    : TagDriver,
    },
    {
        Component : TagInput,
        Driver    : TagInputDriver
    },
    {
        Component : Text,
        Driver    : TextDriver,
    },
    {
        Component : TextArea,
        Driver    : TextAreaDriver,
    },
    {
        Component : TextInput,
        Driver    : InputComponentDriver,
    },
    {
        Component : TextInputWithDropdown,
        Driver    : InputComponentDriver
    },
    {
        Component : TextInputWithIcon,
        Driver    : TextInputWithIconDriver,
    },
    {
        Component : Tooltip,
        Driver    : TooltipDriver,
    },
    {
        Component : Uploader,
        Driver    : UploaderDriver,
    },
    {
        Component : ValuedTextInput,
        Driver    : InputComponentDriver,
    }
];

export {
    ClickableComponentDriver,
    InputComponentDriver,
    SimpleComponentDriver,
    WrapperDriver
};

export default ComponentDriver.createDriverSuite( drivers );
