<template>
    <div>
        <a href="/">{{project.name}}</a>
        <span>{{project.id}}</span>
        <p>{{project.description}}</p>

        <div class="" v-if="tasks">
            <ul>
                <li v-for="task in tasks" :key="task.id">
                    <span>{{task.name}}</span>
                </li>
            </ul>
        </div>
    </div>
</template>


<script >

  // import { API } from 'aws-amplify';
    import { onMounted } from 'vue';

  // import { API } from 'aws-amplify';
  import { ref } from '@vue/reactivity';
  import { DataStore } from '@aws-amplify/datastore';
  import { Task } from '../../../../models';

export default {
    props: {
        project: Object
    },
  setup(props) {
    const tasks = ref([]);

 onMounted(async () => {
        // const projectsResult = await DataStore.query(Project);
        // projects.value = projectsResult


      //   const subscription = DataStore.observe(Project).subscribe(msg => {
      //     console.log(msg.model, msg.opType, msg.element);
      // });

     tasks.value = (await DataStore.query(Task))
     .filter(t => t.projectID ===  props.project.id);
    // console.log(tasks.value)
    // console.log(props.project)
    });

    return {tasks}
  }

}
</script>