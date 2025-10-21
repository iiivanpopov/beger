import type { RedirectOptions, Register, RegisteredRouter } from '@tanstack/react-router'

export type AnyFunction = (...args: any[]) => any

export type ClickEvent = MouseEvent | TouchEvent

export type AppRouter = RegisteredRouter<Register>
export type RouterPath = RedirectOptions<AppRouter>['to']
