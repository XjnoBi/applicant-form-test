import React from 'react'
import { FormikErrors, useFormikContext } from 'formik'

import {
  Box,
  Button,
  ConfirmDialog,
  Flexbox,
  Switch,
  Text,
  TextInput,
} from 'components'

type Props = {
  index: number
}

const DEFAULT_DIALOG_FLAGS = { isOpen: false, isConfirmed: false }

const Form: React.FC<Props> = ({ index }) => {
  const [deleteDialogFlags, setDeleteDialogFlags] =
    React.useState(DEFAULT_DIALOG_FLAGS)

  const { getFieldProps, errors, setValues, values } =
    useFormikContext<Applicant[]>()

  const data = values?.[index]
  const error = errors?.[index]

  const handleChange = (data: Applicant) => {
    if (!data.id) return

    const tempValues = values.map((i) => {
      // reset primary applicant
      if (data.isPrimary && i.id !== data.id) {
        return {
          ...i,
          isPrimary: false,
        }
      }

      return i
    })

    const index = tempValues.findIndex((i) => i.id === data.id)
    tempValues[index] = {
      ...data,
      id: data.id || 0,
    }

    setValues(tempValues)
  }

  const handleConfirmDelete = (id: Applicant['id']) => {
    const applicant = values.find((i) => i.id === id)
    if (!id || !applicant) return

    // do not allow deleting last applicant
    if (values.length === 1) return

    // do not allow deleting primary applicant
    if (applicant.isPrimary) return

    setDeleteDialogFlags({ ...deleteDialogFlags, isOpen: true })
  }

  const handleDelete = (id: Applicant['id']) => {
    setValues(values.filter((i) => i.id !== id))
  }

  const handleChangeTextInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChange({ ...data, [e.target.name]: e.target.value })
  }

  const handleTogglePrimary = (value: boolean) => {
    handleChange({ ...data, isPrimary: value })
  }

  const inputProps = (accessor: keyof Applicant) => ({
    error: (error as FormikErrors<Applicant>)?.[accessor],
    value: data[accessor] as string,
  })

  const textInputProps = (accessor: keyof Applicant) => ({
    ...getFieldProps(accessor),
    ...inputProps(accessor),
    maxLength: 30,
    onChange: handleChangeTextInput,
    required: true,
  })

  const fullname = `${data.firstname} ${data.lastname}`.trim()

  return (
    <Box margin='1rem 0'>
      <Text variant='h4' isPropercase>
        {`${index + 1}. ${fullname || '(No name)'}`}
      </Text>
      <Flexbox
        alignItems='start'
        flexDirection='column'
        margin='0.5rem 0'
        gap={16}
      >
        <TextInput label='First name' {...textInputProps('firstname')} />
        <TextInput label='Last name' {...textInputProps('lastname')} />
        <TextInput label='Email' {...textInputProps('email')} maxLength={320} />
        <TextInput
          label='Mobile number'
          placeholder='+63XXXXXXXXXX'
          {...textInputProps('mobile')}
        />
        <Switch
          {...inputProps('isPrimary')}
          label='Primary applicant'
          onClick={handleTogglePrimary}
          toggled={data.isPrimary}
        />
      </Flexbox>
      {values.length > 1 && (
        <Button
          disabled={data.isPrimary}
          onClick={() => handleConfirmDelete(data.id)}
        >
          delete
        </Button>
      )}
      <ConfirmDialog
        isOpen={deleteDialogFlags.isOpen}
        onCancel={() => setDeleteDialogFlags(DEFAULT_DIALOG_FLAGS)}
        onConfirm={() => {
          handleDelete(values[index].id)
        }}
      >
        {`Are you sure you want to delete applicant #${index + 1}? Any data will be lost permanently.`}
      </ConfirmDialog>
    </Box>
  )
}

export default Form
