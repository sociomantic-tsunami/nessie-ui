import { ComponentDriver } from 'componentDriver';
import {
    Button,
    CheckableGroup,
    Checkbox,
    CheckboxGroup,
    CodeEditor,
    ComboBox,
    DatePicker,
    DateTimeInput,
    FlounderDropdown,
    Form,
    IconButton,
    IconWithTooltip,
    InputField,
    ListBox,
    ModalDialog,
    Module,
    NavItem,
    NotificationBar,
    Paginator,
    PasswordInput,
    Radio,
    RadioGroup,
    ScrollBar,
    ScrollBox,
    Section,
    Slider,
    SliderGroup,
    Sorter,
    Switch,
    TabButton,
    Tabs,
    Tag,
    TagInput,
    Text,
    TextArea,
    TextInput,
    TextInputWithDropdown,
    TextInputWithIcon,
    Tooltip,
    ToggleButton,
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
        Component : FlounderDropdown,
        Driver    : FlounderDropdownDriver,
    },
    {
        Component : Form,
        Driver    : FormDriver,
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
        Component : ListBox,
        Driver    : ListBoxDriver,
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
        Component : NavItem,
        Driver    : NavItemDriver,
    },
    {
        Component : NotificationBar,
        Driver    : NotificationBarDriver,
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
        Component : Switch,
        Driver    : SwitchDriver
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
        Component : ToggleButton,
        Driver    : ClickableComponentDriver
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
    SimpleComponentDriver
};

export default ComponentDriver.createDriverSuite( drivers );
