import React                from 'react';
import PropTypes            from 'prop-types';

import Css                  from '../hoc/Css';
import Text                 from '../Text';

const PageHeader = ( { children, cssMap, className } ) =>
{
    const childrenText = typeof children === 'string' ?
        <Text>{ children }</Text> : children;

    return (
        <Css cssMap = { cssMap }>
            <header className = { className }>
                { childrenText }
            </header>
        </Css>
    );
};

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
