import React                                from 'react';
import PropTypes                            from 'prop-types';

import styles                               from './withDropdown.css';
import { buildClassName, buildDisplayName } from '../utils';

import Dropdown                             from './index';


const withDropdown = Component =>
{
    const WithDropdown = ( {
        cssMap,
        dropdownIsOpen,
        dropdownPosition,
        dropdownProps,
        ...componentProps
    } ) => (
        <div
            className = { buildClassName( '', cssMap, {
                open     : dropdownIsOpen,
                position : dropdownPosition,
            } ) }>
            <Component { ...componentProps } />
            <Dropdown { ...dropdownProps } className = { styles.dropdown } />
        </div>
    );

    WithDropdown.propTypes = {
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
    };

    WithDropdown.defaultProps = {
        ...Component.defaultProps,
        cssMap           : styles,
        dropdownIsOpen   : false,
        dropdownPosition : 'bottom',
        dropdownProps    : undefined,
    };

    WithDropdown.displayName = buildDisplayName( WithDropdown, Component );

    return WithDropdown;
};

export default withDropdown;
