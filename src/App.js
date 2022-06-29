import React, { useState,useEffect , Fragment } from "react";
import "./App.css";
import ReadOnlyRow from "./components/ReadOnlyRow";
import EditableRow from "./components/EditableRow";
import { variables } from "./variables";

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [addFormData] = useState({
    EmployeeName: "",
   Address: "",
   PhoneNumber: "",
    EmailId: "",
  });

  const [editFormData, setEditFormData] = useState({
    EmployeeName: "",
   Address: "",
   PhoneNumber: "",
    EmailId: "",
  });

  const [editContactId, setEditContactId] = useState(null);

  // useEffect(()=>{
  //   fetch(variables.API_URL+'employee')
  //   .then(response=>response.json())
  //   .then(data=>{
  //     setContacts(data);
  //   })
  // },[])
  const refreshList=()=>{
    
      fetch(variables.API_URL+'employee')
      .then(response=>response.json())
      .then(data=>{
        setContacts(data);
      })

  };



  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    // const newContact = {
    //   EmployeeName: addFormData.EmployeeName,
    //  Address: addFormData.Address,
    //  PhoneNumber: addFormData.PhoneNumber,
    //   EmailId: addFormData.EmailId,
    // };

    // const newContacts = [...contacts, newContact];
    // setContacts(newContacts);
    
 fetch(variables.API_URL+'employee',{
  method :'POST',
  headers:{"Content-Type":"application/json","Accept":"application/json"},
  body: JSON.stringify(
    {
      EmployeeName: addFormData.EmployeeName,
      Address: addFormData.Address,
      PhoneNumber: addFormData.PhoneNumber,
      EmailId: addFormData.EmailId
    }
  )
}
)
.then(res=>res.json())
.then((result)=>{
  // alert(result);
  refreshList();
},(error)=>{
  alert('Failed');
}
)
  };

  const handleEditFormSubmit = (event) => { 
    event.preventDefault();

    const editedContact = {
      EmployeeId: editContactId,
      EmployeeName: editFormData.EmployeeName,
     Address: editFormData.Address,
     PhoneNumber: editFormData.PhoneNumber,
      EmailId: editFormData.EmailId,
    };

    const newContacts = [...contacts];

    const index = contacts.findIndex((contact) => contact.EmployeeId === editContactId);

    newContacts[index] = editedContact;

    // setContacts(newContacts);
    fetch(variables.API_URL+'employee',{
      method :'PUT',
      headers:{"Content-Type":"application/json","Accept":"application/json"},
      body: JSON.stringify(
        {
          EmployeeId: editContactId,
          EmployeeName: editFormData.EmployeeName,
          Address: editFormData.Address,
          PhoneNumber: editFormData.PhoneNumber,
          EmailId: editFormData.EmailId
        }
      )
    }
    )
    .then(res=>res.json())
    .then((result)=>{
      // alert(result);
      refreshList();
    },(error)=>{
      alert('Failed');
    }
    )
    setEditContactId(null);
  };

  const handleEditClick = (event, contact) => {
    event.preventDefault();
    setEditContactId(contact.EmployeeId);

    const formValues = {
      EmployeeName: contact.EmployeeName,
     Address: contact.Address,
     PhoneNumber: contact.PhoneNumber,
      EmailId: contact.EmailId,
    };

    setEditFormData(formValues);
  };

  const handleCancelClick = () => {
    setEditContactId(null);
  };

  const handleDeleteClick = (contactId) => {
    // const newContacts = [...contacts];

    // const index = contacts.findIndex((contact) => contact.id === contactId);

    // newContacts.splice(index, 1);

    // setContacts(newContacts);
    fetch(variables.API_URL+'employee/'+contactId,{
      method :'DELETE',
      headers:{"Content-Type":"application/json","Accept":"application/json"},
    })
    .then(res=>res.json())
    .then((result)=>{
      // alert(result);
      refreshList();
    },(error)=>{
      alert('Failed');
    }
    )
  };

  useEffect(()=>{
    fetch(variables.API_URL+'employee')
    .then(response=>response.json())
    .then(data=>{
      setContacts(data);
    })
  },[])

 

  return (
    <div className="app-container">
       <h2>Employee List</h2>
      <form onSubmit={handleAddFormSubmit}>
        <button type="submit" >+ New Employee</button>
      </form>
      <form onSubmit={handleEditFormSubmit}>
        <table >
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>Phone Number</th>
              <th>EmailId</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
          {contacts.map((contact) => (
              <Fragment>
                {editContactId === contact.EmployeeId ? (
                  <EditableRow
                    editFormData={editFormData}
                    handleEditFormChange={handleEditFormChange}
                    handleCancelClick={handleCancelClick}
                  />
                ) : (
                  <ReadOnlyRow
                    contact={contact}
                    handleEditClick={handleEditClick}
                    handleDeleteClick={handleDeleteClick}
                  />
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </form>

     
    </div>
  );
};

export default App;