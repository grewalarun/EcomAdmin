import React from 'react';
import { useParams } from 'react-router-dom';
import Description from './description';
import BasicInfoEdit from './basicinfoEdit';

const EditProduct = () => {
  const params = useParams(); 
    return ( <>
    

<BasicInfoEdit id={params.id}/>
<Description id={params.id}/>
</>
     );
}
 
export default EditProduct;