import Box from 'components/Box'
import React from 'react'
import styled from 'styled-components'

import { hexToRgb } from 'utils/colors'

const Dialog: React.FC<DialogProps> = ({ children, isOpen }) => {
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return isOpen ? (
    <Backdrop>
      <StyledDialog open>{children}</StyledDialog>
    </Backdrop>
  ) : null
}

const StyledDialog = styled.dialog`
  border: 1px solid ${(p) => p.theme.colors.primary};
  border-radius: 4px;
  max-width: 600px;
  padding: 0;
`

const Backdrop = styled(Box)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${(p) => `rgba(${hexToRgb(p.theme.colors.accent)[0]}, 0.5)`};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`

export default Dialog
