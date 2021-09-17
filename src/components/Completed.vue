<template>
    <div>

        <List class="demo-loadmore-list" :loading="loading" item-layout="horizontal" :data-source="ToDoList"
            :locale="{emptyText: 'Список пуст'}">
            <template #renderItem="{item,index}">
                <ListItem>
                    <template #actions>
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
        Popconfirm
    } from 'ant-design-vue';

    export default defineComponent({
        setup() {
            const store = inject('store')
            let loading = ref(false);

            const removeTodo = (id) => {
                store.dispatch('removeItem', {id:id,type:'completed'});
            }

            return {
                loading,
                removeTodo,
            }
        },

        components: {
            List,
            ListItem,
            ListItemMeta,
            TypographyText,
            Popconfirm
        },

    computed:{
        ToDoList() {
            return this.$store.getters['getCompletedItem'];
        }
    }
        
    });
</script>
