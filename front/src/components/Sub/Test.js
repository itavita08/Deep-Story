import React from "react";

function Test({ test }) { 
    return (
        <div>
            <h2>title : {test.title}</h2>
            <h2>content : {test.content}</h2>
            <h2>image : {test.image}</h2>
        </div>
    );
}

export default test;