import React, { Component } from 'react';
import PropTypes            from 'prop-types';

import Css                  from '../hoc/Css';

export default class Form extends Component
{
    static propTypes =
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

    static defaultProps =
    {
        action     : '#',
        method     : 'post',
        isDisabled : false,
        cssMap     : require( './form.css' )
    };

    render()
    {
        const {
            action,
            children,
            className,
            cssMap,
            method,
            onSubmit,
        } = this.props;

        return (
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
            </Css>
        );
    }
}
