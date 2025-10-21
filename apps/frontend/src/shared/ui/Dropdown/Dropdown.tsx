import type { LucideIcon } from 'lucide-react'
import type { Dispatch, ReactNode, SetStateAction } from 'react'
import clsx from 'clsx'
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react'
import { createContext, use, useMemo, useState } from 'react'
import { ItemsList, Popover } from '@/shared/ui'
import styles from './Dropdown.module.css'

export interface DropdownContextProps {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  selectedIcon: LucideIcon | undefined
  setSelectedIcon: Dispatch<SetStateAction<LucideIcon | undefined>>
  selected: string
  setSelected: Dispatch<SetStateAction<string>>
}

const DropdownContext = createContext<DropdownContextProps>(null!)

export type DropdownProps = {
  children: ReactNode
  defaultIcon?: LucideIcon
  value: string
} & ({ onChange: Dispatch<SetStateAction<string>>, setValue?: never }
  | { setValue: Dispatch<SetStateAction<string>>, onChange?: never })

export function Dropdown({
  children,
  value,
  onChange,
  setValue,
  defaultIcon,
}: DropdownProps) {
  const [selectedIcon, setSelectedIcon] = useState<LucideIcon | undefined>(defaultIcon)
  const [isOpen, setIsOpen] = useState(false)

  const contextValue = useMemo(() => ({
    isOpen,
    setIsOpen,
    selected: value,
    setSelected: onChange ?? setValue,
    selectedIcon,
    setSelectedIcon,
  }), [value, selectedIcon, isOpen, onChange, setValue])

  return (
    <Popover isOpen={isOpen} setIsOpen={setIsOpen}>
      <DropdownContext value={contextValue}>
        {children}
      </DropdownContext>
    </Popover>
  )
}

export interface DropdownTriggerProps {
  variant?: 'contained'
}

export function DropdownTrigger({ variant = 'contained' }: DropdownTriggerProps) {
  const { isOpen, selected, selectedIcon: Icon } = use(DropdownContext)
  const ChevronIcon = isOpen ? ChevronUpIcon : ChevronDownIcon

  return (
    <Popover.Trigger
      className={clsx(
        styles.trigger,
        styles[variant],
        Icon && styles.icon,
      )}
    >
      {Icon && <Icon />}
      {!Icon && (
        <>
          {selected}
          <ChevronIcon className={styles.dropdownArrow} />
        </>
      )}
    </Popover.Trigger>
  )
}

export interface DropdownItemsProps {
  children: ReactNode
}

export function DropdownItems({ children }: DropdownItemsProps) {
  return (
    <Popover.Content className={styles.items}>
      <ItemsList>
        {children}
      </ItemsList>
    </Popover.Content>
  )
}

export interface DropdownItemProps {
  children: ReactNode
  value: string
  icon?: LucideIcon
}

export function DropdownItem({ children, icon, value }: DropdownItemProps) {
  const { selected, setSelectedIcon, setSelected, setIsOpen } = use(DropdownContext)

  return (
    <ItemsList.Item
      icon={icon}
      active={value === selected}
      onClick={() => {
        setSelected(value)
        setSelectedIcon(icon)
        setIsOpen(false)
      }}
    >
      {children}
    </ItemsList.Item>
  )
}

Dropdown.Trigger = DropdownTrigger
Dropdown.Items = DropdownItems
Dropdown.Item = DropdownItem
