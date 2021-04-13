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
        isEditMode: false
     }
     
     refreshTable=() => {
        axios.get('/api/people/getall').then(response => {
            const people = response.data; 
            this.setState({people});            
        })
        this.setState( {isEditMode: false });
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
        const nextState = produce(this.state, draft => {
            draft.person.age = +draft.person.age;
        });

        this.setState(nextState);
        axios.post('api/people/add',this.state.person).then( () => {
          this.refreshTable();
          this.onClickClear();
        })
    }

    onClickEdit = p => {
       this.setState({isEditMode: true},{person: p} );
    }

    onClickUpdate  = () => {
        axios.post('/api/people/update',this.state.person).then( () => {
          this.refreshTable();
        })
    }

    onClickClear = () => {
       this.setState({person:
                       {firstName:'',
                        lastName: '',
                        age: ''} 
                     })
    }

   onClickDelete = ({ id }) => {
        axios.post('/api/people/delete',{id}).then( ()=> {
            this.refreshTable();
       })
    }

     
    
    render() { 
        return ( 
           <div className="container" style={{marginTop:60}}>
             <div className="row" style ={{marginBottom: 20}}>
              <AddEditPersonRow 
                person={this.state.person}
                isEditMode={this.state.isEditMode}
                onTextChange={this.onTextChange}
                onClickAdd = {this.onClickAdd}
                onClickUpdate={this.onClickUpdate}
                onClickClear={this.onClickClear}

              />
              </div>
              <table className="table-hover table-bordered table-striped">
                <thead>
                       <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Age</th>
                            <th>Actions</th>
                        </tr>
                </thead>
                <tbody>
                    {this.state.people.map(p=> 
                       <PersonRow 
                         key={p.id} 
                         person = {p} 
                         onClickEdit = {()=> this.onClickEdit(p)} 
                         onClickDelete={()=> this.onClickDelete(p)}                                                                     
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