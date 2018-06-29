import React                               from 'react';
import PropTypes                           from 'prop-types';

import { buildClassName }                  from '../utils';
import Spinner                             from '../Spinner';


const PageContent = ( {
    children,
    cssMap,
    className,
    isLoading
} ) =>
    <div className = { buildClassName( className, cssMap ) }>
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
    </div>;

PageContent.propTypes =
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

PageContent.defaultProps =
{
    cssMap    : require( './pageContent.css' ),
    isLoading : false
};

export default PageContent;
