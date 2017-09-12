import React, { Component } from 'react';
import PropTypes            from 'prop-types';

import Css                  from '../hoc/Css';
import Spinner              from '../Spinner';


export default class PageContent extends Component
{
    static propTypes =
    {
        /**
         *  PageContent content
         */
        children  : PropTypes.node,
        /**
         *  Display loading state
         */
        isLoading : PropTypes.bool,
    };

    static defaultProps =
    {
        cssMap    : require( './pageContent.css' ),
        isLoading : false
    };

    render()
    {
        const { children,
                cssMap,
                className,
                isLoading } = this.props;

        return (
            <Css cssMap = { cssMap }>
                <div className = { className }>
                    <div className = { cssMap.content }>
                        { children }
                    </div>
                    { isLoading &&
                        <div className = { cssMap.loadingOverlay }>
                            <Spinner
                                className = { cssMap.spinner }
                                size = "big" />
                        </div>
                    }
                </div>
            </Css>
        );
    }
}
