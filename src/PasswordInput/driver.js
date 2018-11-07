import { TextInputWithIcon } from 'nessie-ui';

import InputComponentDriver
    from '../Testing/CommonDrivers/inputComponentDriver';

export default class PasswordInput extends InputComponentDriver
{
    getErrorMessage()
    {
        const textInputWithIcon = this.wrapper.find( TextInputWithIcon );
        return textInputWithIcon.driver().getErrorMessage();
    }
}
