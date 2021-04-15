import React from 'react';

class PersonRow extends React.Component {
    render() { 
        const {id,firstName,lastName,age} = this.props.person;
        const {onClickEdit, onClickDelete,onDeleteCheckBoxClick,isSetToDelete} = this.props;
        return ( 
         <tr>
            <td>
                <input 
                 type="checkbox"
                 className="form-control"    
                 checked={isSetToDelete}
                 onChange={onDeleteCheckBoxClick}
                 />
            </td>
            <td>{firstName}</td>
            <td>{lastName}</td>
            <td>{age}</td>
            <td>
                <button className="btn btn-success" onClick={onClickEdit}>Edit</button>
                <button className="btn btn-danger" onClick={onClickDelete}>Delete</button>
            </td> 
         </tr>
         );
    }
}
 
export default PersonRow;