import { CheckableGroup } from '../index';

const ERRORS = {
    CHECKABLEGROUP_CANNOT_BE_CHANGED : ( label, state ) =>
        `CheckableGroup '${label}' cannot be changed since it is ${state}`,
    CHECKABLEGROUP_CANNOT_MOUSEOVER : ( label, state ) =>
        `CheckableGroup '${label}' cannot have onMouseOver since it is \
${state}`,
    CHECKABLEGROUP_CANNOT_MOUSEOUT : ( label, state ) =>
        `CheckableGroup '${label}' cannot have onMouseOut since it is ${state}`,
};

export default class CheckboxGroupDriver
{
    constructor( wrapper )
    {
        this.wrapper    = wrapper;
        this.cssMap     = wrapper.props().cssMap;
        this.checkables = wrapper.find( CheckableGroup );
    }


    change( index = 0 )
    {
        const props     = this.wrapper.props();
        const { label } = props;

        if ( props.isDisabled )
        {
            throw new Error( ERRORS
                .CHECKABLEGROUP_CANNOT_BE_CHANGED( label, 'disabled' ) );
        }

        if ( props.isReadOnly )
        {
            throw new Error( ERRORS
                .CHECKABLEGROUP_CANNOT_BE_CHANGED( label, 'read only' ) );
        }


        this.checkables.driver().change( index );
        return this;
    }

    mouseOver()
    {
        const props     = this.wrapper.props();
        const { label } = props;

        if ( props.isDisabled )
        {
            throw new Error( ERRORS
                .CHECKABLEGROUP_CANNOT_MOUSEOVER( label, 'disabled' ) );
        }

        if ( props.isReadOnly )
        {
            throw new Error( ERRORS
                .CHECKABLEGROUP_CANNOT_MOUSEOVER( label, 'read only' ) );
        }

        this.wrapper.simulate( 'mouseenter' );
        return this;
    }

    mouseOut()
    {
        const props     = this.wrapper.props();
        const { label } = props;

        if ( props.isDisabled )
        {
            throw new Error( ERRORS
                .CHECKABLEGROUP_CANNOT_MOUSEOUT( label, 'disabled' ) );
        }

        if ( props.isReadOnly )
        {
            throw new Error( ERRORS
                .CHECKABLEGROUP_CANNOT_MOUSEOUT( label, 'read only' ) );
        }

        this.wrapper.simulate( 'mouseleave' );
        return this;
    }
}
