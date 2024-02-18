import React from 'react'
import styled from 'styled-components'

import Flexbox from 'components/Flexbox'
import Text from 'components/Text'

type Props = {
  toggled?: boolean
  error?: string
  disabled?: boolean
  label: string
  name?: string
  onClick?: (value: boolean) => void
}

type StyleProps = Omit<Props, 'label'>

const Switch: React.FC<Props> = ({ error, label, onClick, ...props }) => {
  const handleClick = () => {
    onClick?.(!props.toggled)
  }

  return (
    <Flexbox flexDirection='column'>
      <StyledFlexbox alignItems='center' onClick={handleClick} {...props}>
        <Rail {...props}>
          <Oval {...props} />
        </Rail>
        <StyledLabel variant='label'>{label}</StyledLabel>
      </StyledFlexbox>
      {error && <Text variant='error'>{error}</Text>}
    </Flexbox>
  )
}

const StyledLabel = styled(Text)`
  margin: 0;
`

const StyledFlexbox = styled(Flexbox)<StyleProps>`
  cursor: ${(p) => (p.disabled ? 'not-allowed' : 'pointer')};
`

const Rail = styled.div<StyleProps>`
  background-color: ${(p) =>
    p.toggled ? p.theme.colors.primary : p.theme.colors.secondary};
  border: 1px solid ${(p) => p.theme.colors.primary};
  border-radius: 20px;
  position: relative;
  height: 18px;
  width: 36px;
`

const Oval = styled.div<StyleProps>`
  background-color: white;
  border-radius: 50%;
  height: 16px;
  width: 16px;
  left: ${(p) => (p.toggled ? '18px' : '0')};
  top: 0;
  position: absolute;
`

export default Switch
