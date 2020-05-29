import React, { useEffect, useState } from 'react'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Typography from '@material-ui/core/Typography'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import { TCity } from '@/store/cities/types'

type Props = {
  cities: TCity[]
  onChange: (city: TCity) => void
  deleteCity: (city: TCity) => void
  selectedCity?: TCity | undefined
  setMessage: (message: string) => void
}

export const ListCity: React.FC<Props> = ({ cities, onChange, deleteCity, selectedCity }) => {
  const [selectedIndex, setSelectedIndex] = useState<number | undefined>(cities.findIndex(city => city === selectedCity))

  useEffect(() => {
    selectedIndex !== undefined && onChange(cities[selectedIndex])
  }, [selectedIndex])

  return (
    <>
      <Typography variant={'h6'}>Locations</Typography>
      <List component={'ul'}>
        {cities.map((city: TCity, index) => {
          return (
            <ListItem component={'li'}
              key={city.name}
              button
              selected={selectedIndex === index}
              onClick={() => {
                setSelectedIndex(index)
              }}
            >
              <ListItemText>
                {city.name}
              </ListItemText>
              <ListItemIcon onClick={
                (event: React.SyntheticEvent) => {
                  event.stopPropagation()
                  deleteCity(city)
                }
              }>
                <DeleteForeverIcon/>
              </ListItemIcon>
            </ListItem>
          )
        })}
      </List>
    </>
  )
}
