import React, { useEffect, useState } from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Layout from '../../../../components/Layout'
import Form from './Form'
import roomsService from '../../../../services/rooms'
import { VCPUserObjectID } from '../../const'
import UserRoute from '../../../../components/Authentication/UserRoute'
import { IconButton } from '@material-ui/core'
import HelpIcon from '@material-ui/icons/Help'
import ROOMS_FLOOR_PLAN_MODAL_INFO from './const'
import InfoModal from '../../../../components/InfoModal'
import FormExportButton from '../../../../components/FormExportButton'
import rooms from '../../../../services/rooms'
import { filterFormObject } from '../../../../utils'

const useStyles = makeStyles((theme) => ({}))

const modalToggleButton = (onClick) => {
  return (
    <IconButton color="primary" onClick={onClick}>
      <HelpIcon />
    </IconButton>
  )
}

const roomsFloorPlanPageModal = (onClickHandler, modalInfo, modalOpen) => {
  const button = modalToggleButton(onClickHandler)
  return (
    <InfoModal
      openButtonTitle="?"
      modalTitle="Rooms Floor Plan - Need Some Help?"
      toggleButton={modalToggleButton(onClickHandler)}
      content={modalInfo}
      open={modalOpen}
      onClickHandler={onClickHandler}
    />
  )
}

const RoomsFloorPlan: React.FC = (props) => {
  const classes = useStyles()
  const [modalOpen, setModalOpen] = useState(false)
  const [content, setContent] = useState(null)
  const pageTitle = 'Room Floor Plan'

  const onClickHandler = () => {
    setModalOpen(!modalOpen)
  }

  useEffect(() => {
    roomsService
      .getRoomFloorPlanByUser(VCPUserObjectID)
      .then((roomsContent) => {
        setContent(roomsContent)
      })
  }, [])

  return (
    <UserRoute>
      <Layout
        pageTitle={pageTitle}
        pageModal={roomsFloorPlanPageModal(
          onClickHandler,
          ROOMS_FLOOR_PLAN_MODAL_INFO,
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

export default RoomsFloorPlan
