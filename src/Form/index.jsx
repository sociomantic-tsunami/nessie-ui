import React                from 'react';
import PropTypes            from 'prop-types';

import Css                  from '../hoc/Css';

const Form = ( {
    action,
    children,
    className,
    cssMap,
    method,
    onSubmit, } ) =>

        <Css cssMap = { cssMap }>
            <form
                className = { className }
                action    = { action }
                method    = { method }
                onSubmit  = { onSubmit }>
                <div className = { cssMap.content }>
                    { children }
                </div>
            </form>
        </Css>;

Form.propTypes =
{
    /**
    *  HTML action attribute
    */
    action   : PropTypes.string,
    /**
    *  HTML method attribute
    */
    method   : PropTypes.oneOf( [ 'post', 'get' ] ),
    /**
    *  Form content to wrap
    */
    children : PropTypes.node,
    /**
    *  Submit callback function: ( e ) => { ... }
    */
    onSubmit : PropTypes.func,
};

Form.defaultProps =
{
    action     : '#',
    method     : 'post',
    isDisabled : false,
    cssMap     : require( './form.css' )
};

export default Form;
