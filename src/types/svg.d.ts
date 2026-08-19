declare module '*.svg?component' {
  import type { FC, SVGProps } from 'react'

  const content: FC<SVGProps<SVGSVGElement>>
  export default content
}
