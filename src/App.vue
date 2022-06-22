
<template>
<div class="relative h-screen w-screen bg-gray-50 overflow-y-auto">
<amplify-authenticator>
  <section class="py-12">
    <div class="container mx-auto max-w-6xl flex justify-between">
    <h1 class="text-3xl font-bold underline">
      Aws Amplify Task Manager
    </h1>
    <div class="w-24">
      <amplify-sign-out></amplify-sign-out>
    </div>

    </div>
  </section>

  <section class="my-12">

    <div class="container mx-auto max-w-6xl  p-6 rounded border border-gray-200">
      <p class="text-gray-500 mb-3">Create a project to get started</p>
      <div class="flex gap-6">
        <input type="text" class="p-3 rounded" v-model="name" placeholder="Project name">
        <input type="text" class="p-3 rounded" v-model="description" placeholder="Project description">
      <!-- <select v-model="projectID">
        <option v-for="project in projects" :value="project.id" :key="project.id">{{project.name}}</option>
      </select> -->

        <div class="flex gap-3">
          <button v-on:click="storeProject" class="bg-blue-500 p-3 rounded text-white flex gap-1 items-center">
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
            </svg>
            </span>
            <span class="text-sm">Create Project</span></button>
        </div>
      </div>
    </div>
  </section>

    <section class="my-12">
        <div class="container mx-auto max-w-6xl">
          <h3 class="font-semibold text-lg text-gray-700">Your projects:</h3>
          <template v-if="projects.length">
          <ul class="grid grid-cols-1 gap-6 mt-3">
            <li v-for="project in projects" :key="project.id">
              <ProjectListItem :project="project"/> 
              </li>
            </ul>
          </template>
          <template v-else>
            <p class="text-gray-700">No projects created yet.</p>
          </template>
        </div>
    </section>
</amplify-authenticator>
</div>
</template>

<script>


import ProjectListItem from '@/components/Project/List/Item/ProjectListItem.vue'

    import { onMounted } from 'vue';

  import { ref } from '@vue/reactivity';
  import { DataStore } from '@aws-amplify/datastore';
  import { Project } from './models';


export default {
  components: {
    ProjectListItem
  },
  setup() {


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

        name.value = ''
        description.value = ''
      } catch (error) {
         console.log(error)
      }
     
    }

    return {name, description, projectID, storeProject, projects}
  }
}
  
</script>
