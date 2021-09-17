<template>
    <div>

        <List class="demo-loadmore-list drop-zone" :loading="loading" item-layout="horizontal" :data-source="ToDoList"
            :locale="{emptyText: 'Список пуст'}">
            <template #renderItem="{item,index}">
                    <ListItem  class="drag-el" draggable="true"  @drop='onDrop($event,item.number)' @dragover.prevent @dragenter.prevent @dragstart='startDrag($event, item)'>
                        <template #actions>
                            <TypographyText @click="completedTodo(item.id)" type="success">Выполнено</TypographyText>
                            <Popconfirm  @confirm="removeTodo(item.id)" title="Вы точно хотите удалить ?" ok-text="Да" cancel-text="Отмена">
                                <TypographyText type="danger">Удалить</TypographyText>
                            </Popconfirm>
                        </template>
                        <div>#{{ index+1 }}</div>
                        <ListItemMeta>
                            <template #title>
                                <TypographyText>{{ item.title }}</TypographyText>
                            </template>
                        </ListItemMeta>
                    </ListItem>
            </template>
        </List>


    </div>
</template>

<script>
    import {
        defineComponent,
        ref,
        inject
    } from 'vue';
    import {
        List,
        ListItem,
        ListItemMeta,
        TypographyText,
        Popconfirm,
        message
    } from 'ant-design-vue';

    export default defineComponent({
        setup() {
            const store = inject('store')
            let loading = ref(false);

            const removeTodo = (id) => {
                store.dispatch('removeItem', {id:id,type:'active'});
            }
            const completedTodo = (id) => {
                store.dispatch('CompletedItem', id);

                message.success(
                    'Ура план выполнен !',
                    1,
                );
            }

            const startDrag = (evt, item) => {
                evt.dataTransfer.dropEffect = 'move'
                evt.dataTransfer.effectAllowed = 'move'
                evt.dataTransfer.setData('itemID', item.number)
            }

            const onDrop = (evt, list) => {
                const itemID = evt.dataTransfer.getData('itemID')
                store.dispatch('dragItem', {itemID:itemID,list:list});
            }

            return {
                loading,
                removeTodo,
                completedTodo,
                startDrag,
                onDrop
            }
        },

        components: {
            List,
            ListItem,
            ListItemMeta,
            TypographyText,
            Popconfirm,
        },

    computed:{
        ToDoList() {
            return this.$store.getters['getActiveItem'];
        }
    }
        
    });
</script>


<style scoped>
    .drop-zone {
        background-color: #f6f6f6;
        margin-bottom: 10px;
        padding:10px;
    }

   
    .drag-el {
        background-color: #fff;
        margin-bottom: 15px;
        padding:5px 5px;
    }

     .drag-el:last-child {
        margin-bottom: 0px;
    }
</style>