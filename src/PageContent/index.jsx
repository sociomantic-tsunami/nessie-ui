import React                from 'react';
import PropTypes            from 'prop-types';

import { buildClassName }   from '../utils';
import Spinner              from '../Spinner';


const PageContent = ( {
    children,
    contentWidth,
    cssMap,
    className,
    isLoading,
} ) =>

    <div className = { buildClassName( className, cssMap ) }>
        <div className = { cssMap.content } style = { { width: contentWidth } }>
            { children }
        </div>
        { isLoading &&
        <div className = { cssMap.loadingOverlay }>
            <Spinner
                className = { cssMap.spinner }
                size = "big" />
        </div>
        }
    </div>;

PageContent.propTypes =
{
    /**
     *  PageContent content
     */
    children     : PropTypes.node,
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
    cssMap       : require( './pageContent.css' ),
    isLoading    : false,
    contentWidth : '1080px',
};

export default PageContent;
