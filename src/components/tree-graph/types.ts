export interface TreeNode {
  id: string | number
  heading: string
  subheading?: string
  children?: TreeNode[]
}
