export enum FKConstraint {
  VERIFICATION_USER = 'FK_verification_user',
  NOTIFICATION_USER = 'FK_notification_user',
}

export enum UNIQUEConstraint {
  USER_USERNAME = 'UNIQUE_user_username',
  USER_EMAIL = 'UNIQUE_user_email',
}
