import React, { useEffect, useState } from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Layout from '../../../../components/Layout'
import Form from './Form'
import foodAndBeveragesService from '../../../../services/foodAndBeverages'
import { VCPUserObjectID } from '../../const'
import UserRoute from '../../../../components/Authentication/UserRoute'
import { IconButton } from '@material-ui/core'
import HelpIcon from '@material-ui/icons/Help'
import InfoModal from '../../../../components/InfoModal'
import FormExportButton from '../../../../components/FormExportButton'
import IRD_MODAL_INFO from './const'
import { filterFormObject } from '../../../../utils'

const useStyles = makeStyles((theme) => ({}))

const modalToggleButton = (onClick) => {
  return (
    <IconButton color="primary" onClick={onClick}>
      <HelpIcon />
    </IconButton>
  )
}

const IRDPageModal = (onClickHandler, modalInfo, modalOpen) => {
  const button = modalToggleButton(onClickHandler)
  return (
    <InfoModal
      openButtonTitle="?"
      modalTitle="In-Room Dining - Need Some Help?"
      toggleButton={modalToggleButton(onClickHandler)}
      content={modalInfo}
      open={modalOpen}
      onClickHandler={onClickHandler}
    />
  )
}

const InRoomDining: React.FC = (props) => {
  const classes = useStyles()
  const [modalOpen, setModalOpen] = useState(false)
  const [content, setContent] = useState(null)
  const pageTitle = 'In-Room Dining'

  const onClickHandler = () => {
    setModalOpen(!modalOpen)
  }

  useEffect(() => {
    foodAndBeveragesService
      .getInRoomDiningByUser(VCPUserObjectID)
      .then((IRDContent) => {
        setContent(IRDContent)
      })
  }, [])

  return (
    <UserRoute>
      <Layout
        pageTitle={pageTitle}
        pageModal={IRDPageModal(onClickHandler, IRD_MODAL_INFO, modalOpen)}
        exportButton={
          <FormExportButton
            data={filterFormObject(content)}
            pageTitle={pageTitle}
          />
        }
      >
        {content && <Form preLoadedData={content} setContent={setContent} />}
      </Layout>
    </UserRoute>
  )
}

export default InRoomDining
