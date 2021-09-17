<template>
      <Form layout="inline" class="ant-col-24 flex"  ref="formRef" :model="formState" :rules="rules">
        <Row type="flex">
          <FormItem class="ant-col-20" has-feedback ref="title" label="Список дел" name="title">
            <Input v-model:value="formState.title" placeholder="Купить что-то" allow-clear/>
          </FormItem>
          <Button type="primary" :loading="loading" :disabled="loading" @click.prevent="SumbitForm">Добавить</Button>
        </Row>
      </Form>
</template>

<script>
  import {
    defineComponent,
    ref,
    inject,reactive
  } from 'vue';
  import {
    Form,
    Input,
    FormItem,
    Row,
    Button,message
  } from 'ant-design-vue';

  const generateId = () => {
    return Math.random().toString(35).slice(2, 11);
  }

  export default defineComponent({
    setup() {
      const store = inject('store')

      let loading = ref(false);
      const formRef = ref();
      const formState = reactive({
        title: '',
      });

      const rules = {
        title: [
          {
            required: true,
            message: 'Это поле обязательно к заплонению',
            trigger: 'blur',
          },
          {
            min: 3,
            max: 30,
            message: 'Количество симбола должно быть в приделах 3-30  ',
            trigger: 'blur',
          },
        ]
      }
            
      const SumbitForm = () => {
        loading.value = true;

        formRef.value
        .validate()
        .then(() => {

              store.dispatch('setItems', {
                id: generateId(),
                title: formState.title,
              });

              message.success(
                'Задача успешно добавлено !!!',
                1,
              );
          })
        .catch(error => {
          console.log('error', error);
        });


        setInterval(()=>{
            loading.value = false;
        },1000)

    
      };
    
      const resetForm = () => {
        formRef.value.resetFields();
      };

      return {
        loading,
        SumbitForm,
        formRef,
        formState,
        rules,
        resetForm
      }
    },

    components: {
      Form,
      Input,
      FormItem,
      Row,
      Button,
    },


  });
</script>
