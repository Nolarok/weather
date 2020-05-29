import { ActionCreator1, createAction, EmptyActionCreator } from 'redux-act'
import { TRequestStatus } from '@/types'

export const ACTION_PREFIX_SUCCESS = '/SUCCESS'
export const ACTION_PREFIX_FAILED = '/FAILED'
export const ACTION_PREFIX_REQUEST = '/setRequestStatus'

type createAsyncActionReturnType<A, S, F, R> = [
  ActionCreator1<A, A>,
  ActionCreator1<S, S>,
  ActionCreator1<F, F>,
  ActionCreator1<R, R>
]

type createAsyncActionReturnType2<S, F, R> = [
  EmptyActionCreator,
  ActionCreator1<S, S>,
  ActionCreator1<F, F>,
  ActionCreator1<R, R>
]

type createAsyncActionReturnType3<A, F, R> = [
  ActionCreator1<A, A>,
  EmptyActionCreator,
  ActionCreator1<F, F>,
  ActionCreator1<R, R>
]

type createAsyncActionReturnType4<F, R> = [
  EmptyActionCreator,
  EmptyActionCreator,
  ActionCreator1<F, F>,
  ActionCreator1<R, R>
]

export function createAsyncAction(action: string): createAsyncActionReturnType4<any, TRequestStatus>

export function createAsyncAction<S>(
  action: string,
  isActionEmpty: boolean
): createAsyncActionReturnType2<S, any, TRequestStatus>

export function createAsyncAction<S, F>(
  action: string,
  isActionEmpty: boolean
): createAsyncActionReturnType2<S, F, TRequestStatus>


export function createAsyncAction<A>(
  action: string
): createAsyncActionReturnType3<A, any, TRequestStatus>

export function createAsyncAction<A, S>(
  action: string
): createAsyncActionReturnType<A, S, any, TRequestStatus>

export function createAsyncAction<A, S, F>(
  action: string
): createAsyncActionReturnType<A, S, F, TRequestStatus>

export function createAsyncAction(action: string, isActionEmpty = false): any {
  return [
    createAction(action),
    createAction(action + ACTION_PREFIX_SUCCESS),
    createAction(action + ACTION_PREFIX_FAILED),
    createAction(action + ACTION_PREFIX_REQUEST),
  ]
}
