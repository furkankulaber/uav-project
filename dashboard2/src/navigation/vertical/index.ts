import type { VerticalNavItems } from '@/@layouts/types'

export default [
  {
    title: 'Anasayfa',
    to: { name: 'index' },
    icon: { icon: 'tabler-smart-home' },
  },
  {
    title: 'Dronelar',
    to: { name: 'drone' },
    icon: { icon: 'tabler-file' },
  },
  {
    title: 'Kiralamalar',
    to: { name: 'rent' },
    icon: { icon: 'tabler-file' },
  },
] as VerticalNavItems
