import { writable } from 'svelte/store';
import {Tasks} from './tasksStruct.js';

const store = writable(Tasks.create()); 

export default store;