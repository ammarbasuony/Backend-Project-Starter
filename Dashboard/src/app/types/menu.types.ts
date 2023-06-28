export interface IMenuItem {
  title: string
  icon: string
  to: string
  role: string
  subMenu?: IMenuItem[]
}
