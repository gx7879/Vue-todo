var app = new Vue({
  el: '#app',
  data: {
    newTodo: '',
    todos: [],
    cacheTodo: {},
    cacheTitle: '',
    visibility: 'all'
  },
  mounted() {
    var storageTodoItems = localStorage.getItem("todoItems");
    if(storageTodoItems){
      console.log(JSON.parse(storageTodoItems));
      
      this.todos = JSON.parse(storageTodoItems);
    }
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
    },
  },
  updated() {
    localStorage.setItem("todoItems", JSON.stringify(this.todos));
  },
});