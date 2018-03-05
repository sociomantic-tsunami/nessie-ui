import React                from 'react';
import PropTypes            from 'prop-types';

import Css                  from '../hoc/Css';
import Text                 from '../Text';

const PageFooter = ( {
    children,
    cssMap,
    className } ) =>
{
    const childrenText = typeof children === 'string' ?
        <Text>{ children }</Text> : children;

    return (
        <Css cssMap = { cssMap }>
            <footer className = { className }>
                <div className = { cssMap.content }>
                    { childrenText }
                </div>
            </footer>
        </Css>
    );
};

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
