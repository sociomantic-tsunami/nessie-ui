// eslint-disable-next-line max-len
import SimpleComponentDriver from '../Testing/CommonDrivers/simpleComponentDriver';

export default class IconDriver extends SimpleComponentDriver
{
    constructor( wrapper )
    {
        super( wrapper, `.${wrapper.props().cssMap.default}` );
        this.button = this.control;
    }
}
