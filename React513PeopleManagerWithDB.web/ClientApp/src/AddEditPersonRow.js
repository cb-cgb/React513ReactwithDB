import React from 'react';

class AddEditPersonRow extends  React.Component {
        render() { 
            const {onTextChange,onClickUpdate, onClickCancel, onClickAdd,isEditMode,isMissingData} = this.props;
            const {firstName, lastName,age} = this.props.person;

        return ( 

            <div className="row"    style={{marginBottom:20}}>     
             <div className="col-md-3">
                <input
                   type="text"
                   className="form-control"
                   placeholder="First Name"
                   value={firstName}
                   onChange={onTextChange}
                   name="firstName" 
                />  
             </div>
             <div className="col-md-3">
             <input
                  type="text"
                  className="form-control"
                  placeholder="Last Name"      
                  value={lastName}        
                  onChange={onTextChange}
                  name="lastName"
                 />
               </div>
               <div className="col-md-3">
                <input
                 type="text"
                 className="form-control"
                 placeholder="Age"
                 value={age}
                 onChange={onTextChange}
                 name="age"
                 />
                </div>
                <div className="col-md-3">
                 {!isEditMode && <button disabled={isMissingData} className="btn btn-success btn-block" onClick={onClickAdd}>Add</button>}
                 {!!isEditMode&& 
                  <div>
                      <button className="btn btn-warning btn-block" onClick={onClickUpdate}>Update</button>
                      <button className="btn btn-info btn-block" onClick={onClickCancel}>Cancel</button>
                  </div>
                 }                                       
                </div>
            </div>
 

                 

         );
    }
}
 
export default AddEditPersonRow ;