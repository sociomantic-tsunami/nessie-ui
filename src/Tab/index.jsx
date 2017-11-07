import React     from 'react';
import PropTypes from 'prop-types';

import Component from '../proto/Component';
import Css       from '../hoc/Css';

export default class Tab extends Component
{
    static propTypes =
    {
        /**
        *  Label to show in TabButton of this tab
        */
        label    : PropTypes.string.isRequired,
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
            <Css cssMap   = { cssMap } >
                <div
                    className  = { className }
                    onClick    = { onClick }
                    aria-label = { label }
                    role       = "tabpanel">
                    { children }
                </div>
            </Css>
        );
    }
}
