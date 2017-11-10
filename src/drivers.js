import { ComponentDriver }    from 'componentDriver';

import ButtonDriver            from './Button/driver';
import ModuleDriver            from './Module/driver';
import IconDriver              from './Icon/driver';
import TooltipDriver           from './Tooltip/driver';
import IconWithTooltipDriver   from './IconWithTooltip/driver';
import FlounderDropdownDriver  from './FlounderDropdown/driver';
import TextInputWithIconDriver from './TextInputWithIcon/driver';
import PasswordInputDriver     from './PasswordInput/driver';
import SectionDriver           from './Section/driver';
import RowColumnDriver         from './Row/driver';
import FormDriver              from './Form/driver';
import NavItemDriver           from './NavItem/driver';
import NotificationBarDriver   from './NotificationBar/driver';
import ModalDialogDriver       from './ModalDialog/driver';

import { Button, Module, Icon, IconButton, Tooltip, IconWithTooltip,
         FlounderDropdown, PasswordInput, Form, Section, Row, Column,
         TextInput, NavItem, NotificationBar, TextInputWithIcon,
         ModalDialog }  from 'nessie';

import SimpleComponentDriver    from './Testing/CommonDrivers/simpleComponentDriver';
import ClickableComponentDriver from './Testing/CommonDrivers/clickableComponentDriver';
import InputComponentDriver     from './Testing/CommonDrivers/inputComponentDriver';

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
        Component : Row,
        Driver    : RowColumnDriver
    },
    {
        Component : Column,
        Driver    : RowColumnDriver
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
    }
];

export { SimpleComponentDriver, ClickableComponentDriver, InputComponentDriver };

export default ComponentDriver.createDriverSuite( drivers );
