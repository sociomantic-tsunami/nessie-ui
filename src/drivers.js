import { ComponentDriver } from 'componentDriver';
import {
    Button,
    Checkbox,
    CodeEditor,
    Column,
    FlounderDropdown,
    Form,
    Grid,
    Icon,
    IconButton,
    IconWithTooltip,
    ModalDialog,
    Module,
    NavItem,
    NotificationBar,
    PasswordInput,
    Radio,
    Row,
    Section,
    Slider,
    Switch,
    Text,
    TextInput,
    TextInputWithIcon,
    Tooltip,
} from 'nessie-ui';

import ButtonDriver   from './Button/driver';
import CheckboxDriver from './Checkbox/driver';
import ClickableComponentDriver
    from './Testing/CommonDrivers/clickableComponentDriver';
import CodeEditorDriver       from './CodeEditor/driver';
import FlounderDropdownDriver from './FlounderDropdown/driver';
import FormDriver             from './Form/driver';
import GridColumnDriver       from './Grid/driver';
import IconDriver             from './Icon/driver';
import IconWithTooltipDriver  from './IconWithTooltip/driver';
import InputComponentDriver
    from './Testing/CommonDrivers/inputComponentDriver';
import ModalDialogDriver     from './ModalDialog/driver';
import ModuleDriver          from './Module/driver';
import NavItemDriver         from './NavItem/driver';
import NotificationBarDriver from './NotificationBar/driver';
import PasswordInputDriver   from './PasswordInput/driver';
import SectionDriver         from './Section/driver';
import SimpleComponentDriver
    from './Testing/CommonDrivers/simpleComponentDriver';
import SliderDriver            from './Slider/driver';
import SwitchDriver            from './Switch/driver';
import TextDriver              from './Text/driver';
import TextInputWithIconDriver from './TextInputWithIcon/driver';
import TooltipDriver           from './Tooltip/driver';


const drivers =
[
    {
        Component : Button,
        Driver    : ButtonDriver
    },
    {
        Component : Checkbox,
        Driver    : CheckboxDriver
    },
    {
        Component : CodeEditor,
        Driver    : CodeEditorDriver
    },
    {
        Component : Column,
        Driver    : GridColumnDriver
    },
    {
        Component : FlounderDropdown,
        Driver    : FlounderDropdownDriver
    },
    {
        Component : Form,
        Driver    : FormDriver
    },
    {
        Component : Grid,
        Driver    : GridColumnDriver
    },
    {
        Component : Icon,
        Driver    : IconDriver
    },
    {
        Component : IconButton,
        Driver    : ButtonDriver
    },
    {
        Component : IconWithTooltip,
        Driver    : IconWithTooltipDriver
    },
    {
        Component : ModalDialog,
        Driver    : ModalDialogDriver
    },
    {
        Component : Module,
        Driver    : ModuleDriver
    },
    {
        Component : NavItem,
        Driver    : NavItemDriver
    },
    {
        Component : NotificationBar,
        Driver    : NotificationBarDriver
    },
    {
        Component : PasswordInput,
        Driver    : PasswordInputDriver
    },
    {
        Component : Radio,
        Driver    : CheckboxDriver
    },
    {
        Component : Row,
        Driver    : GridColumnDriver
    },
    {
        Component : Section,
        Driver    : SectionDriver
    },
    {
        Component : Slider,
        Driver    : SliderDriver
    },
    {
        Component : Switch,
        Driver    : SwitchDriver
    },
    {
        Component : Text,
        Driver    : TextDriver
    },
    {
        Component : TextInput,
        Driver    : InputComponentDriver
    },
    {
        Component : TextInputWithIcon,
        Driver    : TextInputWithIconDriver,
    },
    {
        Component : Tooltip,
        Driver    : TooltipDriver
    },
];

export {
    ClickableComponentDriver,
    InputComponentDriver,
    SimpleComponentDriver,
};

export default ComponentDriver.createDriverSuite( drivers );
