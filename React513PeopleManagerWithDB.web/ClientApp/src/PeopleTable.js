import React from 'react';
import PersonRow from './PersonRow';
import AddEditPersonRow from './AddEditPersonRow';
import axios from 'axios';
import {produce} from 'immer';

class PeopleTable extends React.Component {
    state = 
     { 
        people: [],
        person: {
            firstName: '',
            lastName: '',
            age: ''
        },
        isEditMode: false,

        peopleToDelete: []
     }
     
     refreshTable=() => {
        axios.get('/api/people/getall').then(response => {
            const people = response.data; 
            this.setState({people});            
        })
        this.setState(  
               {isEditMode: false,
                person:
                         {firstName:'',
                          lastName: '',
                          age: ''} 
               })
    }

     componentDidMount=() => {
        this.refreshTable();  
         
     }
     
     onTextChange = e => {
         
         const nextState = produce(this.state,draft=> {
             draft.person[e.target.name] = e.target.value;
         });
         this.setState(nextState);
     }

    onClickAdd = () => {
         axios.post('api/people/add',{...this.state.person ,age: +this.state.person.age}).then( () => {
            this.refreshTable();
        })
    }

    onClickEdit = p => {
       this.setState({isEditMode: true,person: p} );
    }

    onClickUpdate  = () => {
        axios.post('/api/people/update',{...this.state.person, age: +this.state.person.age}).then( () => {//had to convert age to int
          this.refreshTable();          
        })
    }

    onClickCancel = () => {
       this.refreshTable();
    }

   onClickDelete = ({ id }) => {
        axios.post('/api/people/delete',{id}).then( ()=> {
            this.refreshTable();
       })
    }

    onDeleteCheckBoxClick = id => {
      const {peopleToDelete} = this.state;
      let peopleToDeleteCopy;

       if (peopleToDelete.includes(id)) {
           peopleToDeleteCopy = peopleToDelete.filter(d=> d !==id)
        }
        else {
             peopleToDeleteCopy = [...peopleToDelete,id]        
        }
        this.setState( {peopleToDelete: peopleToDeleteCopy});
    }
    
    onClickDeleteAll =() => {
        axios.post('/api/people/deletemany', {ids: this.state.peopleToDelete}).then( () => {
            this.refreshTable();
            this.setState({peopleToDelete:[]});
        })
    }

    onClickCheckAll = () => {
            this.setState(   {peopleToDelete: this.state.people.map(p=>p.id)});
    }

    onClickUncheckAll = () => {
        this.setState({peopleToDelete: []});
    }
  
     
    
    render() { 
        return ( 
           <div className="container" style={{marginTop:60}}>
             
              <AddEditPersonRow 
                person={this.state.person}
                isEditMode={this.state.isEditMode}
                onTextChange={this.onTextChange}
                onClickAdd = {this.onClickAdd}
                onClickUpdate={this.onClickUpdate}
                onClickCancel={this.onClickCancel}
                isMissingData={this.state.person.firstName ==='' || this.state.person.lastName ===''|| this.state.person.age ===''}

              />
              
              
              <table className="table table-hover table-bordered table-striped" >
                  
                <thead>
                       <tr>
                            <th>
                                <div>
                                    <button className="btn btn-danger" onClick={this.onClickDeleteAll}>Delete</button>   
                                    <button className="btn btn-info" onClick={this.onClickCheckAll}>Check All</button>  
                                    <button className="btn btn-info" onClick={this.onClickUncheckAll}>UnCheck All</button>                     
                                </div>
                            </th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Age</th>
                            <th>Edit/Delete</th>
                        </tr>
                </thead>
                <tbody>
                    {this.state.people.map(p=> 
                       <PersonRow 
                         key={p.id} 
                         person = {p} 
                         isSetToDelete={this.state.peopleToDelete.includes(p.id)}
                         onClickEdit = {()=> this.onClickEdit(p)} 
                         onClickDelete={()=> this.onClickDelete(p)}       
                         onDeleteCheckBoxClick={() =>this.onDeleteCheckBoxClick(p.id)}                                                              
                      />
                     )
                    }
                </tbody>
            </table>
           
           </div>
        
         );
    }
}
export default PeopleTable;