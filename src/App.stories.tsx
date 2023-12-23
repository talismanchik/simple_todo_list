import type {Meta, StoryObj}   from  '@storybook/react';
import {App}  from  "./App";
import {ReduxStoreProviderDecorator} from "./stories/ReduxStoreProviderDecorator.tsx";

// More on how to set up stories at:
const  meta: Meta<  typeof  App> = {
    title:   'TODOLISTS/App',
    component:   App,
    tags: [  'autodocs'],
    decorators: [ReduxStoreProviderDecorator]
};

export default  meta;
type Story = StoryObj<  typeof  App>;

// More on component templates:
export const  AppWithReduxStory: Story = {}
