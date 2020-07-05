import React from 'react';
import axios from "axios";
import {
    CButton,
    CBadge,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CImg,
    CDataTable,
    CRow
  } from '@coreui/react'
  

  const getBadge = status => {
    switch (status) {
      case 1: return 'success'
      case 0: return 'secondary'
      case 'Pending': return 'warning'
      case 'Banned': return 'danger'
      default: return 'primary'
    }
  }

 

  const Products = () => {


    const [data, setData] = React.useState([]);
    React.useEffect(()=>{
      axios
      .get('http://localhost:3500/api/products/')
      .then(
        res=> {
          setData(res.data)
        }
      )
      .catch(err=>{
        console.log(err)
      })
    },[])
const productsData = data.data;
console.log(productsData);
    const fields = ['productImage','name','category','price','selling_price','status','edit']
    return (
      <>
      <CRow>
      <CCol xs="12" lg="12" className="text-right mb-3">    
      <CButton color="primary" to="/catalog/addproduct">Add Product</CButton>
      </CCol>
      </CRow>
        <CRow>
          <CCol xs="12" lg="12">
            <CCard>
              <CCardHeader>
                Product List
              </CCardHeader>
              <CCardBody>
              <CDataTable
                items={productsData}
                fields={fields}
                itemsPerPage={5}
                pagination

                scopedSlots = {{
                  'category':
                  (item)=>(
                    <td>
                      {item.parent_category!=0?
                        (item.parent_category +' ⟶ '+ item.category)
                          
                      
                      :item.category}
                      
                    </td>
                  ),
                  'status':
                    (item)=>(
                      <td>
                        <CBadge color={getBadge(item.status)}>
                          {item.status==0?'Inactive':'Active'}
                       </CBadge>
                      </td>
                    ),
                    'productImage':
                    (item)=>(
                      <td>
                           <div className="c-avatar">
          <CImg
            src={'http://localhost:3500/'+item.productImage}
            
            width= "50px"
            height="50px"
            alt="admin@bootstrapmaster.com"
          />
        </div>
                      </td>
                    ),
                    'edit':
                      (item)=>(
                        <td>
                           <CButton block color="link" to={"/catalog/EditProduct/"+item.id}>
                           Edit
                           </CButton>
                        </td>
                      )
  
                }}
              />
              </CCardBody>
            </CCard>
          </CCol>
          </CRow>
</>
    )
}
 export default Products;
