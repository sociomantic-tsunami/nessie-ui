import React                from 'react';
import PropTypes            from 'prop-types';

import { buildClassName }   from '../utils';

const PageHeader = ( { children, cssMap, className } ) =>

    <header className = { buildClassName( className, cssMap ) }>
        { children }
    </header>;

PageHeader.propTypes =
{
    /**
     *  PageHeader content
     */
    children : PropTypes.node,
};

PageHeader.defaultProps =
{
    cssMap : require( './pageHeader.css' ),
};

export default PageHeader;
