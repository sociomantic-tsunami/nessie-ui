import React                            from 'react';
import PropTypes                        from 'prop-types';

import { generateId, buildClassName }   from '../utils';


export default class Tab extends React.PureComponent
{
    static propTypes =
    {
        /**
        *  Contents of the Tab
        */
        children : PropTypes.node,
        /**
         * HTML id attribute (overwrite default)
         */
        id       : PropTypes.string,
        /**
        *  Label to show in TabButton of this tab
        */
        label    : PropTypes.string,
        /**
        *  onClick callback function: ( e ) => { ... }
        */
        onClick  : PropTypes.func,
    };

    static defaultProps =
    {
        cssMap : require( './tab.css' ),
        id     : undefined,
    };

    render()
    {
        const {
            cssMap,
            children,
            className,
            id = generateId( 'Tab' ),
            onClick,
            label,
        } = this.props;

        return (
            <div
                className  = { buildClassName( className, cssMap ) }
                onClick    = { onClick }
                aria-label = { label }
                id         = { id }
                role       = "tabpanel">
                { children }
            </div>
        );
    }
}
