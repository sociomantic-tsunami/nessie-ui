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
    Fieldset,
    FlounderDropdown,
    Form,
    Icon,
    IconButton,
    IconWithTooltip,
    InputField,
    Label,
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
    Slider,
    SliderGroup,
    Sorter,
    Switch,
    Tab,
    TabButton,
    Table,
    TableCell,
    Tabs,
    Tag,
    TagInput,
    TextArea,
    TextInput,
    TextInputWithDropdown,
    TextInputWithIcon,
    Tooltip,
    ToggleButton,
    Uploader,
    ValuedTextInput,
} from 'nessie-ui';

import ButtonDriver                from './Button/driver';
import CheckableGroupDriver        from './CheckableGroup/driver';
import CheckboxDriver              from './Checkbox/driver';
import CheckboxGroupDriver         from './CheckboxGroup/driver';
import CodeEditorDriver            from './CodeEditor/driver';
import ComboBoxDriver              from './ComboBox/driver';
import DatePickerDriver            from './DatePicker/driver';
import DateTimeInputDriver         from './DateTimeInput/driver';
import FieldsetDriver              from './Fieldset/driver';
import FlounderDropdownDriver      from './FlounderDropdown/driver';
import FormDriver                  from './Form/driver';
import IconDriver                  from './Icon/driver';
import IconButtonDriver            from './IconButton/driver';
import IconWithTooltipDriver       from './IconWithTooltip/driver';
import InputFieldDriver            from './InputField/driver';
import LabelDriver                 from './Label/driver';
import ListBoxDriver               from './ListBox/driver';
import ModalDialogDriver           from './ModalDialog/driver';
import ModuleDriver                from './Module/driver';
import NavItemDriver               from './NavItem/driver';
import NotificationBarDriver       from './NotificationBar/driver';
import PaginatorDriver             from './Paginator/driver';
import PasswordInputDriver         from './PasswordInput/driver';
import RadioDriver                 from './Radio/driver';
import RadioGroupDriver            from './RadioGroup/driver';
import ScrollBarDriver             from './ScrollBar/driver';
import ScrollBoxDriver             from './ScrollBox/driver';
import SliderDriver                from './Slider/driver';
import SliderGroupDriver           from './SliderGroup/driver';
import SorterDriver                from './Sorter/driver';
import SwitchDriver                from './Switch/driver';
import TabDriver                   from './Tab/driver';
import TabButtonDriver             from './TabButton/driver';
import TableDriver                 from './Table/driver';
import TableCellDriver             from './TableCell/driver';
import TabsDriver                  from './Tabs/driver';
import TagDriver                   from './Tag/driver';
import TagInputDriver              from './TagInput/driver';
import TextAreaDriver              from './TextArea/driver';
import TextInputDriver             from './TextInput/driver';
import TextInputWithDropdownDriver from './TextInputWithDropdown/driver';
import TextInputWithIconDriver     from './TextInputWithIcon/driver';
import ToggleButtonDriver          from './ToggleButton/driver';
import TooltipDriver               from './Tooltip/driver';
import UploaderDriver              from './Uploader/driver';
import ValuedTextInputDriver       from './ValuedTextInput/driver';


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
        Driver    : CheckboxGroupDriver,
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
        Driver    : DatePickerDriver,
    },
    {
        Component : DateTimeInput,
        Driver    : DateTimeInputDriver,
    },
    {
        Component : Fieldset,
        Driver    : FieldsetDriver,
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
        Component : Icon,
        Driver    : IconDriver,
    },
    {
        Component : IconButton,
        Driver    : IconButtonDriver,
    },
    {
        Component : IconWithTooltip,
        Driver    : IconWithTooltipDriver,
    },
    {
        Component : InputField,
        Driver    : InputFieldDriver,
    },
    {
        Component : Label,
        Driver    : LabelDriver,
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
        Driver    : RadioDriver,
    },
    {
        Component : RadioGroup,
        Driver    : RadioGroupDriver,
    },
    {
        Component : ScrollBar,
        Driver    : ScrollBarDriver,
    },
    {
        Component : ScrollBox,
        Driver    : ScrollBoxDriver,
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
        Driver    : SwitchDriver,
    },
    {
        Component : Tab,
        Driver    : TabDriver,
    },
    {
        Component : TabButton,
        Driver    : TabButtonDriver,
    },
    {
        Component : Table,
        Driver    : TableDriver,
    },
    {
        Component : TableCell,
        Driver    : TableCellDriver,
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
        Driver    : TagInputDriver,
    },
    {
        Component : TextArea,
        Driver    : TextAreaDriver,
    },
    {
        Component : TextInput,
        Driver    : TextInputDriver,
    },
    {
        Component : TextInputWithDropdown,
        Driver    : TextInputWithDropdownDriver,
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
        Driver    : ToggleButtonDriver,
    },
    {
        Component : Uploader,
        Driver    : UploaderDriver,
    },
    {
        Component : ValuedTextInput,
        Driver    : ValuedTextInputDriver,
    },
];

export default ComponentDriver.createDriverSuite( drivers );
