import { ImagePlusIcon, Trash2Icon } from 'lucide-react'
import { Input as BaseInput } from '@base-ui/react/input'
import { Field as BaseField } from '@base-ui/react/field'
import { type ChangeEventHandler, useEffect, useRef, useState } from 'react'
import { AspectRatio } from './aspect_ratio'
import { capitalize } from '~/lib/utils'
import { Button } from './button'

export interface InputImageProps extends Omit<BaseInput.Props, 'defaultValue' | 'onChange' | 'type'> {
  name: string
  defaultValue?: string | null
  label?: string
  accept?: string
  ratio?: number | string
  className?: string
}

export function InputImage(props: InputImageProps) {
  const {
    name,
    defaultValue,
    label = 'Añadir una foto',
    accept = 'image/jpeg,image/jpg,image/png,image/webp',
    ratio = 1.5,
    ...rest
  } = props

  const inputRef = useRef<HTMLInputElement>(null)
  const [preview, setPreview] = useState(defaultValue ?? null)
  const [removed, setRemoved] = useState(false)

  useEffect(() => {
    return () => {
      if (preview?.startsWith('blob:')) {
        URL.revokeObjectURL(preview)
      }
    }
  }, [preview])

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const target = event.target as HTMLInputElement
    if (target.files && target.files.length > 0) {
      const file = target.files[0]
      setPreview(URL.createObjectURL(file))
      setRemoved(false)
    }
  }

  function removeImage() {
    setPreview(null)
    setRemoved(Boolean(defaultValue))

    if (inputRef.current) {
      inputRef.current.value = ''
    }
  }

  return (
    <AspectRatio ratio={ratio} className="h-full">
      <BaseField.Label className="flex items-center justify-center w-full h-full rounded-lg bg-accent-faded cursor-pointer overflow-hidden">
        {!preview && (
          <div className="flex flex-col gap-1 items-center text-center">
            <ImagePlusIcon className="text-accent" size={20} strokeWidth={1.5} />
            <div className="text-accent text-[15px]/5">{label}</div>
          </div>
        )}

        {preview && (
          <div className="h-full w-full bg-background">
            <img src={preview} alt="" className={'w-full h-full object-contain'} />
            <Button
              type="button"
              size="icon-sm"
              variant="secondary"
              rounded="full"
              aria-label="Eliminar imagen"
              className="absolute top-3 right-3"
              onClick={(event) => {
                event.preventDefault()
                removeImage()
              }}
            >
              <Trash2Icon />
            </Button>
          </div>
        )}

        <BaseInput
          ref={inputRef}
          name={name}
          onChange={handleChange}
          type="file"
          accept={accept}
          className="hidden"
          {...rest}
        />
      </BaseField.Label>

      {removed && <input type="hidden" name={`remove${capitalize(name)}`} value="true" />}
    </AspectRatio>
  )
}
