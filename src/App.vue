<template>
  <div>
    <Row :span="12" type="flex" justify="center">
      <Col span="10" :offset="1">

        <FormToDo/>

        <Tabs v-model:activeKey="activeKey">
          <TabPane key="1" tab="Список">
             <ListToDo/>
          </TabPane>
          <TabPane key="2" tab="Завершенные" force-render>
            <CompletedToDo/>
          </TabPane>
        </Tabs>
       

      </Col>
    </Row>
  </div>
</template>

<script>
  import {
    defineComponent,ref
  } from 'vue';
  import {
    Row,
    Col,
    Tabs,
    TabPane
  } from 'ant-design-vue';

  import ListToDo from './components/List.vue';
  import CompletedToDo from './components/Completed.vue';
  import FormToDo from './components/Form.vue';

  export default defineComponent({
    
    setup() {
       return {
          activeKey: ref('1'),
        };
    },

    created(){
        this.$store.dispatch('getStorage');
    },

    components: {
      ListToDo,
      FormToDo,
      CompletedToDo,
      Row,
      Col,
      Tabs,
      TabPane
    },

  });
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>