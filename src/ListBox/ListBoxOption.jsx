import React         from 'react';
import PropTypes     from 'prop-types';

import { Text }      from '../index';
import Css           from '../hoc/Css';
import styles        from './listBoxOption.css';

const generateId = name =>
    `${name}-${Math.floor( ( Math.random() * 9e15 ) + 1e15 )}`;


const mapAria = val =>
{
    if ( typeof val === 'boolean' )
    {
        return val ? 'true' : 'false';
    }

    return val;
};

const buildLabel = ( { children, text, value } ) =>
{
    let label;

    if ( children )
    {
        label = children;
    }
    else
    {
        label = typeof text !== 'undefined' ? text : value;
        label = String( label );
    }

    label = typeof label === 'string' ? <Text>{ label }</Text> : label;

    return label;
};

const ListBoxOption = ( {
    className,
    cssMap,
    isActive,
    id,
    isDisabled,
    isSelected,
    ...props
} ) => (
    /* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
    // a dubious rule anyways ^^
    <Css
        cssMap   = { cssMap }
        cssProps = { {
            disabled : isDisabled,
            active   : isActive,
            selected : isSelected,
        } }>
        <li
            aria-selected = { mapAria( isSelected ) }
            className     = { className }
            id            = { id }
            role          = "option">
            { buildLabel( props ) }
        </li>
    </Css>
    /* eslint-enable jsx-a11y/no-noninteractive-element-interactions */
);

ListBoxOption.propTypes = {
    children   : PropTypes.node,
    className  : PropTypes.string,
    cssMap     : PropTypes.objectOf( PropTypes.string ),
    isActive   : PropTypes.bool,
    id         : PropTypes.string,
    isDisabled : PropTypes.bool,
    isSelected : PropTypes.bool,
    text       : PropTypes.string,
    value      : PropTypes.string,
};

ListBoxOption.defaultProps = {
    children   : null,
    className  : null,
    cssMap     : styles,
    isActive   : false,
    id         : generateId( 'ListBoxOption' ),
    isDisabled : false,
    isSelected : false,
    text       : null,
    value      : null,
};

export default ListBoxOption;
