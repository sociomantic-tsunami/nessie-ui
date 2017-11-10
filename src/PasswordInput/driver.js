import { TextInputWithIcon } from 'nessie';

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
