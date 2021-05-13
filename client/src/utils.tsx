import { Link, TextField, Typography } from '@material-ui/core'
import { omit } from 'lodash'

export const renderSpecialColumn = (headers) => {
  const multilineFields = [
    'Description',
    'Details',
    'Room Description',
    'Instruction Steps',
    'Location',
  ]
  const truncatedFields = [
    'Google Maps Direction URL',
    'Website',
    'Reservation Link',
  ]
  return headers.map((header) => {
    const headerTitle = header.title
    const dataKey = header.field
    if (headerTitle === 'Image') {
      return {
        ...header,
        editable: 'never',
        render: (rowData) => (
          <img
            src={rowData.image}
            alt="&nbsp;Use upload icon to insert image"
            style={{
              height: 30,
              width: 30,
              borderRadius: 3,
              objectFit: 'cover',
            }}
          />
        ),
      }
    } else if (multilineFields.indexOf(headerTitle) > -1) {
      return {
        ...header,
        editComponent: ({ value, onChange }) => (
          <TextField
            onChange={(e) => onChange(e.target.value)}
            value={value}
            InputProps={{
              style: {
                fontSize: '13px',
              },
            }}
            style={{
              width: '400px',
              overflow: 'scroll',
              font: 'inherit',
            }}
            multiline
          />
        ),
        render: (rowData) => {
          return (
            <div
              style={{
                minWidth: '100px',
                maxWidth: '400px',
                maxHeight: '100px',
                overflow: 'scroll',
                overflowWrap: 'break-word',
                whiteSpace: 'pre-wrap',
                marginTop: '8px',
              }}
            >
              {rowData[dataKey]}
            </div>
          )
        },
      }
    } else if (truncatedFields.indexOf(headerTitle) > -1) {
      return {
        ...header,
        render: (rowData) => (
          <div
            style={{
              alignContent: 'flex-end',
              maxWidth: '200px',
              maxHeight: '50px',
              overflow: 'scroll',
              overflowWrap: 'break-word',
              whiteSpace: 'pre-wrap',
              marginTop: '8px',
            }}
          >
            {rowData[dataKey]}
          </div>
        ),
      }
    } else {
      return header
    }
  })
}

export const renderS3Url = (link) => {
  const blue = '#0052CC'
  const red = '#B30000'
  return link ? (
    link.substring(0, 5) === 'https' ? (
      <Link href={`${link}`}>
        <Typography style={{ color: blue }}>{link}</Typography>
      </Link>
    ) : (
      <Typography style={{ color: blue }}>{link}</Typography>
    )
  ) : (
    <Typography style={{ color: red }}>No File Uploaded!</Typography>
  )
}

export const filterFormObject = (content) => {
  const newContent = omit(content, [
    '_id',
    'user',
    'createdAt',
    'updatedAt',
    '__v',
  ])
  return newContent
}

export const downloadCsv = (data, fileName) => {
  const finalFileName = fileName.endsWith('.csv') ? fileName : `${fileName}.csv`
  const a = document.createElement('a')
  a.href = URL.createObjectURL(new Blob([data], { type: 'text/csv' }))
  a.setAttribute('download', finalFileName)
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}
