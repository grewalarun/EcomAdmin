import React from 'react';
import axios from "axios";
import {
  CButton,
  CCard,
  CCardHeader,
  CDataTable,
  CCardBody,
  CCol,
  CImg,
  CFormGroup,
  CInput,
  CInputFile,
  CLabel,
  CSelect,
  CRow,
  } from "@coreui/react";



  const Category = () => {

  
    const [formData, updateFormData] = React.useState({catname:'',parent_category:'',imagefile:''});
    const [imagefile, setImagefile] = React.useState([]);
    const handleChange = (e) => {
      updateFormData({
        ...formData,
  
        // Trimming any whitespace
        [e.target.name]: e.target.value.trim(),
        
      });
     
     // vald(formData);
    };
    const fileChangeHandler = (e) => {
        //console.log(e.target.files[0]);
        setImagefile({
          mainimage: e.target.files[0],
          filestatus:true
        });
        }        

    const [data, setData] = React.useState([]);
    React.useEffect(()=>{
      axios
      .get('http://localhost:3500/api/allcategories/')
      .then(
        res=> {
          setData(res.data.response)
        }
      )
      .catch(err=>{
        console.log(err)
      })
    },[formData])
    const fields = ['Icon','parent_category','category']

    const handleSubmit = (e) => {
        e.preventDefault();
       
        const fd = new FormData();
      
       console.log(imagefile);
       fd.append('image',imagefile.mainimage);
        fd.append('form',JSON.stringify(formData));
        console.log(fd);
        axios.post('http://localhost:3500/api/category/', fd)
        .then(function(response){
     //Perform action based on response
          console.log(response);
          updateFormData({catname:'',parent_category:0})
      })
        .catch(function(error){
          console.log(error);
      //Perform action based on error
        });
    }
      
    
    return (
      <>
      <CRow>
      <CCol xs="12" lg="12" className="mb-3">    
      <CCard>
            <form onSubmit={handleSubmit}>
            <CCardBody>
              <CRow>
                <CCol xs="6">
                  <CFormGroup>
                    <CLabel htmlFor="catname">Category Name</CLabel>
                    <CInput
                      id="catname"
                      placeholder="Category Name"
                      name="catname"
                      value={formData.catname}
                      onChange={handleChange}
                      required
                    />
                  </CFormGroup>
                </CCol>
              </CRow>
              <CRow>
                <CCol xs="6">
                <CFormGroup>
                    <CLabel htmlFor="parentcat">Parent Category</CLabel>
                    <CSelect
                      custom
                      id="parentcat"
                      name="parentcat"
                      onChange={handleChange}
                    >
                  
                      <option value="0">Root</option>
        {data.map(ct=>(ct.parent_category==0)? <option key={ct.catid} value={ct.category}>{ct.category}</option>:false)}
                  
    {/* {data.map(a=>(<option key={a.id} value={a.parent_category}>{a.category}</option>))} */}
 
                      
                    </CSelect>
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
                    onChange={fileChangeHandler}
                  />
                  <CLabel
                    htmlFor="custom-file-input"
                    variant="custom-file"
                    
                  >
                    Choose file...
                  </CLabel>
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
        <CRow>
          <CCol xs="12" lg="12">
            <CCard>
              <CCardHeader>
                Categories
              </CCardHeader>
              <CCardBody>
              <CDataTable
                items={data}
                fields={fields}
                itemsPerPage={5}
                pagination

                scopedSlots = {{
                  'Icon':
                  (item)=>(
                    <td>
                    {  item.Icon?
           <div className="c-avatar">
          <CImg
            src={'http://localhost:3500/'+item.Icon}
            
            width= "50px"
            height="50px"
            alt="cat"
          />
        </div>
        :false}
            
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
 export default Category;
