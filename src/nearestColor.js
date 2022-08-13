import { color } from 'd3'
import {
  evalEuclideanDistance,
  evalNonLinearApproximationDistance,
  evalRedmeanApproximationDistance,
} from './colorDistance'

export const distanceDefinitions = {
  'redmean-smooth': evalRedmeanApproximationDistance,
  'simple': evalEuclideanDistance,
  'redmean-abrupt': evalNonLinearApproximationDistance,
}

export const nearestColor = (
  inputColor,
  referenceColorList,
  definition = 'redmean-smooth',
) => {
  const evalDistance = distanceDefinitions[definition]
  const colorDistance = [
    {
      from: 'white',
      fromValue: '#fff',
      distance: evalDistance(color(inputColor), color('#fff')),
    },
    {
      from: 'white',
      fromValue: '#fff',
      distance: evalDistance(color(inputColor), color('#fff')),
    },
    {
      from: 'white',
      fromValue: '#fff',
      distance: evalDistance(color(inputColor), color('#fff')),
    },
    {
      from: 'white',
      fromValue: '#fff',
      distance: evalDistance(color(inputColor), color('#fff')),
    },
    {
      from: 'white',
      fromValue: '#fff',
      distance: evalDistance(color(inputColor), color('#fff')),
    },
  ]

  referenceColorList.forEach(refColor => {
    const distanceFromRefColor = evalDistance(
      color(inputColor),
      color(refColor.value),
    )

    if (distanceFromRefColor < colorDistance[0].distance) {
      colorDistance[0].from = refColor.name
      colorDistance[0].distance = distanceFromRefColor
      colorDistance[0].fromValue = refColor.value
    } else if (distanceFromRefColor < colorDistance[1].distance) {
      colorDistance[1].from = refColor.name
      colorDistance[1].distance = distanceFromRefColor
      colorDistance[1].fromValue = refColor.value
    } else if (distanceFromRefColor < colorDistance[2].distance) {
      colorDistance[2].from = refColor.name
      colorDistance[2].distance = distanceFromRefColor
      colorDistance[2].fromValue = refColor.value
    } else if (distanceFromRefColor < colorDistance[3].distance) {
      colorDistance[3].from = refColor.name
      colorDistance[3].distance = distanceFromRefColor
      colorDistance[3].fromValue = refColor.value
    } else if (distanceFromRefColor < colorDistance[4].distance) {
      colorDistance[4].from = refColor.name
      colorDistance[4].distance = distanceFromRefColor
      colorDistance[4].fromValue = refColor.value
    }
  })

  return colorDistance
}

// both in rgb, ignoring opacity
