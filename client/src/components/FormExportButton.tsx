import React from 'react'
import SaveAltIcon from '@material-ui/icons/SaveAlt'
import { IconButton } from '@material-ui/core'
import converter from 'json-2-csv'
import { downloadCsv } from '../utils'
import { isAdmin } from '../services/authentication'

interface FormExportButtonProps {
  data: Object
  pageTitle: string
}

const FormExportButton: React.FC<FormExportButtonProps> = (props) => {
  const { data, pageTitle } = props

  const handleFormExport = () => {
    const admin = isAdmin()

    const updatedData = [data]

    if (admin) {
      //Additional formatting for BotBuilder import
      const firstRow = { ...updatedData[0] }
      Object.keys(firstRow).forEach((key) => {
        firstRow[key] = 'string'
      })
      updatedData.splice(0, 0, firstRow)
    }

    converter.json2csv(updatedData, (err, csv) => {
      if (err) {
        throw err
      }
      downloadCsv(csv, pageTitle)
    })
  }

  return (
    <IconButton color="primary" onClick={handleFormExport}>
      <SaveAltIcon />
    </IconButton>
  )
}

export default FormExportButton
