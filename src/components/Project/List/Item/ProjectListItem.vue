<template>
    <div class="relative p-6 bg-white  shadow rounded">
        <!-- <span class="block text-xs text-gray-500">#{{project.id}}</span> -->
        <a href="/" class="my-1 block text-xl font-semibold text-gray-800">{{project.name}}</a>
        
        <p class="text-gray-500">{{project.description}}</p>

        <div class="w-full">
            <div class="flex gap-3 my-3">
             <input type="text" class="p-3 rounded bg-gray-50" v-model="name" placeholder="Task name">
            <input type="text" class="p-3 rounded bg-gray-50" v-model="description" placeholder="Task description">
            <button v-on:click="storeTask" class="bg-blue-500 p-3 rounded text-white text-sm">Create Task</button>
            </div>


            <div class="mt-6" v-if="tasks.length">
                <span class="font-bold text-sm text-gray-700">Tasks:</span>
                <div class="mt-3 grid grid-cols-1 gap-3">
                    <TaskListItem :task="task" v-for="task in tasks" :key="task.id" />
                </div>
            </div>
        </div>
        <div class="absolute right-0 top-0 m-3">
            <button type="button" @click="deleteProject" class="bg-red-100 text-red-500 p-2 hover:bg-red-200 rounded font-semibold">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline-block" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                </svg>
            </button>
        </div>
    </div>
</template>

<script >
    import { onMounted } from 'vue';
    import { ref } from '@vue/reactivity';
    import { DataStore } from '@aws-amplify/datastore';
    import { Project, Task } from '../../../../models';

    import TaskListItem from '@/components/Task/List/Item/TaskListItem.vue'


export default {
    props: {
        project: Object
    },
    components: {
        TaskListItem
    },
  setup(props) {
        const tasks = ref([]);
        const name = ref();
        const description = ref();

        onMounted(async () => {
            await getTasks();
        });


        const getTasks = async () => {
            console.log(props.project.id)
            DataStore.observeQuery(
                Task,
                t => t.projectID("eq",props.project.id),
                ).subscribe(snapshot => {
                const { items } = snapshot;
                console.log(items)
                  tasks.value = items
                });
        }

        const deleteProject = async () => {
            await DataStore.delete(Project, props.project.id);
        }

        const updateTaskStatus = async (task) => {  
            const originalTask = await DataStore.query(Task, task.id);

                await DataStore.save(
                    Task.copyOf(originalTask,updated => {
                        updated.completed =  !originalTask.completed
                })
            );

             
            //  await getTasks();
      }

        const storeTask = async() => {
            try {
                await DataStore.save(
                    new Task({
                    "name": name.value,
                    "description": description.value,
                    "projectID": props.project.id,
                    "completed": false
                })
                );
                name.value = ''
                description.value = ''
                // await getTasks()
            } catch (error) {
                console.log(error)
            }
    }



    return {tasks,name,description, deleteProject, updateTaskStatus, storeTask }
  }

}
</script>