import React from "react";
import axios from "axios";

import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CFormGroup,
  CTextarea,
  CInput,
  CInputFile,
  CInputCheckbox,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CLabel,
  CSelect,
  CRow
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

const Addproduct = () => {
  const [formData, updateFormData] = React.useState(initialFormData);
  const [imagefile, setImagefile] = React.useState([{fileurl:''}]);
//  const [preview, setpreview] = React.useState([{fileurl:''}]);
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
      [e.target.name]: e.target.value,
      
    });
   
   // vald(formData);
  };
  const fileChangeHandler = (e) => {
  //console.log(e.target.files[0]);
  setImagefile({
    mainimage: e.target.files[0],
    fileurl: URL.createObjectURL(e.target.files[0]),
    filestatus:true
  });
  }


  const handleSubmit = (e) => {
  e.preventDefault();
  const fd = new FormData();
    fd.append('image',imagefile.mainimage);
    fd.append('form',JSON.stringify(formData));
    console.log(fd);
    axios.post('http://localhost:3500/api/products/', fd,{    onUploadProgress:ProgressEvent => {
      alert('Upload Progress'+((ProgressEvent.loaded/ProgressEvent.total)*100));
    }})

  .then(function(response){
 //Perform action based on response
updateFormData({
  //...formData,
  productname: "",
  sellingprice: "",
  mrp: "",
  filename: "",
});
      alert(response.data.message);
  })
    .catch(function(error){
      console.log(error);
  //Perform action based on error
    });
    // ... submit to API or something    
    // ... submit to API or something
  };
  var imgStyle={
    maxWidth:'150px',
    maxHeight:'150px',
    height:'auto'
  }
  return (
    <>


      <h1>Add New Product</h1>
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
                      placeholder="Enter Product Name"
                      name="productname"
                      value={formData.productname}
                      onChange={handleChange}
                      className={error.productname!=""?"invalid":"valid" }
                      required
                    />
                    {error.productname}
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
                      className={error.class }
                    >

                      <option value="">-</option>
                      
                  {cat.map(ct=>(<option key={ct.catid} value={ct.catid}>{ct.parent_category!=0?ct.parent_category+' ⟶ '+ct.category:ct.category}</option>))}
                    </CSelect>
                  </CFormGroup>
                  {error.category}
                </CCol>
                
                <CCol xs="6">
                  <CFormGroup>
                    <CLabel htmlFor="brand">Brand</CLabel>
                    <CSelect
                      custom
                      id="brand"
                      name="brand"
                      onChange={handleChange}
                    >
                      <option value="">-</option>
                      <option>2020</option>
                      <option>2021</option>
                      <option>2022</option>
                      <option>2023</option>
                      <option>2024</option>
                      <option>2025</option>
                      <option>2026</option>
                    </CSelect>
                  </CFormGroup>
                </CCol>
              </CRow>
              <CRow>
                <CCol md="6">
                  <CFormGroup>
                    <CLabel htmlFor="sellingprice">Selling Price</CLabel>
                    <CInputGroup>
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-dollar" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        id="sellingprice"
                        placeholder="Selling Price"
                        name="sellingprice"
                        onChange={handleChange}
                        value={formData.sellingprice}
                        pattern="[0-9]{0,5}"
                        className={error.class }
                      />
                    </CInputGroup>
                    {error.sellingprice}
                  </CFormGroup>
                </CCol>
                <CCol md="6">
                  <CFormGroup>
                    <CLabel htmlFor="price">Price (MRP)</CLabel>
                    <CInputGroup>
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-dollar" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        id="price"
                        placeholder="Price"
                        name="mrp"
                        onChange={handleChange}
                        value={formData.mrp}
                        className={error.class }
                      />
                    </CInputGroup>
                    {error.mrp}
                  </CFormGroup>
                </CCol>
              </CRow>
              <CFormGroup row>
                <CLabel col md={3}>
                  Image
                </CLabel>
                <CCol xs="12" md="9">
                  <CInputFile
                    custom
                    id="custom-file-input"
                    name="filename"
                    value={formData.filename}
                    onChange={fileChangeHandler}
                  />
                  <CLabel
                    htmlFor="custom-file-input"
                    variant="custom-file"
                    
                  >
                    Choose file...
                  </CLabel>
                  {imagefile.fileurl?<img src={imagefile.fileurl} alt="preview" style={imgStyle}/>:false}
                </CCol>
              </CFormGroup>
              <CButton type= "submmit" color="primary">
                Submit
              </CButton>
            </CCardBody>
            </form>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default Addproduct;
