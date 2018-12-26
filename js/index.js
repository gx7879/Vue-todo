var app = new Vue({
  el: '#app',
  data: {
    newTodo: '',
    todos: [{
      id:123,
      title: '妳好',
      completed: false
    }],
    cacheTodo: {},
    cacheTitle: '',
    visibility: 'all'
  },
  methods: {
    addTodo: function(){
      var vm = this;
      var timestamp = Math.floor(new Date());
      this.todos.push({
        id: timestamp,
        title: vm.newTodo,
        completed: false
      })
      this.newTodo = '';
    },
    removeTodo: function(todo){
      var newIndex = this.todos.findIndex(function(item){
        return item.id == todo.id;
      });
      this.todos.splice(newIndex,1);
    },
    editTodo: function(item){
      this.cacheTodo = item;
      this.cacheTitle = item.title;
    },
    cancleEdit: function(){
      this.cacheTodo = {};
      this.cacheTitle = '';
    },
    doneEdit: function(item){
      item.title = this.cacheTitle;
      this.cancleEdit();
    }
  },
  computed: {
    filteredTodos: function(){
      if(this.visibility == 'all'){
        return this.todos;
      }else if(this.visibility == 'active'){
        return this.todos.filter(item => item.completed==false);
      }else{
        return this.todos.filter(item => item.completed==true);
      }
    },
    unCompleted: function(){
      return this.todos.filter(item => item.completed == false).length;
    }
  }
});