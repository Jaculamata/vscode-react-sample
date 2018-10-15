import React from 'react';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import IconButton from 'material-ui/IconButton';
import ChevronRightIcon from 'material-ui/svg-icons/navigation/chevron-right';

import DeleteTodoStore from './DeleteTodoStore'

class DeleteTodos extends React.Component{
    constructor(){
        super();
      this.styles = {
        float: 'left',
        width: '24%',
        margin: '3%'
      };
      this.state = { deletetodos: [] };
    }
    componentDidMount(){
        DeleteTodoStore.getAll().then((data)=>{
            console.log('get all deletetodos',data)
            this.setState({
                deletetodos:data.deletetodos
            })
        })
        DeleteTodoStore.subscribe((action)=>{
            this.setState({
                deletetodos:action.deletetodos
            })
        })
    }
    handleClick(note){
        DeleteTodoStore.remove(note)
    }

    create(todo) {
        return (<ListItem 
                  onMouseDown={this.handleClick.bind(null, todo)} 
                  key={todo.id}
                  leftIcon={<ChevronRightIcon />}
                  primaryText={todo.text}
                  secondaryText={todo.timestamp}>
               </ListItem>
        );
      }

      render() {
        const deletetodos = this.state.deletetodos.map(this.create.bind(this));
        return (
          <List style={this.styles}>
            {deletetodos}
          </List>
        );
      }
}


export default DeleteTodos