import React from 'react'
import styled, { css } from 'styled-components'
import { MarginProps, margin, TypographyProps, typography } from 'styled-system'

enum TextVariants {
  h1 = 'h1',
  h2 = 'h2',
  h3 = 'h3',
  h4 = 'h4',
  h5 = 'h5',
  h6 = 'h6',
  body = 'body',
  button = 'button',
  caption = 'caption',
  error = 'error',
  label = 'label',
  status = 'status',
  subtitle = 'subtitle',
}

const getFontFamily = (variant?: keyof typeof TextVariants) => {
  switch (variant) {
    case TextVariants.h1:
    case TextVariants.h2:
    case TextVariants.h3:
    case TextVariants.h4:
    case TextVariants.h5:
    case TextVariants.h6:
      return '"Oswald", sans-serif'
    default:
      return 'Roboto, sans-serif'
  }
}

const fontSize: { [key in keyof typeof TextVariants]: string } = {
  h1: '2.5rem',
  h2: '2rem',
  h3: '1.8rem',
  h4: '1.5rem',
  h5: '1.2rem',
  h6: '1rem',
  body: '0.8rem',
  button: '0.8rem',
  caption: '0.8rem',
  error: '0.6rem',
  label: '0.6rem',
  status: '0.6rem',
  subtitle: '1.2rem',
}

const fontWeight: { [key in keyof typeof TextVariants]: string } = {
  h1: 'bold',
  h2: 'bold',
  h3: 'bold',
  h4: 'bold',
  h5: 'bold',
  h6: 'bold',
  body: 'normal',
  button: 'normal',
  caption: 'normal',
  error: 'normal',
  label: 'normal',
  status: 'bold',
  subtitle: 'bold',
}

type Props = MarginProps &
  TypographyProps & {
    children: string | number
    htmlFor?: string
    isPropercase?: boolean
    variant?: keyof typeof TextVariants
  }

const Text: React.FC<Props> = ({
  children,
  variant = TextVariants.body,
  ...props
}) => (
  <>
    {variant === TextVariants.label && (
      <StyledLabel {...props}>{children}</StyledLabel>
    )}
    {variant !== TextVariants.label && (
      <StyledParagraph {...props} variant={variant}>
        {children}
      </StyledParagraph>
    )}
  </>
)

const StyledLabel = styled.label<Props>`
  font-size: ${fontSize.label};
  font-weight: ${fontWeight.label};
  margin: 0 0 4px;
  ${(p) => css`
    ${p.isPropercase && 'text-transform: capitalize;'}
  `}
`

const StyledParagraph = styled.p<Props>`
  ${margin}
  ${typography}
  color: ${(p) =>
    p.variant === TextVariants.error
      ? p.theme.colors.error
      : p.theme.colors.text};
  font-family: ${(p) => getFontFamily(p.variant)};
  font-size: ${(p) => (p.variant ? fontSize[p.variant] : fontSize.body)};
  font-weight: ${(p) => (p.variant ? fontWeight[p.variant] : fontWeight.body)};
  ${(p) => css`
    ${p.isPropercase && 'text-transform: capitalize;'}
  `}
`

export default Text
