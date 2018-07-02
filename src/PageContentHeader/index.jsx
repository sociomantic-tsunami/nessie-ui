import React                               from 'react';
import PropTypes                           from 'prop-types';

import { buildClassName }                  from '../utils';
import H1                                  from '../H1';

const PageContentHeader = ( {
    children,
    cssMap,
    className,
    title
} ) =>
{
    let header = <H1 className = { buildClassName( className, cssMap ) }>{ title }</H1>;

    if ( children )
    {
        header = (
            <header className = { buildClassName( className, cssMap ) }>
                { children }
            </header>
        );
    }

    return header;
};

PageContentHeader.propTypes =
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

PageContentHeader.defaultProps =
{
    cssMap : require( './pageContentHeader.css' )
};

export default PageContentHeader;
