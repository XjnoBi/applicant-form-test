import React from 'react'
import styled from 'styled-components'

import Flexbox from 'components/Flexbox'

type Props = {
  children: React.ReactNode
}

const Footer: React.FC<Props> = ({ children }) => (
  <StyledFlexbox justifyContent='space-between'>{children}</StyledFlexbox>
)

const StyledFlexbox = styled(Flexbox)`
  background-color: ${(p) => p.theme.colors.white};
  border-top: 1px solid ${(p) => p.theme.colors.secondary};
  position: fixed;
  bottom: 0;
  left: 0;
  padding: 0.6rem 2rem;
  width: 100%;
  z-index: 500;
`

export default Footer
