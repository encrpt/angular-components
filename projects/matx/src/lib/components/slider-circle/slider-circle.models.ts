
export interface SliderCircleConfig {
  // higher values takes longer
  animationSec?: number
  // same time for all values
  animationString?: string
  strokeWidth?: number
  circleColor?: string
  areaColor?: string
  editMode?: boolean
  showValueLabel?: boolean
  // mat-slider
  min?: number
  max?: number
  value?: number
  tickInterval?: number
  step?: number
  color?: string
}
