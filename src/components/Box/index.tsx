import React from 'react'
import styled from 'styled-components'
import {
  BorderProps,
  border,
  MarginProps,
  margin,
  PaddingProps,
  padding,
} from 'styled-system'

type Props = BorderProps &
  MarginProps &
  PaddingProps & {
    children: React.ReactNode
  }

const Box: React.FC<Props> = ({ children, ...props }) => (
  <StyledDiv {...props}>{children}</StyledDiv>
)

const StyledDiv = styled.div<Props>`
  ${border}
  ${margin}
  ${padding}
  display: block;
`

export default Box
