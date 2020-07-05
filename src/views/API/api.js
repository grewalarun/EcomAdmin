
//  export default {
//      hi: ()=> {
//         return({iname: 'John Doe'})
        
//      }
//  };
import React from 'react';
import axios from "axios";

export default {

    hi: (
        
            axios.get('http://localhost:3500/api/products/').then(response => {
            
                var pagelist = JSON.stringify(response.data);
               // console.log(pagelist);
            
            })
           
    )


};