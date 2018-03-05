import React                from 'react';
import PropTypes            from 'prop-types';

import Css                  from '../hoc/Css';
import H1                   from '../H1';
import Text                 from '../Text';

const PageContentHeader = ( {
    children,
    cssMap,
    className,
    title } ) =>
{
    const childrenText = typeof children === 'string' ?
        <Text>{ children }</Text> : children;

    let header = <H1 className = { className }>{ title }</H1>;

    if ( childrenText )
    {
        header = (
            <header className = { className }>
                { childrenText }
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
