import { styled } from 'styled-components';

export const S = {
  Container: styled.div`
    color: var(--color-accent);
  `,

  Statuslabel: styled.div`
    color: var(--color-text);

    &:hover {
      color: var(--color-accent) !important;
      transition: color 0.3s ease-in-out;
    }
  `,
};
