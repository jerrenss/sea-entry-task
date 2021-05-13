import React, { useEffect, useState } from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Layout from '../../../../components/Layout'
import Form from './Form'
import hotelInformationService from '../../../../services/hotelInformation'
import { VCPUserObjectID } from '../../const'
import UserRoute from '../../../../components/Authentication/UserRoute'
import { IconButton } from '@material-ui/core'
import HelpIcon from '@material-ui/icons/Help'
import InfoModal from '../../../../components/InfoModal'
import FormExportButton from '../../../../components/FormExportButton'
import GENERAL_MODAL_INFO from './const'
import { filterFormObject } from '../../../../utils'

const useStyles = makeStyles((theme) => ({}))

const modalToggleButton = (onClick) => {
  return (
    <IconButton color="primary" onClick={onClick}>
      <HelpIcon />
    </IconButton>
  )
}

const generalInfoModal = (onClickHandler, modalInfo, modalOpen) => {
  const button = modalToggleButton(onClickHandler)
  return (
    <InfoModal
      openButtonTitle="?"
      modalTitle="General - Need Some Help?"
      toggleButton={modalToggleButton(onClickHandler)}
      content={modalInfo}
      open={modalOpen}
      onClickHandler={onClickHandler}
    />
  )
}

const General: React.FC = (props) => {
  const classes = useStyles()
  const [modalOpen, setModalOpen] = useState(false)
  const [content, setContent] = useState(null)
  const pageTitle = 'General'

  const onClickHandler = () => {
    setModalOpen(!modalOpen)
  }

  useEffect(() => {
    hotelInformationService
      .getHotelInformationByUser(VCPUserObjectID)
      .then((response) => {
        setContent(response.general)
      })
  }, [])

  return (
    <UserRoute>
      <Layout
        pageTitle={pageTitle}
        pageModal={generalInfoModal(
          onClickHandler,
          GENERAL_MODAL_INFO,
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
    </UserRoute>
  )
}

export default General
