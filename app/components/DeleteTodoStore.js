import _ from 'lodash';
import $ from 'jquery';
import DeleteTodoData from './DeleteTodoData';

const URL = 'http://localhost:3001/deletetodos'

function getAll() {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: URL,
        method: 'GET',
        dataType: 'json',
        success: resolve,
        error: reject
      });
    });
  }
  
  function remove(todo) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: `${URL}/${todo.id}`,
        method: 'DELETE',
        dataType: 'json',
        success: resolve,
        error: reject
      });
    });
  }
  
  function add(todo) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: `${URL}`,
        crossDomain: true,
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        dataType: 'json',
        success: resolve,
        error: reject,
        data: JSON.stringify(todo)
      });
    });
  }
  class DeleteTodoStore{
      constructor(){
          this.count=0;
          this.subscribers=[]
      }
      add(deletetodoText){
          this.count++;
          let deletetodo = new DeleteTodoData(deletetodoText,this.count)
          add(deletetodo).then(() => {
              this.publish({
                  actionType:'add',
                  data:deletetodo
              });

          });
          return this.count;
      }
      remove(deletetodo){
          remove(deletetodo).then(()=>{
              this.publish({
                  actionType: 'remove',
                  data:deletetodo
              })
          })

      }
      getAll(){
          return getAll()
      }
      publish(action){
          this.getAll().then((data)=>{
              action.deletetodo=data.deletetodo
              this.subscribers.forEach((subscriber)=>{
                  subscriber(action)
              })
          })
      }
      subscribe(subscriber){
          this.subscribers.push(subscriber)
      }
  }
  export default new DeleteTodoStore()