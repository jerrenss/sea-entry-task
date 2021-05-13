import React, { useEffect, useState } from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Layout from '../../../components/Layout'
import Form from './Form'
import housekeepingService from '../../../services/housekeeping'
import { VCPUserObjectID } from '../const'
import UserRoute from '../../../components/Authentication/UserRoute'
import { IconButton } from '@material-ui/core'
import HelpIcon from '@material-ui/icons/Help'
import InfoModal from '../../../components/InfoModal'
import FormExportButton from '../../../components/FormExportButton'
import HOUSEKEEPING_MODAL_INFO from './const'
import { filterFormObject } from '../../../utils'

const useStyles = makeStyles((theme) => ({}))

const Housekeeping: React.FC = (props) => {
  const classes = useStyles()
  const [modalOpen, setModalOpen] = useState(false)
  const [content, setContent] = useState(null)
  const pageTitle = 'Housekeeping'

  const modalToggleButton = (onClick) => {
    return (
      <IconButton color="primary" onClick={onClick}>
        <HelpIcon />
      </IconButton>
    )
  }

  const housekeepingPageModal = (onClickHandler, modalInfo, modalOpen) => {
    const button = modalToggleButton(onClickHandler)
    return (
      <InfoModal
        openButtonTitle="?"
        modalTitle="Housekeeping - Need Some Help?"
        toggleButton={modalToggleButton(onClickHandler)}
        content={modalInfo}
        open={modalOpen}
        onClickHandler={onClickHandler}
      />
    )
  }

  const onClickHandler = () => {
    setModalOpen(!modalOpen)
  }

  useEffect(() => {
    housekeepingService
      .getHousekeepingByUser(VCPUserObjectID)
      .then((housekeepingContent) => {
        setContent(housekeepingContent)
      })
  }, [])

  return (
    <UserRoute>
      <Layout
        pageTitle={pageTitle}
        pageModal={housekeepingPageModal(
          onClickHandler,
          HOUSEKEEPING_MODAL_INFO,
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

export default Housekeeping
