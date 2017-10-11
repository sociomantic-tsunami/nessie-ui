import React                from 'react';
import PropTypes            from 'prop-types';

import Css                  from '../hoc/Css';
import H1                   from '../H1';

const PageContentHeader = ( {
    children,
    cssMap,
    className,
    title } ) =>
{
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
