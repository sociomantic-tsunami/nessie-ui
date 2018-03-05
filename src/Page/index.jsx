import React                from 'react';
import PropTypes            from 'prop-types';

import Text                 from '../Text';
import Css                  from '../hoc/Css';

const Page = ( {
    children,
    cssMap,
    className,
    overflow } ) =>

{
    let childrenText;

    if ( typeof children === 'string' )
    {
        childrenText = <Text>{ children }</Text>;
    }

    return (
        <Css
            cssMap = { cssMap }
            cssProps = { { overflow } } >
            <div className = { className }>
                { childrenText || children }
            </div>
        </Css>
    );
};

Page.propTypes =
{
    /**
     *  Page content
     */
    children : PropTypes.node,

    /**
     * Page overflow setting
     *
     */
    overflow : PropTypes.oneOf( [
        'auto',
        'hidden',
        'visible',
        'scroll',
        'scrollX',
        'scrollY'
    ] ),
};

Page.defaultProps =
{
    cssMap : require( './page.css' ),
    scroll : 'auto'
};

export default Page;
