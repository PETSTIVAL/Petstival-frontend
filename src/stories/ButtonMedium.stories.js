import ButtonMedium from '../components/Common/Button/ButtonMedium';

export default {
  title: 'ButtonMeduim',
  component: ButtonMedium,
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
  args: {
    children: '다음',
    onClick: null,
    sub: 'primary',
  },
};

// Primary
export const Primary = {
  args: { children: '다음', onClick: null, sub: 'primary' },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/G14CLP8aTlOvMhZPhx4Ggt/PETSTIVAL-UI?node-id=4002-1718&t=CSIA7CP1ivnhak4W-1',
    },
  },
};

// Secondary (sub button)
export const Secondary = {
  args: { children: '다음', onClick: null, sub: 'secondary' },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/G14CLP8aTlOvMhZPhx4Ggt/PETSTIVAL-UI?node-id=4002-1718&t=CSIA7CP1ivnhak4W-1',
    },
  },
};
