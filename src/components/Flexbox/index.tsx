import React from 'react'
import styled from 'styled-components'
import {
  BorderProps,
  border,
  FlexboxProps,
  flexbox,
  MarginProps,
  margin,
  PaddingProps,
  padding,
} from 'styled-system'

type Props = BorderProps &
  FlexboxProps &
  MarginProps &
  PaddingProps & {
    children: React.ReactNode
    gap?: string | number
    onClick?: () => void
  }

const Flexbox: React.FC<Props> = ({ children, ...props }) => (
  <StyledDiv {...props}>{children}</StyledDiv>
)

const StyledDiv = styled.div<Props>`
  ${border}
  ${flexbox}
  ${margin}
  ${padding}
  display: flex;
  gap: ${(p) => (typeof p.gap === 'string' ? p.gap : `${p.gap}px`)};
`

Flexbox.defaultProps = {
  flexDirection: 'row',
  gap: 4,
}

export default Flexbox
