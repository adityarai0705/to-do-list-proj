import React from "react";

export default function Image(prop) {
    if( prop.image == undefined){
        return (
        <p className="text-yellow-900">{'No Image'}</p>
        );
    }else{
        return (
            <img src={prop.image} style={{'height':'30vw'}} className='rounded-lg'></img>
        );
    }
}