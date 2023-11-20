import React from 'react';
import { ComponentContent, PageContentModel, RegisteredComponent } from '@types';
import { BOB } from './bobInstance';
import { postMessage_componentRectData } from './postMessage/componentRectData';
import { useSectionData } from './context/sectionData.context';

function SectionComponent({
  componentData,
  registeredComponent,
  sectionId,
}: {
  componentData: ComponentContent;
  registeredComponent: RegisteredComponent;
  sectionId: string;
}) {
  const ref = React.useRef<null | HTMLDivElement>(null);
  const Component = registeredComponent.component;

  React.useEffect(() => {
    const postMessageWithClosure = () =>
      postMessage_componentRectData({ componentId: componentData._id, sectionId, ref });

    const observer = new ResizeObserver(() => {
      postMessageWithClosure();
    });

    postMessageWithClosure();
    ref.current && observer.observe(ref.current);
    window.addEventListener('scroll', postMessageWithClosure);
    window.addEventListener('resize', postMessageWithClosure);

    return () => {
      ref.current && observer.unobserve(ref.current);
      window.removeEventListener('resize', postMessageWithClosure);
      window.removeEventListener('scroll', postMessageWithClosure);
    };
  }, [componentData]);

  // TODO: Zrób tak żeby ten Component miał otypowane propsy
  return (
    <div ref={ref}>
      <Component />
      {/* <div style={{ width: '100px', height: '100px' }}>dsd</div> */}
    </div>
  );
}

export function SectionContentRenderer({ sectionData }: { sectionData: PageContentModel }) {
  const components = sectionData.components;
  const bobComponents = BOB._customComponents;

  return components.map((component) => {
    const matchBobComponent = bobComponents.find(
      (bobComponent) => bobComponent.name === component.name
    );

    if (!matchBobComponent) return null;

    return (
      <SectionComponent
        key={component._id}
        sectionId={sectionData._id}
        componentData={component}
        registeredComponent={matchBobComponent}
      />
    );
  });
}
