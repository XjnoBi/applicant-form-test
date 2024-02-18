import React from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'

import {
  Box,
  Button,
  ConfirmDialog,
  Flexbox,
  Footer,
  Page,
  Text,
} from 'components'

import Form from './Form'

const INITIAL_DATA: Applicant = {
  firstname: '',
  lastname: '',
  email: '',
  mobile: '',
  isPrimary: false,
}

const RULES: string[] = [
  'User can add or remove applicants. However, there must be at least one applicant.',
  'User can nominate a primary applicant. There must always be one, and only one primary applicant.',
]

const VALIDATION_SCHEMA = Yup.array()
  .of(
    Yup.object({
      firstname: Yup.string().ensure().required('First name is required'),
      lastname: Yup.string().ensure().required('Last name is required'),
      email: Yup.string().ensure().email().required('Email is required'),
      mobile: Yup.string().ensure().required('Mobile number is required'),
      isPrimary: Yup.boolean(),
    }),
  )
  .test(
    'at-least-one-primary',
    'At least one applicant must be marked as primary',
    (value) => value?.some((i) => i.isPrimary === true),
  )

const DEFAULT_DIALOG_FLAGS = {
  isOpen: false,
  isConfirmed: false,
}

const getNextId = (currentValues: Applicant[]) =>
  (currentValues
    .sort((a: Applicant, b: Applicant) => (a?.id || 0) - (b?.id || 0))
    .pop()?.id || 0) + 1

const Applicants: React.FC = () => {
  const [saveDialogFlags, setSaveDialogFlags] =
    React.useState(DEFAULT_DIALOG_FLAGS)
  const [resetDialogFlags, setResetDialogFlags] =
    React.useState(DEFAULT_DIALOG_FLAGS)

  const onSubmit = async () => {
    //TODO: call APi service here...
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({})
      }, 2000)
    })
  }

  return (
    <Formik
      initialValues={[{ ...INITIAL_DATA, id: 1, isPrimary: true }]}
      onSubmit={onSubmit}
      validateOnBlur={false}
      validateOnChange={false}
      validationSchema={VALIDATION_SCHEMA}
    >
      {({
        dirty,
        errors,
        handleSubmit,
        isSubmitting,
        resetForm,
        setSubmitting,
        setValues,
        submitForm,
        values,
      }) => {
        const confirmSubmit = () => {
          setSaveDialogFlags({ ...saveDialogFlags, isOpen: true })
        }

        const handleAddForm = () => {
          setValues([
            ...values,
            { id: getNextId([...values]), ...INITIAL_DATA },
          ])
        }

        const handleSaveChanges = () => {
          setSaveDialogFlags(DEFAULT_DIALOG_FLAGS)
          submitForm()

          setTimeout(() => {
            setSubmitting(false)
          }, 2000)
        }

        const handleResetForm = () => {
          setResetDialogFlags(DEFAULT_DIALOG_FLAGS)
          resetForm()
        }

        return (
          <Page title='Applicant'>
            <Box padding='0 1rem'>
              <ul>
                {RULES.map((i, index) => (
                  <li key={index}>
                    <Text variant='caption'>{i}</Text>
                  </li>
                ))}
              </ul>
            </Box>
            <form onSubmit={handleSubmit}>
              {values.map((i, index) => (
                <Form key={i.id} index={index} />
              ))}
            </form>
            <Footer>
              <Button
                onClick={() =>
                  setResetDialogFlags({ ...resetDialogFlags, isOpen: true })
                }
              >
                reset
              </Button>
              <Flexbox alignItems='baseline'>
                {Object.keys(errors).length > 0 &&
                  !values.some((i) => i.isPrimary) && (
                    <Text variant='error'>
                      At least one applicant must be marked as primary
                    </Text>
                  )}
                {isSubmitting && (
                  <Text variant='status'>Saving changes...</Text>
                )}
                <Button variant='ghost' onClick={handleAddForm}>
                  add more
                </Button>
                <Button
                  variant='primary'
                  disabled={!dirty}
                  onClick={confirmSubmit}
                >
                  save
                </Button>
              </Flexbox>
            </Footer>
            <ConfirmDialog
              isOpen={resetDialogFlags.isOpen}
              onCancel={() => setResetDialogFlags(DEFAULT_DIALOG_FLAGS)}
              onConfirm={handleResetForm}
            >
              Are you sure you want to reset? Data will be lost permanently.
            </ConfirmDialog>
            <ConfirmDialog
              isOpen={saveDialogFlags.isOpen}
              onCancel={() => setSaveDialogFlags(DEFAULT_DIALOG_FLAGS)}
              onConfirm={handleSaveChanges}
            >
              Are you sure you want to save these changes?
            </ConfirmDialog>
          </Page>
        )
      }}
    </Formik>
  )
}

export default Applicants
