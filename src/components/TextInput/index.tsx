import styled from 'styled-components'

import Text from 'components/Text'
import Flexbox from 'components/Flexbox'
import Box from 'components/Box'

type Props = {
  error?: string
  label?: string
  maxLength?: number
  name?: string
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
  onChange?: (value: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  required?: boolean
  value?: string | number
}

const TextInput: React.FC<Props> = ({
  error,
  label,
  name,
  required,
  ...props
}) => (
  <Flexbox flexDirection='column'>
    {label && (
      <LabelWrapper>
        <Text variant='label' htmlFor={name}>
          {label}
        </Text>
        {required && <RequiredMarker>*</RequiredMarker>}
      </LabelWrapper>
    )}
    <StyledInput {...props} name={name} />
    {error && <Text variant='error'>{error}</Text>}
  </Flexbox>
)

const LabelWrapper = styled(Box)`
  line-height: 0.8;
`

const RequiredMarker = styled.span`
  color: red;
  font-size: 0.6rem;
  margin-left: 4px;
`

const StyledInput = styled.input`
  font-family: 'Roboto', sans-serif;
  font-size: 0.8rem;
  padding: 8px;
  min-width: 350px;

  ::placeholder {
    font-size: 0.8rem;
    font-style: italic;
  }
`

export default TextInput
