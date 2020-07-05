import React from "react";
import axios from "axios";
import CKEditor from "ckeditor4-react";
import { CButton } from "@coreui/react";

const Description = (props) => {
  const [data, setData] = React.useState({ p_id: props.id, description: "No Decription" });
  const [desData, setDesData] = React.useState({desc:"",descData:"Initial Description"});
  React.useEffect(() => {
    axios
    .get("http://localhost:3500/api/description/" + props.id)
    .then(function (response) {
      //Perform action based on response
      setDesData({
        desc:response.data.response.length,
        descData:response.data.response[0].description
      });
    })
    .catch(function (error) {
      //Perform action based on error
    })
  },[])


  const submitDescription = (e) => {
    e.preventDefault();
    
    const fd = new FormData();
    fd.append("form", JSON.stringify(data));
    // console.log(fd);
    if(desData.desc==1){
        axios.put('http://localhost:3500/api/description/'+props.id, fd)
        .then(function(response){
     //Perform action based on response
          alert(response.data.message);
      })
        .catch(function(error){
          console.log(error);
      //Perform action based on error
        })
    } else {
        axios.post('http://localhost:3500/api/description/', fd)
        .then(function(response){
     //Perform action based on response
     setDesData({
        desc:1
      });
          alert(response.data.message);
      })
        .catch(function(error){
          console.log(error);
      //Perform action based on error
        })
    }
  };
  
 
  return (
    <>
    
  <h3>Edit Description</h3>
      <form onSubmit={submitDescription}>
        <CKEditor
          onChange={({ editor }) =>
            setData({ p_id: props.id, description: editor.getData() })
          }
          data={desData.descData}
        />
        <CButton type="submmit" color="primary">
          Update Description
        </CButton>
      </form>
    </>
  );
};

export default Description;
