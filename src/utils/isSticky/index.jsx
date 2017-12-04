import React                                from 'react';
import PropTypes                            from 'prop-types';

import styles                               from './sticky.css';
import { buildClassName, buildDisplayName } from '../';


const sticky = Component =>
{
    const Sticky = ( {
        cssMap,
        isSticky,
        stickyPosition,
        ...componentProps
    } ) => (
        <Component
            { ...componentProps }
            className = { buildClassName( '', cssMap, {
                sticky   : isSticky,
                position : stickyPosition,
            } ) }
        />
    );

    Sticky.propTypes = {
        ...Component.propTypes,
        /**
         *  Makes the component sticky
         */
        isSticky : PropTypes.bool,
        /**
        *  Sticky component position
        */
        position : PropTypes.oneOf( [
            'left',
            'right',
            'top',
            'bottom' ] )
    };

    Sticky.defaultProps = {
        ...Component.defaultProps,
        cssMap         : styles,
        isSticky       : false,
        stickyPosition : 'top'
    };

    Sticky.displayName = buildDisplayName( Sticky, Component );

    return Sticky;
};

export default sticky;
