import React, { useEffect, useState } from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import miceService from '../../../../services/mice'
import Layout from '../../../../components/Layout'
import Table, {
  populateTableHelper,
  getTableValues,
} from '../../../../components/Table'
import { HeaderComponents, ModalDetails } from '../../../../types'
import { VCPUserObjectID } from '../../const'
import MICE_WEDDING_PACKAGES_MODAL_DETAILS from './const'
import { renderSpecialColumn } from '../../../../utils'
import UserRoute from '../../../../components/Authentication/UserRoute'
import activityService from '../../../../services/activity'

const userId: string = VCPUserObjectID
const tableTitle: string = 'Wedding Packages'
const modalDetails: ModalDetails = MICE_WEDDING_PACKAGES_MODAL_DETAILS
const useStyles = makeStyles((theme) => ({}))

const MICEWeddingPackages: React.FC = (props) => {
  const classes = useStyles()

  const [headers, setHeaders] = useState([])
  const [MICEWeddingPackages, setMICEWeddingPackages] = useState([])
  const [tableInfo, setTableInfo] = useState([])
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    miceService.getMICEWeddingPackagesByUser(userId).then((data) => {
      const updatedHeaders = renderSpecialColumn(data.headers)
      setHeaders(updatedHeaders)
      setMICEWeddingPackages(data.content)
    })
  }, [])

  useEffect(() => {
    populateTable(headers, MICEWeddingPackages)
  }, [headers, MICEWeddingPackages])

  const populateTable = (
    headers: HeaderComponents[],
    MICEWeddingPackages: string[][],
  ) => {
    // get the keys from the headers for zipping with amenities array
    const tableInfo = populateTableHelper(headers, MICEWeddingPackages)
    setTableInfo(tableInfo)
    setLoading(false)
  }

  const updateMICEWeddingPackages = (data) => {
    setLoading(true)
    const MICEWeddingPackagesValues = getTableValues(data)
    miceService
      .updateMICEByUser(
        { 'MICEWeddingPackages.content': MICEWeddingPackagesValues },
        userId,
      )
      .then((updatedData) => {
        setMICEWeddingPackages(updatedData.MICEWeddingPackages.content)
      })
      .then(() => activityService.addActivity('UPDATE MICE WEDDING PACKAGES'))
      .catch((err) => console.log(err))
  }

  const updateHeadersAndContent = (headers, content) => {
    setLoading(true)
    miceService
      .updateMICEByUser(
        {
          'MICEWeddingPackages.headers': headers,
          'MICEWeddingPackages.content': content,
        },
        userId,
      )
      .then((updatedData) => {
        setHeaders(renderSpecialColumn(updatedData.MICEWeddingPackages.headers))
        setMICEWeddingPackages(updatedData.MICEWeddingPackages.content)
      })
      .then(() =>
        activityService.addActivity('UPDATE MICE WEDDING PACKAGES HEADERS'),
      )
      .catch((err) => console.log(err))
  }

  return (
    <UserRoute>
      <Layout pageTitle={tableTitle} hideTitle>
        <Table
          tableHeaders={headers}
          tableRawContent={MICEWeddingPackages}
          tableInfo={tableInfo}
          tableTitle={tableTitle}
          loading={loading}
          modalDetails={modalDetails}
          updateTableInfo={updateMICEWeddingPackages}
          uploadRef="packageName"
          updateHeadersAndContent={updateHeadersAndContent}
        />
      </Layout>
    </UserRoute>
  )
}

export default MICEWeddingPackages
