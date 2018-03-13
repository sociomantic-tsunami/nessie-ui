import { ComponentDriver }    from 'componentDriver';
import { Button, Module, Icon, IconButton, Tooltip, IconWithTooltip,
    FlounderDropdown, PasswordInput, Form, Section, Grid, Column,
    TextInput, NavItem, NotificationBar, TextInputWithIcon,
    ModalDialog, Switch, Row, CodeEditor }  from 'nessie-ui';

import ButtonDriver             from './Button/driver';
import ModuleDriver             from './Module/driver';
import IconDriver               from './Icon/driver';
import TooltipDriver            from './Tooltip/driver';
import IconWithTooltipDriver    from './IconWithTooltip/driver';
import FlounderDropdownDriver   from './FlounderDropdown/driver';
import TextInputWithIconDriver  from './TextInputWithIcon/driver';
import PasswordInputDriver      from './PasswordInput/driver';
import SectionDriver            from './Section/driver';
import GridColumnDriver         from './Grid/driver';
import FormDriver               from './Form/driver';
import NavItemDriver            from './NavItem/driver';
import NotificationBarDriver    from './NotificationBar/driver';
import ModalDialogDriver        from './ModalDialog/driver';
import SwitchDriver             from './Switch/driver';
import TextDriver               from './Text/driver';
import SimpleComponentDriver    from './Testing/CommonDrivers/simpleComponentDriver'; // eslint-disable-line max-len
import ClickableComponentDriver from './Testing/CommonDrivers/clickableComponentDriver'; // eslint-disable-line max-len
import InputComponentDriver     from './Testing/CommonDrivers/inputComponentDriver'; // eslint-disable-line max-len
import CodeEditorDriver         from './CodeEditor/driver';

const drivers =
[
    {
        Component : Button,
        Driver    : ButtonDriver
    },
    {
        Component : Module,
        Driver    : ModuleDriver
    },
    {
        Component : TextInputWithIcon,
        Driver    : TextInputWithIconDriver,
    },
    {
        Component : PasswordInput,
        Driver    : PasswordInputDriver
    },
    {
        Component : Icon,
        Driver    : IconDriver
    },
    {
        Component : Tooltip,
        Driver    : TooltipDriver
    },
    {
        Component : IconWithTooltip,
        Driver    : IconWithTooltipDriver
    },
    {
        Component : IconButton,
        Driver    : ButtonDriver
    },
    {
        Component : FlounderDropdown,
        Driver    : FlounderDropdownDriver
    },
    {
        Component : TextInput,
        Driver    : InputComponentDriver
    },
    {
        Component : Section,
        Driver    : SectionDriver
    },
    {
        Component : Grid,
        Driver    : GridColumnDriver
    },
    {
        Component : Row,
        Driver    : GridColumnDriver
    },
    {
        Component : Column,
        Driver    : GridColumnDriver
    },
    {
        Component : Form,
        Driver    : FormDriver
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
        Component : ModalDialog,
        Driver    : ModalDialogDriver
    },
    {
        Component : Switch,
        Driver    : SwitchDriver
    },
    {
        Component : Text,
        Driver    : TextDriver
    },
];

export { SimpleComponentDriver, ClickableComponentDriver,
    InputComponentDriver };

export default ComponentDriver.createDriverSuite( drivers );
