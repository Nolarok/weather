import React, { useEffect, useState } from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

import TextField from '@material-ui/core/TextField/TextField'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import MyLocationIcon from '@material-ui/icons/MyLocation'
import Button from '@material-ui/core/Button'

import { TGeo } from '@/store/geo/reducers'
import { TCity } from '@/store/cities/types'
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
      },
      '& .MuiGrid-item': {
        display: 'flex'
      },
    },
  }),
)

type TField = {
  value: string
  helperText: string | null
  label: string
  id: string
  error: boolean
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

type Props = {
  addCity: (data: TCity) => void
  fetchGeoLocation: () => void
  geoLocation: TGeo
  setMessage: (message: string) => void
}

const inRange = (options: { value: number, min: number, max: number }) => {
  return options.value >= options.min && options.value <= options.max
}

const validators: { [feild: string]: (value: string) => string | undefined } = {
  name: (value: string) => {
    if (value.trim().length === 0) {
      return 'Required field'
    }
  },
  lon: (value: string) => {
    if (value.length === 0) {
      return 'Required field'
    }

    if (isNaN(+value) || !inRange({ value: +value, min: -180, max: 180 })) {
      return 'Incorrect value'
    }
  },
  lat: (value: string) => {
    if (value.length === 0) {
      return 'Required field'
    }

    if (isNaN(+value) || !inRange({ value: +value, min: -90, max: 90 })) {
      return 'Incorrect value'
    }
  }
}

export const AddCity: React.FC<Props> = ({ addCity, fetchGeoLocation, geoLocation }) => {
  const classes = useStyles()

  useEffect(() => {
    if (geoLocation.lon !== null && geoLocation.lat !== null) {
      const _fields = { ...fields }
      clearErrors()
      _fields['lon'].value = geoLocation.lon.toString()
      _fields['lat'].value = geoLocation.lat.toString()

      setFields(_fields)
    }
  }, [geoLocation])

  const clearErrors = () => {
    const _fields = { ...fields }

    for (let key in _fields) {
      _fields[key].error = false
      _fields[key].helperText = ''
    }

    setFields(_fields)
  }

  const [fields, setFields] = useState<{ [feild: string]: TField }>({
    name: {
      value: '',
      helperText: '',
      label: 'Location',
      id: 'name',
      error: false,
      onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        handleChange(event)
      },
    },
    lon: {
      value: '',
      helperText: '',
      label: 'Longitude',
      id: 'lon',
      error: false,
      onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        handleChange(event)
      },

    },
    lat: {
      value: '',
      helperText: '',
      label: 'Latitude',
      id: 'lat',
      error: false,
      onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        handleChange(event)
      },
    },
  })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const _fields = { ...fields }

    _fields[event.target.id].value = event.target.value
    _fields[event.target.id].error = false

    setFields(_fields)
  }

  const handleFetchGeoLocation = () => {
    fetchGeoLocation()
  }

  const handleAddLocation = () => {
    let hasErrors = false

    const _fields = { ...fields }

    for (let key in fields) {
      const error = validators[key](fields[key].value)
      if (error) {
        hasErrors = true
        _fields[fields[key].id].helperText = error
        _fields[fields[key].id].error = true
      }
    }

    if (hasErrors) {
      setFields(_fields)
    } else {
      clearErrors()
      addCity({
        name: fields.name.value,
        coord: {
          lon: +fields.lon.value,
          lat: +fields.lat.value
        }
      })
    }
  }

  return (

    <form className={classes.root} noValidate autoComplete="off">
      <Typography variant={'h6'}>Add new location</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            {...fields.name}
          />
          <IconButton color="primary" aria-label="add" onClick={handleFetchGeoLocation}>
            <MyLocationIcon/>
          </IconButton>
        </Grid>
        <Grid item xs={12}>
          <TextField
            {...fields.lon}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            {...fields.lat}
          />
        </Grid>

        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={handleAddLocation}>
            Add
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}
