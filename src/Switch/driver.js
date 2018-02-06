import SimpleComponentDriver from '../Testing/CommonDrivers/simpleComponentDriver'; // eslint-disable-line max-len

const ERRORS = {
    SWITCH_CANNOT_BE_TOGGLED : ( state ) => `Switch cannot be toggled since it is ${state}` // eslint-disable-line max-len
};

export default class SwitchDriver extends SimpleComponentDriver
{
    constructor( wrapper )
    {
        super( wrapper, `.${wrapper.props().cssMap.default}` );
    }

    get input()
    {
        return this.wrapper.find( `.${this.cssMap.input}` );
    }

    toggle()
    {
        const props = this.wrapper.props();

        if ( props.isDisabled )
        {
            throw new Error(
                ERRORS.SWITCH_CANNOT_BE_TOGGLED( 'disabled' )
            );
        }
        if ( props.isReadOnly )
        {
            throw new Error(
                ERRORS.SWITCH_CANNOT_BE_TOGGLED( 'readonly' )
            );
        }

        this.input.simulate( 'change',
            { target : { checked : !props.isChecked } } );

        return this.wrapper;
    }
}
