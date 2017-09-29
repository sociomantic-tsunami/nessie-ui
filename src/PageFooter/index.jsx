import React                from 'react';
import PropTypes            from 'prop-types';

import Css                  from '../hoc/Css';

const PageFooter = ( {
    children,
    cssMap,
    className } ) =>

        <Css cssMap = { cssMap }>
            <footer className = { className }>
                <div className = { cssMap.content }>
                    { children }
                </div>
            </footer>
        </Css>;

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
