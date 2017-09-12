import React, { Component } from 'react';
import PropTypes            from 'prop-types';

import Css                  from '../hoc/Css';

export default class Required extends Component
{
    static propTypes =
    {
        /**
        *  Text to show
        */
        text       : PropTypes.string,
        /**
        *  Show as required
        */
        isRequired : PropTypes.bool
    }

    static defaultProps =
    {
        isRequired : true,
        cssMap     : require( './required.css' )
    };

    render()
    {
        const { children,
                className,
                cssMap,
                isRequired,
                text } = this.props;

        return (
            <Css
                cssMap   = { cssMap }
                cssProps = { { required: isRequired } }>
                <span className = { className }>
                    { children || text }
                </span>
            </Css>
        );
    }
}
