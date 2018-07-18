import React                   from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import PropTypes               from 'prop-types';

import { buildClassName }      from '../utils';

const Animate = ( {
    children,
    className,
    enterAnimation,
    outAnimation,
    cssMap,
    transitionEnterTimeout,
    transitionLeaveTimeout,
} ) =>
{
    if ( !Animate.didWarn )
    {
        console.warn( 'Animate: This component is deprecated and will be \
removed in the next major release.' );
        Animate.didWarn = true;
    }

    return (
        <div className = { buildClassName( className, cssMap ) }>
            <ReactCSSTransitionGroup
                transitionName = { {
                    enter : `animate__${enterAnimation}`,
                    leave : `animate__${outAnimation}`,
                } }
                component              = "div"
                className              = {
                    `animate__${enterAnimation}__${outAnimation}`
                }
                transitionEnterTimeout = { transitionEnterTimeout }
                transitionLeaveTimeout = { transitionLeaveTimeout }>
                { children }
            </ReactCSSTransitionGroup>
        </div>
    );
};

Animate.propTypes =
{
    /**
    *  Animate content
    */
    children       : PropTypes.node,
    /**
    *  Enter Animation type
    */
    enterAnimation : PropTypes.oneOf( [
        'fadeIn',
        'slideInDown',
        'slideInLeft',
        'slideInRight',
        'slideInUp',
    ] ),
    /**
    *  Out Animation type
    */
    outAnimation : PropTypes.oneOf( [
        'fadeOut',
        'slideOutDown',
        'slideOutLeft',
        'slideOutRight',
        'slideOutUp',
    ] ),
    /**
    * Animate enter animation duration
    */
    transitionEnterTimeout : PropTypes.number,
    /**
    * Animate out animation duration
    */
    transitionLeaveTimeout : PropTypes.number,
};

Animate.defaultProps =
{
    transitionEnterTimeout : 1000,
    transitionLeaveTimeout : 1000,
    enterAnimation         : 'fadeIn',
    outAnimation           : 'fadeOut',
    cssMap                 : require( './animate.css' ),
};

export default Animate;
