import React from 'react'
import styled from 'styled-components'

import Box from 'components/Box'
import Text from 'components/Text'

type Props = {
  children: React.ReactNode
  title?: string
}

const Page: React.FC<Props> = ({ children, title }) => (
  <StyledBox>
    {title && <Text variant='h1'>{title}</Text>}
    <Box padding='1rem 0'>{children}</Box>
  </StyledBox>
)

const StyledBox = styled(Box)`
  padding: 1.5rem 1rem;
  position: relative;

  @media (min-width: 576px) {
    padding: 2rem 2rem;
  }

  @media (min-width: 768px) {
    padding: 2rem 2rem;
  }

  @media (min-width: 992px) {
    padding: 2rem 2rem;
  }

  @media (min-width: 1200px) {
    padding: 2rem 2rem;
  }
`

export default Page
