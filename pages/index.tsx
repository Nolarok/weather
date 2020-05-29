import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { clearError, getGeoPosInfo } from '@/store/geo/actions'
import { AddCity } from '@/components/AddCity'
import { ListCity } from '@/components/ListCity/ListCity'
import { WeatherInfo } from '@/components/WeatherInfo'
import { CustomSnackbar } from '@/components/CustomSnackbar'
import { addCity, deleteCity, getWeatherInfo, setRequestInfo } from '@/store/cities/actions'
import { citiesRequestInfoSelector, citiesSelector } from '@/store/cities/selectors'
import { myCoordsSelector } from '@/store/geo/selectors'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { TCity } from '@/store/cities/types'
import Toolbar from '@material-ui/core/Toolbar'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper/Paper'
import AppBar from '@material-ui/core/AppBar'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import { RequestStatus } from '@/types'


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      minHeight: '100vh',
      maxHeight: '100vh',
      '& .MuiContainer-root': {
        marginTop: 15
      },
      '& .MuiListItemIcon-root': {
        justifyContent: 'flex-end'
      },
    },
    paper: {
      padding: theme.spacing(2),
      marginBottom: 16,
      maxHeight: 420,
      overflow: 'auto',
      textAlign: 'left',
      color: theme.palette.text.secondary,
    },
  }),
)


const Home: React.FC = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const router = useRouter()
  const cities = useSelector(citiesSelector)
  const requestInfo = useSelector(citiesRequestInfoSelector)
  const geoLocation = useSelector(myCoordsSelector)
  const currentCityName = Array.isArray(router.query.city) ? router.query.city[0] : router.query.city

  const [snackbarOptions, setSnackbarOptions] = useState<{ isOpen: boolean, message: string }>({
    isOpen: false,
    message: ''
  })

  useEffect(() => {
    if (geoLocation.error && geoLocation.error.message) {
      setSnackbarOptions({
        isOpen: true,
        message: geoLocation.error.message
      })
    }

    if (requestInfo.status === RequestStatus.FAILED) {
      setSnackbarOptions({
        isOpen: true,
        message: requestInfo.message
      })
    }


  }, [geoLocation, requestInfo])

  const snackbarHandleClose = (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }

    dispatch(setRequestInfo({
      status: RequestStatus.DEFAULT,
      message: '',
    }))

    dispatch(clearError())

    setSnackbarOptions({
      isOpen: false,
      message: '',
    })
  }

  const snackbarHandleMessage = (message: string) => {
    setSnackbarOptions({
      isOpen: true,
      message,
    })
  }

  const listCityHandleChange = (city: TCity) => {
    if (city) {
      router.push(`/?city=${city.name}`)
      dispatch(getWeatherInfo(city))
    } else {
      router.push(`/`)
    }
  }
  const listCityHandleDelete = (city: TCity) => {
    if (currentCity === city) {
      router.push(`/`)
    }
    dispatch(deleteCity(city))
  }

  const currentCity: TCity | undefined = useMemo<TCity | undefined>(() => {
    return cities.find(city => city.name === currentCityName)
  }, [currentCityName, cities])

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant={'button'}>Weather forecast</Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={3}>
            <Paper className={classes.paper}>
              <AddCity
                addCity={(data) => {
                  dispatch(addCity(data))
                }}
                fetchGeoLocation={() => {
                  dispatch(getGeoPosInfo())
                }}
                geoLocation={geoLocation}
                setMessage={snackbarHandleMessage}
              />
            </Paper>
            <Paper className={classes.paper}>
              <ListCity
                cities={cities.sort()}
                onChange={listCityHandleChange}
                deleteCity={listCityHandleDelete}
                selectedCity={currentCity}
                setMessage={snackbarHandleMessage}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={9}>
            <WeatherInfo
              data={currentCity && currentCity.weather}
              requestStatus={requestInfo.status}
            />
          </Grid>
        </Grid>
        <CustomSnackbar
          isOpen={snackbarOptions.isOpen}
          message={snackbarOptions.message}
          handleClose={snackbarHandleClose}
        />
      </Container>
    </div>
  )
}

export default Home

