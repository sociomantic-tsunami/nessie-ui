import React, { isReactElement } from 'react';
import PropTypes                 from 'prop-types';

import Css                       from '../hoc/Css';
import ListBoxOption             from './ListBoxOption';
import styles                    from './listBox.css';


const generateId = name =>
    `${name}-${Math.floor( ( Math.random() * 9e15 ) + 1e15 )}`;

const mapToAria = val =>
{
    if ( typeof val === 'boolean' )
    {
        return val ? 'true' : 'false';
    }

    return val;
};

const mapFocusable = isFocusable => ( isFocusable ? '0' : '-1' );

const buildOptions = ( {
    activeOption,
    children,
    options = [],
    selectedOptions
} ) =>
    ( children || options ).map( ( opt = {} ) =>
    {
        const { isActive, isSelected, ...props } = isReactElement( opt ) ?
            opt.props : opt;

        return (
            <ListBoxOption
                isActive   = { props.id === activeOption || isActive }
                isSelected = { selectedOptions.indexOf( props.id ) > -1 ||
                    isSelected }
                { ...props } />
        );
    } );

const ListBox = ( {
    className,
    cssMap,
    isFocusable,
    isMultiselect,
    id,
    onClick,
    onKeyPress,
    ...props
} ) => (
    /* eslint-disable jsx-a11y/aria-activedescendant-has-tabindex */
    // nonsense ^^
    <Css cssMap = { cssMap }>
        <ul
            aria-activedescendant = { isFocusable && props.activeOption }
            aria-multiselectable  = { mapToAria( isMultiselect ) }
            className             = { className }
            id                    = { id }
            onClick               = { onClick &&
                ( e => onClick( e, e.target.id ) ) }
            onKeyPress            = { onKeyPress }
            role                  = "listbox"
            tabIndex              = { mapFocusable( isFocusable ) }>
            { buildOptions( props ) }
        </ul>
    </Css>
    /* eslint-enable jsx-a11y/no-noninteractive-element-interactions */
);


ListBox.propTypes = {
    activeOption    : PropTypes.string,
    children        : PropTypes.node,
    className       : PropTypes.string,
    cssMap          : PropTypes.objectOf( PropTypes.string ),
    isFocusable     : PropTypes.bool,
    isMultiselect   : PropTypes.bool,
    id              : PropTypes.string,
    options         : PropTypes.arrayOf( PropTypes.object ),
    onClick         : PropTypes.func,
    onKeyPress      : PropTypes.func,
    selectedOptions : PropTypes.arrayOf( PropTypes.string ),
};

ListBox.defaultProps = {
    activeOption    : null,
    children        : null,
    className       : null,
    cssMap          : styles,
    isFocusable     : true,
    isMultiselect   : false,
    id              : generateId( 'ListBox' ),
    options         : null,
    onClick         : null,
    onKeyPress      : null,
    selectedOptions : null,
};

export default ListBox;
