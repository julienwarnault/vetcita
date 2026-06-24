import { useState } from 'react'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { InputGroup } from './input_group'
import { Button } from './button'

export function InputPassword(props: React.ComponentProps<'input'>) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <InputGroup>
      <InputGroup.Input {...props} type={showPassword ? 'text' : 'password'} />
      <InputGroup.Addon align="end">
        <Button type="button" size="icon-sm" variant="tertiary" onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? <EyeOffIcon className="size-5" /> : <EyeIcon className="size-5" />}
        </Button>
      </InputGroup.Addon>
    </InputGroup>
  )
}
