import * as v from 'valibot'

export const pcbNameValidator = v.pipe(v.string(), v.nonEmpty('* Required'))
export const userNameValidator = v.pipe(v.string(), v.nonEmpty('* Required'), v.minLength(3, 'Too short (>2)'))
export const fullNameValidator = v.pipe(v.string(), v.nonEmpty('* Required'), v.minLength(8, 'Too short (>7)'))
export const passwordValidator = v.pipe(v.string(), v.nonEmpty('* Required'), v.minLength(6, 'Too short (>5)'))
