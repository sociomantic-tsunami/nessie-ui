import React, { Component } from 'react';
import PropTypes            from 'prop-types';

import Css                  from '../hoc/Css';
import H1                   from '../H1';

export default class PageContentHeader extends Component
{
    static propTypes =
    {
        /**
         *  Page content header text (h1)
         */
        title    : PropTypes.string,
        /**
         *  Page content header custom content; overrides title
         */
        children : PropTypes.node
    };

    static defaultProps =
    {
        cssMap : require( './pageContentHeader.css' )
    };

    render()
    {
        const { children,
                cssMap,
                className,
                title } = this.props;

        let header = <H1 className = { className }>{ title }</H1>;

        if ( children )
        {
            header = (
                <header className = { className }>
                    { children }
                </header>
            );
        }

        return (
            <Css
                cssMap   = { cssMap }
                cssProps = { { header: !!children } }>
                { header }
            </Css>
        );
    }
}
