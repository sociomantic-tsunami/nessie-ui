import React                                from 'react';
import PropTypes                            from 'prop-types';

import styles                               from './withDropdown.css';
import { buildClassName, buildDisplayName } from '../utils';

import Dropdown                             from './index';


const withDropdown = Component =>
{
    const ComponentWithDropdown = ( {
        cssMap,
        dropdownIsOpen,
        dropdownPosition,
        dropdownProps,
        onMouseOut,
        onMouseOver,
        wrapperRef,
        ...componentProps,
    } ) => (
        <div
            ref       = { wrapperRef }
            className = { buildClassName( '', styles, {
                open     : dropdownIsOpen,
                position : dropdownPosition,
            } ) }
            onMouseEnter = { onMouseOver }
            onMouseLeave = { onMouseOut }>
            <Component { ...componentProps } />
            <Dropdown { ...dropdownProps } className = { styles.dropdown } />
        </div>
    );

    ComponentWithDropdown.propTypes = {
        ...Component.propTypes,
        /**
         *  Show/hide the dropdown
         */
        dropdownIsOpen   : PropTypes.bool,
        /**
         *  Position of dropdown relative to component
         */
        dropdownPosition : PropTypes.oneOf( [ 'bottom', 'top' ] ),
        /**
         *  Props to pass directly to the Dropdown component
         */
        dropdownProps    : PropTypes.objectOf( PropTypes.any ),
        /**
         *  Callback function that receives a ref to the outer wrapper div
         */
        wrapperRef       : PropTypes.func,
    };

    ComponentWithDropdown.defaultProps = {
        ...Component.defaultProps,
        dropdownIsOpen   : false,
        dropdownPosition : 'bottom',
        dropdownProps    : undefined,
        wrapperRef       : undefined,
    };

    ComponentWithDropdown.displayName =
        buildDisplayName( ComponentWithDropdown, Component );

    return ComponentWithDropdown;
};

export default withDropdown;
