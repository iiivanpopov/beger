import * as v from 'valibot'

export const pcbNameValidator = v.pipe(v.string(), v.nonEmpty('error.required'))
export const userNameValidator = v.pipe(v.string(), v.nonEmpty('error.required'), v.minLength(3, 'error.too-short-username'))
export const fullNameValidator = v.pipe(v.string(), v.nonEmpty('error.required'), v.minLength(8, 'error.too-short-fullname'))
export const passwordValidator = v.pipe(v.string(), v.nonEmpty('error.required'), v.minLength(6, 'error.too-short-password'))
