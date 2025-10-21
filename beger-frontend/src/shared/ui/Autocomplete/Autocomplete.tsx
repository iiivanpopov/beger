import type { Dispatch, ReactNode, SetStateAction } from 'react'
import clsx from 'clsx'
import { ChevronsUpDownIcon } from 'lucide-react'
import { useMemo, useState } from 'react'
import { ItemsList, Popover } from '@/shared/ui'
import { buildContext, matchesSearch } from '@/shared/utils'
import styles from './Autocomplete.module.css'

export interface AutocompleteContextProps {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  selected: string
  setSelected: Dispatch<SetStateAction<string>>
}

const [
  AutocompleteContext,
  useAutocompleteContext,
] = buildContext<AutocompleteContextProps>()

export type AutocompleteProps = {
  children: ReactNode
  value: string
} & ({ onChange: Dispatch<SetStateAction<string>>, setValue?: never }
  | { setValue: Dispatch<SetStateAction<string>>, onChange?: never })

export function Autocomplete({ children, value, onChange, setValue }: AutocompleteProps) {
  const [isOpen, setIsOpen] = useState(false)

  const contextValue = useMemo(() => ({
    selected: value,
    setSelected: onChange ?? setValue,
    isOpen,
    setIsOpen,
  }), [value, onChange, setValue, isOpen])

  return (
    <Popover isOpen={isOpen} setIsOpen={setIsOpen}>
      <AutocompleteContext value={contextValue}>
        {children}
      </AutocompleteContext>
    </Popover>
  )
}

export interface AutocompleteTriggerProps {
  className?: string
  placeholder?: string
  invalid?: boolean
}

export function AutocompleteTrigger({
  className,
  invalid,
  placeholder,
}: AutocompleteTriggerProps) {
  const { selected, setSelected } = useAutocompleteContext()

  return (
    <Popover.Trigger
      className={clsx(
        styles.trigger,
        invalid && styles.invalid,
        className,
      )}
    >
      <input
        type="text"
        value={selected?.toString() ?? ''}
        placeholder={placeholder}
        onChange={e => setSelected(e.target.value)}
      />
      <ChevronsUpDownIcon className={styles.autocompleteArrow} />
    </Popover.Trigger>
  )
}

export interface AutocompleteItemsProps {
  children: ReactNode
}

export function AutocompleteItems({ children }: AutocompleteItemsProps) {
  return (
    <Popover.Content>
      <ItemsList>
        {children}
      </ItemsList>
    </Popover.Content>
  )
}

export interface AutocompleteItemProps {
  children: string
  value: string
}

function AutocompleteItem({ children, value }: AutocompleteItemProps) {
  const { selected, setSelected, setIsOpen } = useAutocompleteContext()

  if (selected && !matchesSearch(selected, [value]))
    return null

  return (
    <ItemsList.Item
      active={value === selected}
      onClick={() => {
        setSelected(value)
        setIsOpen(false)
      }}
    >
      {children}
    </ItemsList.Item>
  )
}

Autocomplete.Trigger = AutocompleteTrigger
Autocomplete.Items = AutocompleteItems
Autocomplete.Item = AutocompleteItem
