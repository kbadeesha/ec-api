const UserErrors = {
  USER_400_EMPTY_ID: {
    status: 400,
    code: 'USER_400_EMPTY_ID',
    message: 'User id cannot be empty!',
  },
  USER_400_EMPTY_IDS: {
    status: 400,
    code: 'USER_400_EMPTY_IDS',
    message: 'User ids cannot be empty!',
  },
  USER_400_EMPTY_FIRST_NAME: {
    status: 400,
    code: 'USER_400_EMPTY_FIRST_NAME',
    message: 'User first name cannot be empty!',
  },
  USER_400_EMPTY_LAST_NAME: {
    status: 400,
    code: 'USER_400_EMPTY_LAST_NAME',
    message: 'User last name cannot be empty!',
  },
  USER_400_EMPTY_USERNAME: {
    status: 400,
    code: 'USER_400_EMPTY_USERNAME',
    message: 'User username cannot be empty!',
  },
  USER_400_EMPTY_PASSWORD: {
    status: 400,
    code: 'USER_400_EMPTY_PASSWORD',
    message: 'User password cannot be empty!',
  },
  USER_400_NOT_EMPTY_SALT: {
    status: 400,
    code: 'USER_400_NOT_EMPTY_SALT',
    message: 'User salt cannot be inserted!',
  },
  USER_400_EMPTY_STATUS: {
    status: 400,
    code: 'USER_400_EMPTY_STATUS',
    message: 'User status cannot be empty!',
  },
  USER_400_EMPTY_EMAIL: {
    status: 400,
    code: 'USER_400_EMPTY_EMAIL',
    message: 'User email cannot be empty!',
  },
  USER_400_EMPTY_DOB: {
    status: 400,
    code: 'USER_400_EMPTY_DOB',
    message: 'User dob cannot be empty!',
  },
  USER_400_EMPTY_PHONE: {
    status: 400,
    code: 'USER_400_EMPTY_PHONE',
    message: 'User phone cannot be empty!',
  },
  USER_400_EMPTY_AREA_ID: {
    status: 400,
    code: 'USER_400_EMPTY_AREA_ID',
    message: 'User area id cannot be empty!',
  },
  USER_400_EMPTY_ADDRESS: {
    status: 400,
    code: 'USER_400_EMPTY_ADDRESS',
    message: 'User address cannot be empty!',
  },
  USER_400_EMPTY_GUARDIAN_NAME: {
    status: 400,
    code: 'USER_400_EMPTY_GUARDIAN_NAME',
    message: 'User guardian name cannot be empty!',
  },
  USER_400_EMPTY_GUARDIAN_PHONE: {
    status: 400,
    code: 'USER_400_EMPTY_GUARDIAN_PHONE',
    message: 'User guardian phone cannot be empty!',
  },
  USER_400_EMPTY_GUARDIAN_RELATIONSHIP: {
    status: 400,
    code: 'USER_400_EMPTY_GUARDIAN_RELATIONSHIP',
    message: 'User guardian relationship cannot be empty!',
  },
  USER_400_NOT_EMPTY_ROLE: {
    status: 400,
    code: 'USER_400_NOT_EMPTY_ROLE',
    message: 'User role cannot be inserted!',
  },
  USER_400_NOT_EMPTY_TUTOR_ID: {
    status: 400,
    code: 'USER_400_NOT_EMPTY_TUTOR_ID',
    message: 'User tutor id cannot be inserted!',
  },
  USER_400_INVALID_IDS: {
    status: 400,
    code: 'USER_400_INVALID_IDS',
    message: 'Invalid value for user ids!',
  },
  USER_400_INVALID_COURSE: {
    status: 400,
    code: 'USER_400_INVALID_COURSE',
    message: 'Invalid value for user course!',
  },
  USER_400_INVALID_GENDER: {
    status: 400,
    code: 'USER_400_INVALID_GENDER',
    message: 'Invalid value for user gender!',
  },
  USER_400_INVALID_STATUS: {
    status: 400,
    code: 'USER_400_INVALID_STATUS',
    message: 'Invalid value for user status!',
  },
  USER_400_INVALID_ROLE: {
    status: 400,
    code: 'USER_400_INVALID_ROLE',
    message: 'Invalid value for user role!',
  },
  USER_400_INVALID_AREA_ID: {
    status: 400,
    code: 'USER_400_INVALID_AREA_ID',
    message: 'Invalid value for user area id!',
  },
  USER_400_INVALID_DOB: {
    status: 400,
    code: 'USER_400_INVALID_DOB',
    message: 'Invalid value for user dob!',
  },
  USER_400_INVALID_PHONE: {
    status: 400,
    code: 'USER_400_INVALID_PHONE',
    message: 'Invalid value for user phone!',
  },
  USER_409_EXIST_USERNAME: {
    status: 409,
    code: 'USER_409_EXIST_USERNAME',
    message: 'User with given username exist!',
  },
  USER_400_INVALID_GUARDIAN_RELATIONSHIP: {
    status: 400,
    code: 'USER_400_INVALID_GUARDIAN_RELATIONSHIP',
    message: 'Invalid value for user guardian relationship!',
  },
};

export { UserErrors };
