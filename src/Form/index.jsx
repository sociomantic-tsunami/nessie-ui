import React              from 'react';
import PropTypes          from 'prop-types';

import { buildClassName } from '../utils';
import styles             from './form.css';

const Form = ( {
    action,
    children,
    className,
    cssMap,
    method,
    onSubmit,
} ) => (
    <form
        action    = { action }
        className = { buildClassName( className, cssMap ) }
        method    = { method }
        onSubmit  = { onSubmit }>
        { children }
    </form>
);

Form.propTypes =
{
    /**
     *  HTML action attribute
     */
    action   : PropTypes.string,
    /**
     *  Form content to wrap
     */
    children : PropTypes.node,
    /**
     *  HTML method attribute
     */
    method   : PropTypes.oneOf( [ 'post', 'get' ] ),
    /**
     *  Submit callback function: ( e ) => { ... }
     */
    onSubmit : PropTypes.func,
};

Form.defaultProps =
{
    action   : '#',
    children : undefined,
    cssMap   : styles,
    method   : 'post',
    onSubmit : undefined,
};

export default Form;
