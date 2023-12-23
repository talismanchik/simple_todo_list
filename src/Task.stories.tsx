import type {Meta, StoryObj} from '@storybook/react';
import {action} from '@storybook/addon-actions'
import {Task} from "./Task.tsx";

const meta: Meta<typeof Task> = {
    title: 'TODOLISTS/Task',
    component: Task,
    tags: ['autodocs'],
    args: {
        changeStatus: action('Status changed inside Task'),
        changeTaskTitle: action('Title changed inside Task'),
        removeTask: action('Remove Button clicked changed inside Task'),
         task: {id: '12wsdewfijdei', title: 'story book', isDone: false},

    },
} ;

export default meta;
type Story = StoryObj<typeof meta>;



export const TaskIsDoneStory: Story = {
    args: {
        task: {id: '12wsdewfijdei', title: 'task is done', isDone: true},
    },
};

export const TaskIsNotDoneStory: Story = {}