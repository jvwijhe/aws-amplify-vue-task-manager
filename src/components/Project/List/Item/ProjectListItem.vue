<template>
    <div class="p-6 bg-gray-50 rounded">
        <span class="block text-xs text-gray-500">#{{project.id}}</span>
        <a href="/" class="my-1 block text-xl font-semibold text-gray-800">{{project.name}}</a>
        
        <p class="text-gray-500">{{project.description}}</p>

        <div class="mt-6" v-if="tasks.length">
            <span class="font-bold text-sm text-gray-700">Tasks:</span>
            <ul>
                <li v-for="task in tasks" :key="task.id">
                    <span class="text-gray-700 text-sm">{{task.name}}</span>
                </li>
            </ul>
        </div>
        <div class="mt-3">
            <button type="button" @click="deleteProject" class="text-red-500 font-semibold">Delete</button>
        </div>
    </div>
</template>


<script >

  // import { API } from 'aws-amplify';
    import { onMounted } from 'vue';

  // import { API } from 'aws-amplify';
  import { ref } from '@vue/reactivity';
  import { DataStore } from '@aws-amplify/datastore';
  import { Project, Task } from '../../../../models';

export default {
    props: {
        project: Object
    },
  setup(props) {
    const tasks = ref([]);

 onMounted(async () => {


     tasks.value = (await DataStore.query(Task))
     .filter(t => t.projectID ===  props.project.id);
    // console.log(tasks.value)
    // console.log(props.project)
    });


    const deleteProject = async () => {
        await DataStore.delete(Project, props.project.id);
    }
    


    return {tasks, deleteProject}
  }

}
</script>