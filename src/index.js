/* global navigator */

import { select, color } from 'd3'
import colors from 'tailwindcss/colors'
import pkg from 'tailwindcss/package.json'
import { distanceDefinitions, nearestColor } from './nearestColor'
import './styles/tailwind.css'

select('#tailwind-version').text(pkg.version)

const ignoreColors = [
  'inherit',
  'current',
  'transparent',
  'lightBlue',
  'warmGray',
  'trueGray',
  'coolGray',
  'blueGray',
]

const colorDependentClasses = [
  '',
  'bg-',
  'text-',
  'border-',
  'shadow-',
  'decoration-',
  'from-',
  'to-',
  'via-',
  'divide-',
  'outline-',
  'ring-',
  'ring-offset-',
  'accent-',
  'caret-',
  'stroke-',
]

let chosenClassVariant = colorDependentClasses[1]

function flattenColorList(colorList) {
  const flatColorList = []
  Object.keys(colorList).forEach(c => {
    if (!ignoreColors.includes(c)) {
      if (typeof colors[c] === 'string') {
        flatColorList.push({ name: c, value: colors[c] })
      } else {
        Object.keys(colors[c]).forEach(cc => {
          flatColorList.push({ name: `${c}-${cc}`, value: colors[c][cc] })
        })
      }
    }
  })
  return flatColorList
}

const flatColorList = flattenColorList(colors)

const defaultColor = '#000000'

const colorInputText = select('#color-input-text').attr('value', defaultColor)
const colorInput = select('#color-input').attr('value', defaultColor)
const showColor = select('#show-color')
const colorError = select('#color-error')
const showRgb = select('#show-rgb')
const showHex = select('#show-hex')
// TODO: need to format hsl when displaying it
// const showHsl = select('#show-hsl')
const showNearestTailwindColorContainer = select(
  '#show-nearest-tailwind-colors-container',
)

showRgb.text(color(defaultColor).formatRgb())
showHex.text(color(defaultColor).formatHex())

const differenceDefinitionSelect = select('#difference-definition')

let chosenDistanceDefinition = Object.keys(distanceDefinitions)[0]

// distanceDefinitions
differenceDefinitionSelect
  .selectAll('option')
  .data(Object.keys(distanceDefinitions))
  .join('option')
  .attr('value', d => d)
  .text(d => d)
let inputColor = defaultColor

differenceDefinitionSelect.on('change', e => {
  chosenDistanceDefinition = e.target.value

  const nearestTwColors = nearestColor(
    inputColor,
    flatColorList,
    chosenDistanceDefinition,
  )
  renderOutputColors(
    showNearestTailwindColorContainer,
    nearestTwColors,
    chosenDistanceDefinition,
  )
})

const nearestTwColors = nearestColor(defaultColor, flatColorList)
renderOutputColors(
  showNearestTailwindColorContainer,
  nearestTwColors,
  chosenDistanceDefinition,
)

colorInput.on('change input', e => {
  colorInputText.property('value', e.target.value)
  showColor.style('background-color', e.target.value)

  // showHex.text(color(e.target.value).formatHex())
  showRgb.text(color(e.target.value).formatRgb())
  showHex.text(color(e.target.value).formatHex())
  // showHsl.text(color(e.target.value).formatHsl())
  inputColor = e.target.value

  const nearestTwColors = nearestColor(
    e.target.value,
    flatColorList,
    chosenDistanceDefinition,
  )

  colorError.classed('visible', false).classed('invisible', true)
  renderOutputColors(showNearestTailwindColorContainer, nearestTwColors)
})

colorInputText.on('change input', e => {
  const parsedColor = color(e.target.value)
  if (parsedColor) {
    colorInput.property('value', parsedColor.formatHex())
    const nearestTwColors = nearestColor(
      parsedColor,
      flatColorList,
      chosenDistanceDefinition,
    )
    inputColor = e.target.value
    renderOutputColors(showNearestTailwindColorContainer, nearestTwColors)
    colorError.classed('visible', false).classed('invisible', true)
    showRgb.text(color(e.target.value).formatRgb())
    showHex.text(color(e.target.value).formatHex())
    // showHsl.text(color(e.target.value).formatHsl())
  } else {
    colorError.classed('visible', true).classed('invisible', false)
  }
})

function renderOutputColors(nearestColorDisplayContainerSelection, colorArr) {
  nearestColorDisplayContainerSelection.selectAll('div').remove()
  const individialNearbyColor = nearestColorDisplayContainerSelection
    .selectAll('div')
    .data(colorArr)
    .join('div')
    .attr(
      'class',
      'rounded col-span-1 flex flex-col items-center p-2 dark:border-gray-700 border md:p-4',
    )

  individialNearbyColor
    .append('div')
    .attr(
      'class',
      'w-full h-8 bg-gray-300 dark:bg-gray-800 rounded mb-2 border dark:border-gray-400 border-gray-600',
    )
    .style('background-color', d => d.fromValue)

  const colorName = individialNearbyColor
    .append('div')
    .attr(
      'class',
      'border dark:border-gray-700 w-full rounded justify-center items-center flex flex-col gap-1 mb-1 bg-gray-100 dark:bg-gray-800 p-1',
    )
  colorName
    .append('div')
    .text(d => `${d.from}`)
    .attr('class', 'font-semibold text-xs md:text-sm')

  colorName
    .append('button')
    .attr(
      'class',
      'w-full justify-center flex items-center gap-1 px-0.5  rounded border border-gray-400 dark:border-gray-600 text-xs',
    )
    .html(
      `
      <span>Copy</span>
      <svg title="copy to clipboard" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 " fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
      </svg>
      `,
    )
    .on('click', (e, d) => {
      navigator.clipboard.writeText(`${chosenClassVariant}${d.from}`)
    })
  individialNearbyColor.append('div').text(d => d.fromValue)
  individialNearbyColor
    .append('div')
    .text(d => `distance: ${d.distance.toFixed(0)}`)
    .attr(
      'class',
      'text-xs dark:text-gray-400 text-gray-600 mt-2 hidden md:block',
    )
}

// colorDependentClasses

const classVariantSelect = select('#class-variant')
classVariantSelect
  .selectAll('option')
  .data(colorDependentClasses)
  .join('option')
  .attr('value', d => d)
  .text(d => (d ? d : 'none'))

classVariantSelect.property('value', chosenClassVariant)

classVariantSelect.on('change', e => {
  chosenClassVariant = e.target.value
})
