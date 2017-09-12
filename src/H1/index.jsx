import React, { Component }  from 'react';
import PropTypes             from 'prop-types';

import Css                   from '../hoc/Css';

export default class H1 extends Component
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
        cssMap : require( './h1.css' )
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
                <h1 className = { className }>
                    { children || title }
                </h1>
            </Css>
        );
    }
}
