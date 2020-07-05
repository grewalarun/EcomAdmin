import React from 'react';
import axios from "axios";
import {
    CButton,
    CCard,
    CCardBody,
    CCol,
    CImg,
    CFormGroup,
    CInput,
    CLabel,
    CSelect,
    CRow,
  } from "@coreui/react";
  import CIcon from "@coreui/icons-react";
  const initialFormData = Object.freeze({
    productname: "",
    category: "",
    brand: "",
    sellingprice: "",
    catid:"",
    mrp: "",
    filename: "",
  });
  
  const BasicinfoEdit = (props) => {
    const [formData, updateFormData] = React.useState(initialFormData);
//    const [imagefile, setImagefile] = React.useState();
    const [error, seterror] = React.useState(initialFormData,{ status: true});
    const [cat, setCat] = React.useState([]);
    React.useEffect(()=>{
      axios
      .get('http://localhost:3500/api/allcategories')
      .then(
        res=> {
          setCat(res.data.response)
        }
      )
      .catch(err=>{
        console.log(err)
      })
    },[])
  
    const handleChange = (e) => {
      updateFormData({
        ...formData,
  
        // Trimming any whitespace
        [e.target.name]: e.target.value.trim(),
        
      });
     
     // vald(formData);
    };
    // const fileChangeHandler = (e) => {
    // //console.log(e.target.files[0]);
    // setImagefile({
    //   mainimage: e.target.files[0],
    //   filestatus:true
    // });
    // }
    const vald = (b) => {
      if (b.sellingprice==="") {
        seterror((prevState) => ({
          ...prevState,
          sellingprice: "Selling Price is required",
          status: false,
        }));
      } else {
        seterror((prevState) => ({ ...prevState,  sellingprice: "",status:true}));
      }
    };
    const handleSubmit = (e) => {
      e.preventDefault();
     
      const fd = new FormData();
     // fd.append('image',imagefile.mainimage);
      fd.append('form',JSON.stringify(formData));
      console.log(fd);
      axios.put('http://localhost:3500/api/fakeproducts/'+props.id, fd)
      .then(function(response){
   //Perform action based on response
        alert(response.data.data);
        console.log(response.data);
       updateFormData();
    })
      .catch(function(error){
        console.log(error);
    //Perform action based on error
      });
      // ... submit to API or something
      
    };
    const [data, setData] = React.useState([{name:'',price:'',selling_price:'',category:'', cat_id:''}]);
    React.useEffect(()=>{
      axios
      .get('http://localhost:3500/api/products/'+props.id)
      .then(
        res=> {
          setData(res.data.response)
        }
      )
      .catch(err=>{
        console.log(err)
      })
    },[formData])
const productsData = data;
//Defining Existing values
const name = productsData[0].name;
const sellingprice = productsData[0].selling_price;
const price = productsData[0].price;
var imgStyle = {
  maxWidth:'100%',
  height:'auto',
  maxHeight:'315px'
}
return ( 
        <>
<h2>Edit Product {productsData[0].name}</h2> 
<CRow>
        <CCol xs="12" sm="6">
          <CCard>
              <form onSubmit={handleSubmit}>
            <CCardBody>
              <CRow>
                <CCol xs="12">
                  <CFormGroup>
                    <CLabel htmlFor="name">Product Name</CLabel>
                    <CInput
                      id="name"
                      placeholder={name}
                      name="productname"
                      onChange={handleChange}
                      defaultValue={name}
                      required
                    />
                  </CFormGroup>
                </CCol>
              </CRow>
              <CRow>
              <CCol xs="6">
                  <CFormGroup>
                    <CLabel htmlFor="sellingprice">Selling Price</CLabel>
                    <CInput
                      id="sellingprice"
                      //placeholder="Enter Selling Price"
                      name="sellingprice"
                      onChange={handleChange}
                      defaultValue={sellingprice}
                      required
                    />
                  </CFormGroup>
                </CCol>
              <CCol xs="6">
                  <CFormGroup>
                    <CLabel htmlFor="price">Price</CLabel>
                    <CInput
                      id="mrp"
                      placeholder="Enter Price"
                      name="mrp"
                      onChange={handleChange}
                      defaultValue={price}
                      required
                    />
                  </CFormGroup>
                </CCol>
              </CRow>
              <CRow>
                <CCol xs="6">
                  <CFormGroup>
                    <CLabel htmlFor="category">Category</CLabel>
                    <CSelect
                      custom
                      id="category"
                      name="category"
                      onChange={handleChange}
                    >

<option value="">{productsData[0].category}</option>
                      
                  {cat.map(ct=>(<option key={ct.catid} value={ct.catid}>{ct.parent_category!=0?ct.parent_category+' ⟶ '+ct.category:ct.category}</option>))}
                    </CSelect>
                  </CFormGroup>
                </CCol>
         
              </CRow>
              <CButton type= "submmit" color="primary">
                Submit
              </CButton>
              </CCardBody>
              </form>
              </CCard>
              </CCol>
              <CCol xs="12" sm="6">
                {productsData[0].productImage? 
                <div className="imgwrapper">
              <CImg
            src={'http://localhost:3500/'+productsData[0].productImage}
            style={imgStyle}
            className="rounded"
            alt="image"
          />
          </div>
          :false}
              </CCol>
              </CRow>
</>
 );
}
 
export default BasicinfoEdit;
