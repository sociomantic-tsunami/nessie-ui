import React from 'react';

import Text  from './index';


const wrapText = node =>
    ( typeof node === 'string' ? <Text>{ node }</Text> : node );


export { wrapText };
export default { wrapText };
