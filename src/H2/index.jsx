import React, { Component }  from 'react';
import PropTypes             from 'prop-types';

import Css                   from '../hoc/Css';

export default class H2 extends Component
{
    static propTypes =
    {
        /**
        *  Title text
        */
        title : PropTypes.string,
        /**
        *  Role (style) to apply to heading
        */
        role  : PropTypes.oneOf( [
            'default',
            'subtle',
            'promoted',
            'critical'
        ] )
    };

    static defaultProps =
    {
        role   : 'default',
        cssMap : require( './h2.css' )
    };

    render()
    {
        const {
            cssMap,
            className,
            children,
            role,
            title
        } = this.props;

        return (
            <Css
                cssMap   = { cssMap }
                cssProps = { { role } }>
                <h2 className = { className }>
                    { children || title }
                </h2>
            </Css>
        );
    }
}
