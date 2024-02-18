import styled, { css } from 'styled-components'

import { hexToRgb } from 'utils/colors'

enum ButtonVariants {
  ghost = 'ghost',
  outline = 'outline',
  primary = 'primary',
}

type Props = {
  children: string | number
  disabled?: boolean
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  variant?: keyof typeof ButtonVariants
}

const Button: React.FC<Props> = ({ children, ...props }) => (
  <StyledButton {...props} type='button'>
    {children}
  </StyledButton>
)

const StyledButton = styled.button<Omit<Props, 'children'>>`
  border-radius: 5px;
  cursor: ${(p) => (p.disabled ? 'not-allowed' : 'pointer')};
  font-family: 'Montserrat', sans-serif;
  font-size: 0.6rem;
  font-weight: 600;
  padding: 8px;
  text-transform: uppercase;
  ${(p) => {
    switch (p.variant) {
      case ButtonVariants.ghost:
        return css`
          border: none;
          background-color: ${p.theme.colors.white};
          color: ${p.theme.colors.primary};

          ${!p.disabled &&
          css`
            &:hover {
              background-color: rgba(
                ${hexToRgb(p.theme.colors.primary)[0]},
                0.1
              );
            }
          `}
        `
      case ButtonVariants.outline:
        return css`
          border: 1px solid ${p.theme.colors.primary};
          background-color: ${p.theme.colors.white};
          color: ${p.theme.colors.primary};

          ${!p.disabled &&
          css`
            &:hover {
              background-color: rgba(
                ${hexToRgb(p.theme.colors.primary)[0]},
                0.1
              );
            }
          `}
        `
      case ButtonVariants.primary:
        return css`
          border: 1px solid ${p.theme.colors.primary};
          background-color: ${p.disabled
            ? `rgba(${hexToRgb(p.theme.colors.primary)[0]}, 0.8)`
            : p.theme.colors.primary};
          color: ${p.theme.colors.white};

          ${!p.disabled &&
          css`
            &:hover {
              background-color: rgba(
                ${hexToRgb(p.theme.colors.primary)[0]},
                0.8
              );
            }
          `}
        `
    }
  }}
`

Button.defaultProps = {
  variant: ButtonVariants.outline,
}

export default Button
