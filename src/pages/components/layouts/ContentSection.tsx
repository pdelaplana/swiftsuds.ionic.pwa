import { PropsWithChildren } from 'react';
import { styled } from 'styled-components';

interface SectionProps extends React.HTMLAttributes<HTMLDivElement> {
  marginTop?: number;
}

const SectionWrapper = styled.div<SectionProps>`
  margin-top: ${(props) => `${props.marginTop}px` || '20px'};
`;

// Functional component
const ContentSection: React.FC<SectionProps> = ({
  marginTop = 10,
  children,
  ...rest
}) => {
  return (
    <SectionWrapper marginTop={marginTop} {...rest}>
      {children}
    </SectionWrapper>
  );
};

export default ContentSection;
