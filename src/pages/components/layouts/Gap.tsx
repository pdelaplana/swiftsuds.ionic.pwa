import styled from 'styled-components';

interface GapProps {
  size?: number;
}

export const Gap = styled.div<GapProps>`
  height: ${({ size }) => size}px;
`;

Gap.defaultProps = {
  size: 10,
};
