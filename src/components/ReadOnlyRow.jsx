import React from "react";

const ReadOnlyRow = ({ contact, handleEditClick, handleDeleteClick }) => {
  return (
    <tr>
      <td>{contact.EmployeeName}</td>
      <td>{contact.Address}</td>
      <td>{contact.PhoneNumber}</td>
      <td>{contact.EmailId}</td>
      <td>
        <button
          type="button"
          onClick={(event) => handleEditClick(event, contact)}
        >
          Edit
        </button>
        <button type="button" onClick={() => handleDeleteClick(contact.EmployeeId)}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default ReadOnlyRow;