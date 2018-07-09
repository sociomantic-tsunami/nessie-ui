import React                               from 'react';
import PropTypes                           from 'prop-types';

import { buildClassName }                  from '../utils';

const PageFooter = ( {
    children,
    cssMap,
    className
} ) =>

    <footer className = { buildClassName( className, cssMap ) }>
        <div className = { cssMap.content }>
            { children }
        </div>
    </footer>;

PageFooter.propTypes =
{
    /**
     *  PageFooter content
     */
    children : PropTypes.node
};

PageFooter.defaultProps =
{
    cssMap : require( './pageFooter.css' )
};

export default PageFooter;
