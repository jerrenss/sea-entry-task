import React, { useState, useEffect } from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Form from './Form'
import Layout from '../../../components/Layout'
import InfoModal from '../../../components/InfoModal'
import HelpIcon from '@material-ui/icons/Help'
import { IconButton } from '@material-ui/core'
import profileService from '../../../services/profile'
import { VCPUserObjectID } from '../const'
import PROFILE_MODAL_INFO from './const'
import FormExportButton from '../../../components/FormExportButton'
import UserRoute from '../../../components/Authentication/UserRoute'
import { filterFormObject } from '../../../utils'

const useStyles = makeStyles((theme) => ({
  modalButton: {
    marginBottom: theme.spacing(1),
  },
}))

const modalToggleButton = (onClick) => {
  return (
    <IconButton color="primary" onClick={onClick}>
      <HelpIcon />
    </IconButton>
  )
}

const profilePageModal = (onClickHandler, modalInfo, modalOpen) => {
  const button = modalToggleButton(onClickHandler)
  return (
    <InfoModal
      openButtonTitle="?"
      modalTitle="Profile Page Help"
      toggleButton={modalToggleButton(onClickHandler)}
      content={modalInfo}
      open={modalOpen}
      onClickHandler={onClickHandler}
    />
  )
}

const Profile: React.FC = (props) => {
  const classes = useStyles()
  const [modalOpen, setModalOpen] = useState(false)
  const [content, setContent] = useState(null)
  const pageTitle = 'Profile'

  const onClickHandler = () => {
    setModalOpen(!modalOpen)
  }

  useEffect(() => {
    profileService.getProfileByUser(VCPUserObjectID).then((response) => {
      setContent(response.profile)
      console.log(response.profile)
    })
  }, [])

  return (
    // <UserRoute>
    <Layout
      pageTitle={pageTitle}
      pageModal={profilePageModal(
        onClickHandler,
        PROFILE_MODAL_INFO,
        modalOpen,
      )}
      exportButton={
        <FormExportButton
          data={filterFormObject(content)}
          pageTitle={pageTitle}
        />
      }
    >
      {content && <Form preLoadedData={content} />}
    </Layout>
    // </UserRoute>
  )
}

export default Profile
