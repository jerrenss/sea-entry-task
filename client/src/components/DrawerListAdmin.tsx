import React from 'react'
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import { DrawerListProps } from './DrawerList'
import { ADMIN_SECTIONS } from '../views/Dashboard/const'

const DrawerListAdmin: React.FC<DrawerListProps> = (props) => {
  const { pageTitle, onClickHandler } = props
  return (
    <List>
      {ADMIN_SECTIONS.map(({ title, icon, id, url }) => (
        <ListItem
          key={id}
          button
          selected={title === pageTitle}
          onClick={(e) => onClickHandler(e, url)}
        >
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText>{title}</ListItemText>
        </ListItem>
      ))}
    </List>
  )
}

export default DrawerListAdmin
