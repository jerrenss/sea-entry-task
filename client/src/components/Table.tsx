import React, { useState } from 'react'
import MaterialTable from 'material-table'
import { HeaderComponents, IRowAdd, ModalDetails } from '../types'
import { zipObject, omit } from 'lodash'
import { Backdrop, CircularProgress, makeStyles } from '@material-ui/core'
import InfoModal from '../components/InfoModal'
import FileCopyIcon from '@material-ui/icons/FileCopy'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import UploadModal from './UploadModal'
import AmazonS3URI from 'amazon-s3-uri'
import utilServices from '../services/utils'
import converter from 'json-2-csv'
import { downloadCsv } from '../utils'
import { isAdmin } from '../services/authentication'
import HeaderAction from './HeaderAction'

interface TableProps {
  tableHeaders: HeaderComponents[]
  tableRawContent: string[][]
  tableInfo: any[]
  tableTitle: string
  loading: boolean
  duplicate?: boolean
  modalDetails: ModalDetails
  uploadRef?: string
  updateTableInfo: (data) => void
  updateHeadersAndContent: (headers, content) => void
}

/**
 * Helper function that is called in all sections requiring a table.
 * Returns an array of Objects that is used to populate the data in material-table.
 * @param headers an array of HeaderComponents.
 * @param data a 2D array of strings. Each array element corresponds to one row of data in the table.
 */
export const populateTableHelper = (
  headers: HeaderComponents[],
  data: string[][],
): Object[] => {
  const fields: string[] = getHeaderFields(headers)
  const tableInfo: Object[] = []
  data.forEach((d) => {
    tableInfo.push(zipObject(fields, d))
  })
  return tableInfo
}

export const getHeaderFields = (headers: HeaderComponents[]): string[] => {
  const fields = headers.map((header) => {
    if (header) {
      return header.field
    }
  })
  return fields
}

export const getTableValues = (data) => {
  const newData = data
    .map(({ tableData, ...item }) => item)
    .map((obj) => Object.values(obj))
  return newData
}

export const populateEmptyFields = (headers, newData) => {
  const keys = getHeaderFields(headers)
  const result = {}
  keys.forEach((key) => {
    if (newData[key]) {
      result[key] = newData[key]
    } else {
      result[key] = null
    }
  })
  return result
}

export const handleDeleteS3Item = (objectURL) => {
  try {
    const { key } = AmazonS3URI(objectURL)
    utilServices.deleteS3Item(key)
  } catch (err) {
    console.log(`${objectURL} is an invalid URI`)
  }
}

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  titleWrapper: {
    display: 'flex',
  },
  tableTitle: {
    display: 'inherit',
    color: theme.palette.primary.main,
  },
}))

const Table: React.FC<TableProps> = (props) => {
  const classes = useStyles()
  const [infoModalOpen, setInfoModalOpen] = useState(false)
  const [uploadModalOpen, setUploadModalOpen] = useState(false)

  const handleHelpButtonClick = () => {
    setInfoModalOpen(!infoModalOpen)
  }

  const handleUploadButtonClick = () => {
    setUploadModalOpen(!uploadModalOpen)
  }

  const handleDeleteRows = (event, rowData) => {
    let data: any = [...tableInfo]
    rowData.forEach((rd) => {
      data = data.filter((t) => t.tableData.id !== rd.tableData.id)
      if (rd.image) {
        handleDeleteS3Item(rd.image)
      }
    })
    updateTableInfo(data)
  }

  const handleDuplicateRows = (event, rowData) => {
    let data: any = [...tableInfo]
    rowData.forEach((rd) => {
      // Logic to set image column to null, preventing duplicate links in table
      if (rd.image) {
        const editedRd = { ...rd }
        editedRd.image = null
        data.unshift(omit(editedRd, 'tableData'))
      } else {
        data.unshift(omit(rd, 'tableData'))
      }
    })
    updateTableInfo(data)
  }

  const getOptions = (): string[] => {
    const key = uploadRef
    const result: string[] = tableInfo.map((row, index) =>
      row[key] ? `${index + 1}. ${row[key]}` : `${index + 1}. No Input Found`,
    )
    return result
  }

  const {
    tableHeaders,
    tableRawContent,
    tableInfo,
    tableTitle,
    loading,
    duplicate = true,
    modalDetails,
    uploadRef = null,
    updateTableInfo,
    updateHeadersAndContent,
  } = props

  const admin = isAdmin()

  const { hasModal, modalButtonTitle, modalTitle, modalInfo } = modalDetails
  const options = {
    pageSize: 10,
    addRowPosition: 'first' as IRowAdd,
    exportButton: { csv: true },
    exportAllData: true,
    exportCsv: (columns, data) => {
      const dataRows = data.map(({ tableData, ...row }) => ({
        ...row,
      }))

      if (admin) {
        //Additional formatting for BotBuilder import
        const firstRow = { ...dataRows[0] }
        Object.keys(firstRow).forEach((key) => {
          firstRow[key] = 'string'
        })
        dataRows.splice(0, 0, firstRow)
      }

      converter.json2csv(dataRows, (err, csv) => {
        if (err) {
          throw err
        }
        downloadCsv(csv, tableTitle)
      })
    },
    selection: true,
    headerStyle: {
      fontSize: 16,
      fontWeight: 700,
    },
  }

  return (
    <>
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      {infoModalOpen && (
        <InfoModal
          openButtonTitle={modalButtonTitle}
          modalTitle={modalTitle}
          content={modalInfo}
          open={infoModalOpen}
          onClickHandler={handleHelpButtonClick}
        />
      )}
      {uploadModalOpen && (
        <UploadModal
          options={getOptions()}
          uploadRef={uploadRef}
          open={uploadModalOpen}
          tableHeaders={tableHeaders}
          tableInfo={tableInfo}
          tableTitle={tableTitle}
          onClickHandler={handleUploadButtonClick}
          updateTableInfo={updateTableInfo}
        />
      )}
      <MaterialTable
        columns={tableHeaders?.map((c) => ({
          ...c,
          tableData: undefined,
        }))}
        title={tableTitle}
        options={options}
        data={tableInfo}
        style={{ overflowX: 'scroll' }}
        actions={[
          uploadRef && {
            icon: () => <CloudUploadIcon />,
            tooltip: 'Upload',
            position: 'toolbar',
            onClick: handleUploadButtonClick,
          },
          hasModal && {
            icon: 'help',
            tooltip: 'Help',
            position: 'toolbar',
            onClick: handleHelpButtonClick,
          },
          duplicate && {
            icon: () => <FileCopyIcon />,
            tooltip: 'Duplicate Rows',
            position: 'toolbarOnSelect',
            onClick: handleDuplicateRows,
          },
          {
            icon: 'delete',
            tooltip: 'Delete Rows',
            position: 'toolbarOnSelect',
            onClick: handleDeleteRows,
          },
        ]}
        localization={{
          header: {
            actions: '',
          },
        }}
        editable={{
          onRowAdd: (newData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve()
                let data = [...tableInfo]
                data.unshift(populateEmptyFields(tableHeaders, newData))
                updateTableInfo(data)
              })
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                if (oldData) {
                  resolve()
                  let data = [...tableInfo]
                  data[data.indexOf(oldData)] = populateEmptyFields(
                    tableHeaders,
                    newData,
                  )
                  updateTableInfo(data)
                }
              })
            }),
        }}
      />
      {admin && (
        <HeaderAction
          headers={tableHeaders}
          content={tableRawContent}
          handleUpdate={updateHeadersAndContent}
        />
      )}
    </>
  )
}

export default Table
