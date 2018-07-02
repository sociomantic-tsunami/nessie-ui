import React                    from 'react';
import PropTypes                from 'prop-types';

import Component                from '../proto/Component';
import { buildClassName }       from '../utils';

export default class Tab extends Component
{
    static propTypes =
    {
        /**
        *  Label to show in TabButton of this tab
        */
        label    : PropTypes.string,
        /**
        *  Contents of the Tab
        */
        children : PropTypes.node,
        /**
        *  onClick callback function: ( e ) => { ... }
        */
        onClick  : PropTypes.func,
    };

    static defaultProps =
    {
        cssMap : require( './tab.css' )
    };

    render()
    {
        const {
            cssMap,
            children,
            className,
            onClick,
            label
        } = this.props;

        return (
            <div
                className  = { buildClassName( className, cssMap ) }
                onClick    = { onClick }
                aria-label = { label }
                role       = "tabpanel">
                { children }
            </div>
        );
    }
}
