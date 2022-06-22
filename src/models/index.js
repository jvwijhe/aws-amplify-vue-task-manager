// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Comment, Task, Project } = initSchema(schema);

export {
  Comment,
  Task,
  Project
};