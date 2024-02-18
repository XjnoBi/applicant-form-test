import React from 'react'
import styled from 'styled-components'

import Button from 'components/Button'
import Flexbox from 'components/Flexbox'
import Text from 'components/Text'
import Box from 'components/Box'

import Dialog from '.'

type Props = Omit<DialogProps, 'children'> & {
  children: string
  onConfirm: () => void
  onCancel: () => void
}

const ConfirmDialog: React.FC<Props> = ({
  children,
  onCancel,
  onConfirm,
  ...props
}) => (
  <Dialog {...props}>
    <Box>
      <Flexbox
        alignItems='center'
        flexDirection='column'
        justifyContent='center'
        padding='2rem 1rem'
      >
        <Text textAlign='center'>{children}</Text>
      </Flexbox>
      <StyledFooter justifyContent='space-between' padding='0.5rem'>
        <Button variant='ghost' onClick={onCancel}>
          Cancel
        </Button>
        <Button variant='ghost' onClick={onConfirm}>
          Confirm
        </Button>
      </StyledFooter>
    </Box>
  </Dialog>
)

const StyledFooter = styled(Flexbox)`
  background-color: ${(p) => p.theme.colors.white};
  border-top: 1px solid ${(p) => p.theme.colors.secondary};
`

export default ConfirmDialog
