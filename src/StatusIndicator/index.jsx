import React, { Component } from 'react';
import PropTypes            from 'prop-types';

import Css                  from '../hoc/Css';

export default class StatusIndicator extends Component
{
    static propTypes =
    {
        /**
        *  Status text
        */
        label  : PropTypes.string,
        /**
         *  Display as active/deactivated
         */
        status : PropTypes.oneOf( [ 'active', 'deactivated', 'alert' ] )
    };

    static defaultProps =
    {
        status : 'deactivated',
        cssMap : require( './statusIndicator.css' )
    };

    render()
   {
        const { children, className, cssMap, label, status } = this.props;

        return (
            <Css
                cssMap = { cssMap }
                cssProps = { { status } }>
                <div className = { className }>
                    { children || label }
                </div>
            </Css>
        );
    }
}
