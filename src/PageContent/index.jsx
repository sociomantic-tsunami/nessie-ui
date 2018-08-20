import React              from 'react';
import PropTypes          from 'prop-types';

import Spinner            from '../Spinner';
import { buildClassName } from '../utils';
import styles             from './pageContent.css';


const PageContent = ( {
    children,
    className,
    contentWidth,
    cssMap,
    isLoading,
} ) => (
    <div className = { buildClassName( className, cssMap ) }>
        <div className = { cssMap.content } style = { { width: contentWidth } }>
            { children }
        </div>
        { isLoading &&
            <div className = { cssMap.loadingOverlay }>
                <Spinner className = { cssMap.spinner } size = "big" />
            </div>
        }
    </div>
);

PageContent.propTypes =
{
    /**
     *  PageContent content
     */
    children     : PropTypes.node,
    /**
     *  Extra CSS class name
     */
    className    : PropTypes.node,
    /**
     *  CSS class map
     */
    cssMap       : PropTypes.objectOf( PropTypes.string ),
    /**
     *  Display loading state
     */
    isLoading    : PropTypes.bool,
    /**
     *  adjust/configure content width
     */
    contentWidth : PropTypes.string,
};

PageContent.defaultProps =
{
    children     : undefined,
    className    : undefined,
    contentWidth : '100%',
    cssMap       : styles,
    isLoading    : false,
};

export default PageContent;
