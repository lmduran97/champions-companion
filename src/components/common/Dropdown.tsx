import AntDesign from '@expo/vector-icons/AntDesign'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { useMemo, useState } from 'react'
import {
  FlatList,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native'

export type DropdownOption<T = string> = {
  label: string
  value: T
  disabled?: boolean
  description?: string
}

type DropdownProps<T = string> = {
  label: string
  value: T | null
  options: DropdownOption<T>[]
  placeholder?: string
  onChange: (value: T | null) => void
  disabled?: boolean
  searchable?: boolean
  searchPlaceholder?: string
  helperText?: string
  errorText?: string
}

export function Dropdown<T = string>({
  label,
  value,
  options,
  placeholder = 'Select an option',
  onChange,
  disabled = false,
  searchable = false,
  searchPlaceholder = 'Search...',
  helperText,
  errorText
}: DropdownProps<T>) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')

  const selectedOption = useMemo(
    () => options.find((option) => option.value === value) ?? null,
    [options, value]
  )

  const filteredOptions = useMemo(() => {
    const normalized = search.trim().toLowerCase()

    if (!normalized) return options

    return options.filter((option) =>
      option.label.toLowerCase().includes(normalized)
    )
  }, [options, search])

  const handleClose = () => {
    setOpen(false)
    setSearch('')
  }

  const handleSelect = (option: DropdownOption<T>) => {
    if (option.disabled) return
    onChange(option.value)
    handleClose()
  }

  return (
    <>
      <View className='gap-2'>
        {label ? (
          <Text className='text-body font-medium text-text-secondary'>
            {label}
          </Text>
        ) : null}
        <View className='flex-row items-center'>
          <TouchableOpacity
            activeOpacity={0.85}
            disabled={disabled}
            onPress={() => setOpen(true)}
            className={`rounded-card border flex-1 px-4 py-3 ${
              errorText ? 'border-danger bg-card' : 'border-border bg-card'
            } ${disabled ? 'opacity-50' : ''}`}
          >
            <View className='flex-row items-center justify-between'>
              <View className='flex-1'>
                <Text
                  numberOfLines={1}
                  className={`flex-1 text-body ${
                    selectedOption ? 'text-text-primary' : 'text-text-secondary'
                  }`}
                >
                  {selectedOption
                    ? selectedOption?.label.charAt(0).toUpperCase() +
                      selectedOption?.label.slice(1)
                    : placeholder}
                </Text>
                {selectedOption?.description && (
                  <Text className='mt-1 pl-1 text-caption text-text-secondary font-light italic'>
                    {selectedOption.description}
                  </Text>
                )}
              </View>

              <AntDesign name='caret-down' size={14} color='white' />
            </View>
          </TouchableOpacity>
          {selectedOption?.label && (
            <FontAwesome
              name='minus-circle'
              size={24}
              color='#e85d75'
              className='ml-5'
              onPress={() => onChange(null)}
            />
          )}
        </View>

        {errorText ? (
          <Text className='text-caption text-danger'>{errorText}</Text>
        ) : helperText ? (
          <Text className='text-caption text-text-secondary'>{helperText}</Text>
        ) : null}
      </View>

      <Modal
        visible={open}
        transparent
        animationType='fade'
        onRequestClose={handleClose}
        style={{
          boxShadow: '1px 2px 2px 0 rgba(0, 0, 0, 0.08)'
        }}
      >
        <TouchableOpacity
          className='flex-1 justify-center items-center bg-overlay'
          onPress={handleClose}
        >
          <TouchableWithoutFeedback>
            <View
              className='rounded-card border-t border-border bg-card px-4 pb-6 pt-4'
              style={{
                width: '93%',
                maxHeight: '75%'
              }}
            >
              <View className='mb-4 flex-row items-center justify-between'>
                <Text className='text-subtitle font-semibold text-text-primary'>
                  {label || 'Select an option'}
                </Text>

                <FontAwesome
                  name='close'
                  size={24}
                  color='white'
                  onPress={handleClose}
                />
              </View>

              {searchable && (
                <>
                  <TextInput
                    value={search}
                    onChangeText={setSearch}
                    placeholder={searchPlaceholder}
                    placeholderTextColor='#7e8794'
                    className='mb-4 rounded-card border border-border bg-surface px-4 py-3 text-body text-text-primary'
                  />
                  <View className='h-0.5 w-full bg-border mb-4' />
                </>
              )}

              {filteredOptions.length === 0 ? (
                <View className='items-center justify-center py-8'>
                  <Text className='text-body text-text-secondary'>
                    No results found
                  </Text>
                </View>
              ) : (
                <FlatList
                  data={filteredOptions}
                  keyExtractor={(item, index) =>
                    `${String(item.value)}-${index}`
                  }
                  keyboardShouldPersistTaps='handled'
                  contentContainerStyle={{ paddingBottom: 12 }}
                  ItemSeparatorComponent={() => <View className='h-4' />}
                  renderItem={({ item }) => {
                    const isSelected = item.value === value

                    return (
                      <TouchableOpacity
                        activeOpacity={0.85}
                        disabled={item.disabled}
                        onPress={() => handleSelect(item)}
                        className={`rounded-card border px-3 py-4 justify-center bg-surface
                          ${
                            isSelected ? 'border-primary' : 'border-border'
                          } ${item.disabled ? 'opacity-50' : ''}`}
                      >
                        <Text className='text-body font-medium text-text-primary'>
                          {item.label.charAt(0).toUpperCase() +
                            item.label.slice(1)}
                        </Text>
                        {item.description && (
                          <Text className='mt-1 pl-2 text-caption text-text-secondary font-light italic'>
                            {item.description}
                          </Text>
                        )}
                      </TouchableOpacity>
                    )
                  }}
                  showsVerticalScrollIndicator={false}
                />
              )}
            </View>
          </TouchableWithoutFeedback>
        </TouchableOpacity>
      </Modal>
    </>
  )
}
