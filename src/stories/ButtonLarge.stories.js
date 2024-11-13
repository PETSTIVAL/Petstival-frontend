import ButtonLarge from '../components/Common/Button/ButtonLarge';

export default {
  title: 'ButtonLarge',
  component: ButtonLarge,
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
  args: {
    children: '다음',
    onClick: null,
    disabled: false,
  },
};

// 활성화
export const Default = {
  args: { children: '다음', onClick: null, disabled: false },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/G14CLP8aTlOvMhZPhx4Ggt/PETSTIVAL-UI?node-id=2092-561&t=CSIA7CP1ivnhak4W-1',
    },
  },
};

// 비활성화
export const Disabled = {
  args: { children: '다음', onClick: null, disabled: true },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/G14CLP8aTlOvMhZPhx4Ggt/PETSTIVAL-UI?node-id=2092-561&t=CSIA7CP1ivnhak4W-1',
    },
  },
};
