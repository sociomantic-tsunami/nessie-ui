import React                                from 'react';
import PropTypes                            from 'prop-types';

import styles                               from './withSticky.css';
import { buildClassName, buildDisplayName } from '../index';


const withSticky = Component =>
{
    const StickyComponent = ( {
        cssMap,
        isSticky,
        stickyPosition,
        ...componentProps,
    } ) => (
        <Component
            { ...componentProps }
            className = { buildClassName( '', styles, {
                sticky   : isSticky,
                position : stickyPosition,
            } ) }
        />
    );

    StickyComponent.propTypes = {
        ...Component.propTypes,
        /**
         *  Makes the component sticky
         */
        isSticky : PropTypes.bool,
        /**
        *  Sticky component position
        */
        position : PropTypes.oneOf( [ 'left', 'right', 'top', 'bottom' ] ),
    };

    StickyComponent.defaultProps = {
        ...Component.defaultProps,
        isSticky       : false,
        stickyPosition : 'top'
    };

    StickyComponent.displayName =
        buildDisplayName( StickyComponent, Component );

    return StickyComponent;
};

export default withSticky;
