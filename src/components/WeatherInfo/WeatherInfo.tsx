import React from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'

// @ts-ignore нет типов
import d2d from 'degrees-to-direction'

import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'

import { Field } from '@/components/Field'
import { TWeatherResponse } from '@/api/types'
import { RequestStatus, TRequestStatus } from '@/types'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      width: '100%'
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'left',
      color: theme.palette.text.secondary,
    },
    box: {
      display: 'flex',
      alignItems: 'center'
    },
    grid: {
      width: '100%'
    }
  }),
)

type Props = {
  data: TWeatherResponse | undefined
  requestStatus: TRequestStatus
}

const iconLink = ' http://openweathermap.org/img/wn/'

export const WeatherInfo: React.FC<Props> = ({ data, requestStatus }) => {
  const classes = useStyles()

  const renderWeather = (): React.ReactElement | null => {
    if (data) {
      return (
        <div className={classes.root}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Typography variant={'h6'}>Weather ({data.dt}):</Typography>
                <Box className={classes.box} alignItems={'center'}>
                  <Field label={'Weather info'} value={data.weather[0].description} component={'span'}/>
                  <img src={`${iconLink}${data.weather[0].icon}.png`} alt="weather icon"/>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Typography variant={'h6'}>Temperature:</Typography>
                <Field label={'Current temperature'} value={data.main.temp + ' °C'}/>
                <Field label={'Minimum temperature'} value={data.main.temp_min + ' °C'}/>
                <Field label={'Maximum temperature'} value={data.main.temp_max + ' °C'}/>
                <Field label={'Feels like'} value={data.main.feels_like + ' °C'}/>
                <Field label={'Humidity'} value={data.main.humidity + ' %'}/>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Typography variant={'h6'}>Wind:</Typography>
                <Field label={'Speed'} value={data.wind.speed + 'm/s'}/>
                <Field label={'Direction'} value={d2d(data.wind.deg)}/>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Typography variant={'h6'}>Clouds:</Typography>
                <Field label={'Speed'} value={data.clouds.all + 'm/s'}/>
              </Paper>
            </Grid>

          </Grid>
        </div>
      )
    } else {
      return null
    }
  }

  const renderStub = (): React.ReactElement => {
    return (
      <Paper className={classes.paper}>
        {
          requestStatus === RequestStatus.PENDING
            ? <Typography variant={'h6'}>Please, wait</Typography>
            : <Typography variant={'h6'}>Please, choose location</Typography>
        }
      </Paper>
    )
  }

  return renderWeather() || renderStub()
}
