import React from "react";
import Leaves from './containerLeaves';

const Renderer = React.memo(() => {
    return (
        <Leaves />
    )
});

export default Renderer;