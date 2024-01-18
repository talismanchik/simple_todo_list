import type {Meta, StoryObj} from '@storybook/react';
import {action} from '@storybook/addon-actions'
import { EditableSpan } from './EditableSpan.tsx';

const meta: Meta<typeof EditableSpan> = {
    title: 'TODOLISTS/EditableSpan',
    component: EditableSpan,
    tags: ['autodocs'],
    argTypes: {
        title: {
            description: 'Start value empty. Add value push button set string.',
            defaultValue: ''
        },
        onChange: {
            description: 'Value EditableSpan changed'
        }
    }
};

export default meta;
type Story = StoryObj<typeof EditableSpan>;

// More on component templates:
export const EditableSpanStory: Story = {
    args: {
        onChange: action('Value EditableSpan changed'),
        title: 'asfssadfgsadgfaf',
    }
};
