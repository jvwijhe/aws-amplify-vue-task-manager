<template>
    <div class="px-3 py-3 bg-gray-50 rounded flex justify-between">
                        <button type="button" @click="updateTaskStatus(task)" class="flex items-center flex-1">
                            <template v-if="task.completed">
                                <span class="text-green-500 inline-block">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                            </svg>
                                </span>
                            </template>
                            <template v-else>
                                <span></span>
                            </template>
                            <span class="ml-2 text-gray-700 text-sm hover:text-blue-500">{{task.name}}</span>
                        </button>

                        <button type="button" @click="deleteTask()" class="flex items-center text-gray-500 hover:text-gray-700">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                                </svg>
                        </button>
    </div>
</template>

<script >
    import {  toRefs } from 'vue';
    import { DataStore } from '@aws-amplify/datastore';
    import {  Task } from '../../../../models';

export default {
    props: {
        task: Object
    },
  setup(props) {
        const {task} = toRefs(props)
        
        const deleteTask = async () => {
            await DataStore.delete(Task, task.value.id);
        }

        const getTask = async () => {
            task.value = await DataStore.query(Task, task.value.id);
        }

        const updateTaskStatus = async () => {  
            const originalTask = await DataStore.query(Task, task.value.id);
                await DataStore.save(
                    Task.copyOf(originalTask,updated => {
                        updated.completed =  !originalTask.completed
                })
            );
            // console.log(taskData)
      }





    return {deleteTask, updateTaskStatus,getTask }
  }

}
</script>