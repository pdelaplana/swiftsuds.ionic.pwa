import { styled } from 'styled-components';

export const ScrollableContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
  border: 1px solid #ddd;
`;

export const ContentContainer = styled.div`
  flex: 1;
  overflow-y: auto; /* Scrollbar appears when content overflows */
  padding: 16px;
  background-color: #f9f9f9;
`;

export const FixedFooter = styled.div`
  position: sticky;
  bottom: 0;
  background-color: #fff;
  border-top: 1px solid #ddd;
  padding: 16px;
  text-align: center;
`;
