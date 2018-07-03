import React            from 'react';
import PropTypes        from 'prop-types';

import { generateId }   from '../utils';
import Css              from '../hoc/Css';
import H1               from '../H1';
import H2               from '../H2';
import H3               from '../H3';
import H4               from '../H4';

const headers = {
    1 : H1, 2 : H2, 3 : H3, 4 : H4
};

export default class Section extends React.PureComponent
{
    static propTypes =
    {
        /**
         * HTML id attribute (overwrite default)
         */
        id       : PropTypes.string,
        /**
         *  Section title
         */
        title    : PropTypes.string,
        /**
         *  Section content
         */
        children : PropTypes.node,
        /**
         *  Section level in the document outline
         */
        level    : PropTypes.number
    };

    static defaultProps =
    {
        hasDivider : false,
        id         : undefined,
        cssMap     : require( './section.css' )
    };

    render()
    {
        const {
            cssMap,
            className,
            children,
            id = generateId( 'Section' ),
            level,
            title
        } = this.props;

        const SectionHeader = headers[ level ];

        return (
            <Css
                cssMap   = { cssMap }
                cssProps = { {
                    level
                } }>
                <section className = { className } id = { id }>
                    { title && SectionHeader &&
                        <SectionHeader>{ title }</SectionHeader>
                    }
                    <div className = { cssMap.content }>
                        { children }
                    </div>
                </section>
            </Css>
        );
    }
}
