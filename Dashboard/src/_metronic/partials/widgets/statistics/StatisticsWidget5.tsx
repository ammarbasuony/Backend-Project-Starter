/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import {KTIcon} from '../../../helpers'

type Props = {
  className: string
  color: string
  svgIcon: string
  iconColor: string
  title: string
  titleColor?: string
  description: string
  descriptionColor?: string
}

const StatisticsWidget5: React.FC<Props> = ({
  className,
  color,
  svgIcon,
  iconColor = 'white',
  title,
  titleColor = '#fff',
  description,
  descriptionColor = '#fff',
}) => {
  return (
    <div
      className={`card hoverable ${className}`}
      style={{
        backgroundColor: color,
      }}
    >
      <div className='card-body'>
        <KTIcon iconName={svgIcon} className={`text-${iconColor} fs-3x ms-n1`} />

        <div
          className={`fw-bold fs-2 mb-2 mt-5`}
          style={{
            color: titleColor,
          }}
        >
          {title}
        </div>

        <div
          className={`fw-semibold`}
          style={{
            color: descriptionColor,
          }}
        >
          {description}
        </div>
      </div>
    </div>
  )
}

export {StatisticsWidget5}
