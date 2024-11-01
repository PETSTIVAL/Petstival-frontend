import DetailBar from './DetailBar.jsx';

export default {
  title: 'DetailBar',
  component: DetailBar,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
  // 스토리에서 사용할 기본 props 값을 설정할 수 있습니다. 이렇게 하면 스토리를 렌더링할 때 해당 props가 자동으로 적용됩니다.
  args: {
    title: '주문 상세',
    onBack: () => window.history.back(), // 클릭 시 뒤로 가는 이벤트 설정
  },
};

export const DetailTitle = {
  args: {
    title: '주문 상세',
    onBack: () => window.history.back(), // 클릭 시 뒤로 가는 이벤트 설정
  },
};

// 피그마로 컴포넌트 디자인 확인하기
DetailTitle.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/design/G14CLP8aTlOvMhZPhx4Ggt/PETSTIVAL-UI?node-id=2113-1613&t=PXXwkpQIb5yfFxIg-1',
  },
};
