export enum RequestStatus {
  PENDING = 'pending',
  SUCCESS = 'success',
  FAILED = 'failed',
  DEFAULT = 'default',
}

export type TRequestStatus =
  | RequestStatus.DEFAULT
  | RequestStatus.FAILED
  | RequestStatus.PENDING
  | RequestStatus.SUCCESS




