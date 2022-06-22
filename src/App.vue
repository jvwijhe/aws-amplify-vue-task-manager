
<template>
<authenticator>
  <section class="my-12">
    <div class="container mx-auto">
    <h1 class="text-3xl font-bold underline">
      Aws Amplify Task Manager
    </h1>
    </div>
  </section>

  <section class="my-12">
    <div class="container mx-auto bg-gray-100 p-6 rounded flex gap-6">
      <input type="text" class="p-3 rounded" v-model="name" placeholder="Todo name">
      <input type="text" class="p-3 rounded" v-model="description" placeholder="Todo description">
      <!-- <select v-model="projectID">
        <option v-for="project in projects" :value="project.id" :key="project.id">{{project.name}}</option>
      </select> -->

    <div class="flex gap-3">
      <button v-on:click="storeProject" class="bg-blue-500 p-3 rounded text-white">Create Project</button>
    </div>
    </div>
  </section>

    <section class="my-12">
        <div class="container mx-auto">
    <ul class="grid grid-cols-1 gap-6">
      <li v-for="project in projects" :key="project.id">
        <ProjectListItem :project="project"/> 
        </li>
      </ul>
        </div>
    </section>

</authenticator>
</template>

<script >
import ProjectListItem from '@/components/Project/List/Item/ProjectListItem.vue'
   import {  useAuthenticator } from '@aws-amplify/ui-vue';
  import "@aws-amplify/ui-vue/styles.css";
    import { onMounted, toRefs } from 'vue';

  // import { API } from 'aws-amplify';
  import { ref } from '@vue/reactivity';
  import { DataStore } from '@aws-amplify/datastore';
  import { Project } from './models';


export default {
  components: {
    ProjectListItem
  },
  setup() {

  const {  user } = toRefs(useAuthenticator());
    const projects = ref([]);
    const name = ref();
    const description = ref();
    const projectID = ref();

 onMounted(async () => {
        // const projectsResult = await DataStore.query(Project);
        // projects.value = projectsResult


      //   const subscription = DataStore.observe(Project).subscribe(msg => {
      //     console.log(msg.model, msg.opType, msg.element);
      // });

       DataStore.observeQuery(
        Project,
      ).subscribe(snapshot => {
        const { items } = snapshot;
         projects.value = items;
      });
      //  subscription.unsubscribe();

    });

     const storeProject = async() => {
      try {
           await DataStore.save(
            new Project({
            "name": name.value,
            "description": description.value,
          })
        );
      } catch (error) {
         console.log(error)
      }
     
    }

    return {name, description, projectID, storeProject, user, projects}
  }
}
  
</script>
