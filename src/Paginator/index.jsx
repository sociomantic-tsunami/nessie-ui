/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import React                from 'react';
import PropTypes            from 'prop-types';

import { buildClassName }   from '../utils';
import styles               from './paginator.css';
import { IconButton, Text } from '../index';


const Paginator = ( {
    className,
    cssMap,
    currentPage,
    ellipsisText,
    endPage,
    nextLabel,
    onClickNext,
    onClickPage,
    onClickPrev,
    prevLabel,
    showNext,
    showNextEllipsis,
    shownPages = [],
    showPrev,
    showPrevEllipsis,
    startPage,
} ) =>
{
    const pageButtons = shownPages.map( pageNum => (
        <button
            className = { cssMap.pageButton }
            disabled  = { pageNum === currentPage }
            key       = { pageNum }
            onClick   = { onClickPage }
            type      = "button"
            value     = { String( pageNum ) }>
            { pageNum }
        </button>
    ) );

    const showStartPage = typeof startPage === 'number';
    const showEndPage   = typeof endPage   === 'number';

    const ellipsis = (
        <div className = { cssMap.ellipsis }>
            { ellipsisText }
        </div>
    );

    return (
        <div
            aria-label = "Pagination"
            className  = { buildClassName( className, cssMap ) }
            role       = "navigation">
            { showPrev &&
                <IconButton
                    className = { cssMap.arrows }
                    iconSize  = "S"
                    iconTheme = "navigation"
                    iconType  = "left"
                    onClick   = { onClickPrev }>
                    { prevLabel }
                </IconButton>
            }

            { showStartPage &&
                <button
                    className = { cssMap.pageButton }
                    disabled  = { currentPage === startPage }
                    onClick   = { onClickPage }
                    type      = "button"
                    value     = { String( startPage ) }>
                    <Text role = { null }>{ startPage }</Text>
                </button>
            }

            { showStartPage && showPrevEllipsis && ellipsis }

            { ( pageButtons && pageButtons.length ) &&
                <div className = { cssMap.pageButtons }>
                    <Text>{ pageButtons }</Text>
                </div>
            }

            { showEndPage && showNextEllipsis && ellipsis }

            { showEndPage &&
                <button
                    className = { cssMap.pageButton }
                    disabled  = { currentPage === endPage }
                    onClick   = { onClickPage }
                    type      = "button"
                    value     = { String( endPage ) }>
                    <Text role = { null }> { endPage }</Text>
                </button>
            }

            { showNext &&
                <IconButton
                    className = { cssMap.arrows }
                    iconTheme = "navigation"
                    iconSize  = "S"
                    iconType  = "right"
                    onClick   = { onClickNext }>
                    { nextLabel }
                </IconButton>
            }
        </div>
    );
};

Paginator.propTypes =
{
    /**
     *  CSS class map
     */
    cssMap           : PropTypes.objectOf( PropTypes.string ),
    /**
     *  Currently active page
     */
    currentPage      : PropTypes.number,
    /**
     *  Ellipsis text to display
     */
    ellipsisText     : PropTypes.string,
    /**
     *  Show “Previous” button
     */
    endPage          : PropTypes.number,
    /**
     *  “Next” button text
     */
    nextLabel        : PropTypes.string,
    /**
     *  Function to call on “Next” button click: ( e ) => { ... }
     */
    onClickNext      : PropTypes.func,
    /**
     *  Function to call on page button click: ( e ) => { ... }
     */
    onClickPage      : PropTypes.func,
    /**
     *  Function to call on “Previous” button click: ( e ) => { ... }
     */
    onClickPrev      : PropTypes.func,
    /**
     *  “Previous” button text
     */
    prevLabel        : PropTypes.string,
    /**
     *  Show “Next” button
     */
    showNext         : PropTypes.bool,
    /**
     *  Display ellipsis before last page
     */
    showNextEllipsis : PropTypes.bool,
    /**
     *  Page range to show
     */
    shownPages       : PropTypes.arrayOf( PropTypes.number ),
    /**
     *  Show “Previous” button
     */
    showPrev         : PropTypes.bool,
    /**
     *  Display ellipsis after first page
     */
    showPrevEllipsis : PropTypes.bool,
    /**
     *  Startpage
     */
    startPage        : PropTypes.number,
};

Paginator.defaultProps =
{
    cssMap           : styles,
    currentPage      : undefined,
    ellipsisText     : '…',
    endPage          : undefined,
    nextLabel        : 'Next',
    onClickNext      : undefined,
    onClickPage      : undefined,
    onClickPrev      : undefined,
    prevLabel        : 'Previous',
    showNext         : false,
    showNextEllipsis : true,
    shownPages       : undefined,
    showPrev         : false,
    showPrevEllipsis : true,
    startPage        : undefined,
};

export default Paginator;
