import { createStore } from 'vuex'

const store =createStore({

    state (){
        return{
            items:{
                active: [
                ],
                completed: [],
            },
            lastNumber:1,
        }
    },

    mutations:{

        setItems(state,data){
            data.number = state.lastNumber;
            state.items.active.push(data);
            state.lastNumber++;

        },

        completeTodo(state,id){
            var active = state.items.active

            var todo = active.find((todo) => todo.id === id);
            if(todo){
                state.items.completed.push(todo);
            }
        },

        removeItem(state,option){
            var arr = state.items.active
            if(option.type == 'completed'){
                arr = state.items.completed
            }
            arr.splice(
                arr.findIndex((todo) =>todo.id === option.id),
                1
            );
        },

        changePlace(state,option){
            const item1 =  state.items.active.find(item => item.number == option.itemID)
            const item2 =  state.items.active.find(item => item.number == option.list)
            var num =item1.number;
            item1.number = item2.number;
            item2.number = num;
        },

        setStorage(state){
            localStorage.setItem('items',JSON.stringify(state.items));
            localStorage.setItem('number',JSON.stringify(state.lastNumber));
        },
        installParam(state){
            state.items =  JSON.parse(localStorage.getItem('items'));
            state.lastNumber =  JSON.parse(localStorage.getItem('number'));
        }

    },
    actions: {
        getStorage(state) {
            state.commit('installParam');
        },

        async  setItems(state,todo) {
            await state.commit('setItems',todo);
            state.commit('setStorage');
        },

        async removeItem(state,filter){
            await state.commit('removeItem',filter);
            state.commit('setStorage');
        },

        async CompletedItem(state,id){
            await state.commit('completeTodo',id);
            await state.commit('removeItem',id);
            state.commit('setStorage');
        },

        dragItem(state,option){
            state.commit('changePlace',option);
            state.commit('setStorage');
        }
    },

    getters:{

        getStorageItems(){
           return localStorage.getItem('items');
        },

        getActiveItem(state){
            return state.items.active.sort((a,b)=> a.number - b.number)
        },
            
        getCompletedItem(state){
            return state.items.completed;
        },
        getAllItem(state){
            return state.items;
        },

        getLastNumber(state){
            return state.lastNumber;
        }
    }

  })
  
export default store;
