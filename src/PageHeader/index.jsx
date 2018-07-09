import React                from 'react';
import PropTypes            from 'prop-types';

                  

const PageHeader = ( { children, cssMap, className } ) =>

    <Css cssMap = { cssMap }>
        <header className = { className }>
            { children }
        </header>
    </Css>;

PageHeader.propTypes =
{
    /**
     *  PageHeader content
     */
    children : PropTypes.node
};

PageHeader.defaultProps =
{
    cssMap : require( './pageHeader.css' )
};

export default PageHeader;
