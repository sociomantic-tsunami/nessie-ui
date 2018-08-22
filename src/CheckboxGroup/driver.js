import { Checkbox } from '../index';

const ERR = {
    CHECKABLEGROUP_ERR : ( label, doWhat, state ) =>
        `CheckableGroup '${label}' cannot ${doWhat} since it is ${state}`,
};

export default class CheckboxGroupDriver
{
    constructor( wrapper )
    {
        this.wrapper    = wrapper;
        this.cssMap     = wrapper.props().cssMap;
        this.checkables = wrapper.find( Checkbox );
    }


    change( index = 0 )
    {
        const props     = this.wrapper.props();
        const { label } = props;

        if ( props.isDisabled )
        {
            throw new Error( ERR
                .CHECKABLEGROUP_ERR( label, 'onChange', 'disabled' ) );
        }

        if ( props.isReadOnly )
        {
            throw new Error( ERR
                .CHECKABLEGROUP_ERR( label, 'onChange', 'read only' ) );
        }


        this.checkables.at( index ).driver().change();
        return this;
    }

    mouseOver()
    {
        const props     = this.wrapper.props();
        const { label } = props;

        if ( props.isDisabled )
        {
            throw new Error( ERR
                .CHECKABLEGROUP_ERR( label, 'onMouseOver', 'disabled' ) );
        }

        if ( props.isReadOnly )
        {
            throw new Error( ERR
                .CHECKABLEGROUP_ERR( label, 'onMouseOver', 'read only' ) );
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
            throw new Error( ERR
                .CHECKABLEGROUP_ERR( label, 'onMouseOut', 'disabled' ) );
        }

        if ( props.isReadOnly )
        {
            throw new Error( ERR
                .CHECKABLEGROUP_ERR( label, 'onMouseOut', 'read only' ) );
        }

        this.wrapper.simulate( 'mouseleave' );
        return this;
    }
}
