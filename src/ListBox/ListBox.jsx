import React, { Children, cloneElement } from 'react';
import PropTypes from 'prop-types';

import ListBoxOption                from '../ListBox/ListBoxOption';
import ListBoxOptionGroup           from '../ListBox/ListBoxOptionGroup';

import styles    from './listBox.css';
import {
    buildClassName,
    generateId,
    mapAria,
} from '../utils';

const killFocus = e => e.preventDefault();


/*
 * Tests whether option is a selected option
 *
 */
const isSelectedOption = ( option, selection ) =>
{
    if ( Array.isArray( selection ) )
    {
        return selection.indexOf( option.props.id ) > -1;
    }
    return option.props.id === selection;
};

/*
 * Builds ListBoxOptions/ListBoxGroups from array of objects
 *
 */
const buildOptions = ( options = [] ) =>
    options.map( ( option = {} ) =>
    {
        if ( option.header )
        {
            const { options: groupOptions, ...groupProps } = option;

            return (
                <ListBoxOptionGroup { ...groupProps }>
                    { buildOptions( groupOptions ) }
                </ListBoxOptionGroup>
            );
        }

        return (
            <ListBoxOption { ...option } />
        );
    } );

/*
 * Updates the props of the ListBoxOptions
 *
 */
const updateOptions = ( options = [], props ) =>
{
    if ( props )
    {
        return React.Children.toArray( options ).map( ( option = {} ) =>
        {
            if ( option.props.header )
            {
                return React.cloneElement( option, {
                    children : updateOptions( option.props.children, props )
                } );
            }

            return React.cloneElement( option, {
                isActive    : option.props.id === props.activeOption,
                onClick     : props.onClickOption,
                onMouseOut  : props.onMouseOutOption,
                onMouseOver : props.onMouseOverOption,
                isSelected  : isSelectedOption( option, props.selection ),
            } );
        } );
    }

    return options;
};

const ListBox = ( {
    aria,
    activeOption,
    children,
    className,
    cssMap,
    isFocusable,
    isMultiselect,
    id = generateId( 'ListBox' ),
    onClick,
    onClickOption,
    onMouseOutOption,
    onMouseOverOption,
    onKeyPress,
    options,
    selection,
} ) => (
        <ul
            { ...mapAria( {
                ...aria,
                activeDescendant : isFocusable ? activeOption : null,
                multiSelectable  : isMultiselect,
                role             : 'listbox',
            } ) }
            className   = { buildClassName( className, cssMap ) }
            id          = { id }
            onKeyPress  = { onKeyPress }
            onMouseDown = { !isFocusable && killFocus }
            tabIndex    = { isFocusable ? '0' : '-1' }>
            { updateOptions( children || buildOptions( options ),
                {
                    activeOption,
                    onClickOption,
                    onMouseOutOption,
                    onMouseOverOption,
                    selection,
                } )
            }
        </ul>
);


ListBox.propTypes = {
    aria            : PropTypes.objectOf( PropTypes.string ),
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
    selection       : PropTypes.oneOfType( [
        PropTypes.string,
        PropTypes.arrayOf( PropTypes.string ),
    ]),
};

ListBox.defaultProps = {
    aria            : undefined,
    activeOption    : undefined,
    children        : undefined,
    className       : undefined,
    cssMap          : styles,
    isFocusable     : true,
    isMultiselect   : false,
    id              : undefined,
    options         : undefined,
    onClick         : undefined,
    onKeyPress      : undefined,
    selection       : undefined,
};

export default ListBox;
